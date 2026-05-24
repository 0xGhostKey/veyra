import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('[webhook] signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = getServiceClient();

  // ── 一回払い決済完了（テーマ購入） ──
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // サブスクリプションセッションの場合は subscription イベントで処理
    if (session.mode === 'subscription') {
      // customer_id を profiles に保存しておく
      const userId = session.metadata?.user_id;
      if (userId && session.customer) {
        await supabase
          .from('profiles')
          .update({ stripe_customer_id: String(session.customer) })
          .eq('user_id', userId);
      }
      return NextResponse.json({ received: true });
    }

    const { user_id, item_type, item_id, amount } = session.metadata ?? {};

    if (!user_id || !item_type || !item_id || !amount) {
      console.error('[webhook] missing metadata:', session.metadata);
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    const { error: insertError } = await supabase.from('purchases').insert({
      user_id,
      item_type,
      item_id,
      amount: Number(amount),
      stripe_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
      status: 'paid',
    });

    if (insertError) {
      console.error('[webhook] insert purchases error:', insertError);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    // テーマ購入 → selected_theme を即時反映
    if (item_type === 'theme') {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ selected_theme: item_id })
        .eq('user_id', user_id);
      if (updateError) console.error('[webhook] update selected_theme error:', updateError);
    }

    return NextResponse.json({ received: true });
  }

  // ── サブスクリプション作成・更新（ロゴ非表示 ON） ──
  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated'
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata?.user_id;

    if (!userId) {
      console.error('[webhook] subscription missing user_id metadata');
      return NextResponse.json({ received: true });
    }

    const isActive =
      subscription.status === 'active' || subscription.status === 'trialing';

    const { error } = await supabase
      .from('profiles')
      .update({
        logo_removed: isActive,
        stripe_customer_id: String(subscription.customer),
        stripe_subscription_id: subscription.id,
        subscription_status: subscription.status,
      })
      .eq('user_id', userId);

    if (error) console.error('[webhook] subscription update error:', error);

    return NextResponse.json({ received: true });
  }

  // ── サブスクリプション削除・キャンセル（ロゴ非表示 OFF） ──
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata?.user_id;

    if (!userId) {
      // customer_id でユーザーを特定
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('stripe_customer_id', String(subscription.customer))
        .maybeSingle();

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            logo_removed: false,
            stripe_subscription_id: null,
            subscription_status: 'canceled',
          })
          .eq('user_id', profile.user_id);
      }
    } else {
      await supabase
        .from('profiles')
        .update({
          logo_removed: false,
          stripe_subscription_id: null,
          subscription_status: 'canceled',
        })
        .eq('user_id', userId);
    }

    return NextResponse.json({ received: true });
  }

  // ── 支払い失敗（ロゴ非表示 OFF） ──
  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;

    if (customerId) {
      await supabase
        .from('profiles')
        .update({
          logo_removed: false,
          subscription_status: 'past_due',
        })
        .eq('stripe_customer_id', customerId);
    }

    return NextResponse.json({ received: true });
  }

  return NextResponse.json({ received: true });
}
