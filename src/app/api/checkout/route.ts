import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import type { SetAllCookies } from '@supabase/ssr';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { item_type, item_id, price_id } = body as {
      item_type: 'logo_remove';
      item_id: string;
      price_id: string;
    };

    // 入力バリデーション
    if (!item_type || !item_id || !price_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (item_type !== 'logo_remove') {
      return NextResponse.json({ error: 'Invalid item_type' }, { status: 400 });
    }

    // Supabase でセッション確認
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet: Parameters<SetAllCookies>[0]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options as any));
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── ロゴ非表示: サブスクリプションモード ──
    if (item_type === 'logo_remove') {
      // 既にアクティブなサブスクリプションがあれば弾く
      const { data: profile } = await supabase
        .from('profiles')
        .select('stripe_customer_id, stripe_subscription_id, subscription_status')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile?.subscription_status === 'active' || profile?.subscription_status === 'trialing') {
        return NextResponse.json({ error: 'Already subscribed' }, { status: 409 });
      }

      // Stripe Customer を取得 or 作成
      let customerId = profile?.stripe_customer_id ?? null;
      if (!customerId) {
        const customer = await stripe.customers.create({
          metadata: { user_id: user.id },
        });
        customerId = customer.id;
        // customer_id を保存（後続の webhook で上書きされるが先に保存しておく）
        await supabase
          .from('profiles')
          .update({ stripe_customer_id: customerId })
          .eq('user_id', user.id);
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer: customerId,
        line_items: [{ price: price_id, quantity: 1 }],
        metadata: {
          user_id: user.id,
          item_type: 'logo_remove',
          item_id: 'logo_remove',
        },
        subscription_data: {
          metadata: {
            user_id: user.id,
          },
        },
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ error: 'Invalid item_type' }, { status: 400 });
  } catch (err) {
    console.error('[checkout] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
