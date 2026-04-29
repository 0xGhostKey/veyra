import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { SetAllCookies } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * GET /api/purchases/status?session_id=cs_xxx
 *
 * Stripe Webhook (checkout.session.completed) が purchases テーブルに書き込み済みかを確認する。
 * success ページがポーリングで呼び出し、反映確認に使用する。
 *
 * - session_id はクエリパラメータで受け取る
 * - 認証済みユーザーの購入のみ確認可能（他ユーザーの session_id は照合できない）
 * - stripe_session_id を保存しているため、管理者も手動確認可能
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

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

  // purchases テーブルで stripe_session_id + user_id + status = 'paid' を照合
  // → user_id を条件に加えることで他ユーザーの session_id は参照不能
  const { data: purchase, error } = await supabase
    .from('purchases')
    .select('id, item_type, item_id, status, stripe_session_id')
    .eq('stripe_session_id', sessionId)
    .eq('user_id', user.id)
    .eq('status', 'paid')
    .maybeSingle();

  if (error) {
    console.error('[purchases/status] DB error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  if (!purchase) {
    // Webhook がまだ届いていない or 失敗
    return NextResponse.json({ confirmed: false });
  }

  // 確認完了 — フロントが表示を切り替えるための情報も返す
  return NextResponse.json({
    confirmed: true,
    item_type: purchase.item_type,
    item_id: purchase.item_id,
  });
}
