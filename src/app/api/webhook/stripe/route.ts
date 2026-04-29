import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Next.js のボディパーサーを無効化（raw body が必要）
export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

// service_role クライアント（RLS をバイパスして purchases へ書き込む）
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

  // raw body を文字列で取得
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

  if (event.type !== 'checkout.session.completed') {
    // 対象外イベントは 200 で無視
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const { user_id, item_type, item_id, amount } = session.metadata ?? {};

  if (!user_id || !item_type || !item_id || !amount) {
    console.error('[webhook] missing metadata:', session.metadata);
    return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
  }

  const supabase = getServiceClient();

  // purchases テーブルに記録
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

  // ロゴ非表示購入 → profiles.logo_removed = true
  if (item_type === 'logo_remove') {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ logo_removed: true })
      .eq('user_id', user_id);

    if (updateError) {
      console.error('[webhook] update logo_removed error:', updateError);
    }
  }

  // テーマ購入 → profiles.selected_theme を更新（購入直後に即適用）
  if (item_type === 'theme') {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ selected_theme: item_id })
      .eq('user_id', user_id);

    if (updateError) {
      console.error('[webhook] update selected_theme error:', updateError);
    }
  }

  return NextResponse.json({ received: true });
}
