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
      item_type: 'logo_remove' | 'theme';
      item_id: string;
      price_id: string;
    };

    // 入力バリデーション
    if (!item_type || !item_id || !price_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!['logo_remove', 'theme'].includes(item_type)) {
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

    // 購入済みチェック
    const { data: existing } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', user.id)
      .eq('item_type', item_type)
      .eq('item_id', item_id)
      .eq('status', 'paid')
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'Already purchased' }, { status: 409 });
    }

    // Stripe Checkout Session 取得（price は Stripe ダッシュボードで事前作成済みを想定）
    const theme = await supabase
      .from('themes')
      .select('price, name')
      .eq('id', item_id)
      .maybeSingle();

    const amount = theme.data?.price ?? 0;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user.id,
        item_type,
        item_id,
        amount: String(amount),
      },
      // {CHECKOUT_SESSION_ID} は Stripe が実際の session.id に展開するテンプレート変数
      // success ページがこの値を使って Webhook 到達を確認する
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
