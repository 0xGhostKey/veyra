import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { SetAllCookies } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getSupabaseWithUser() {
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
  const { data: { user }, error } = await supabase.auth.getUser();
  return { supabase, user, error };
}

// GET /api/profile — 自分のプロフィール取得
export async function GET() {
  const { supabase, user } = await getSupabaseWithUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('[profile GET] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  return NextResponse.json({ profile: data });
}

// PUT /api/profile — プロフィール作成 or 更新（upsert）
export async function PUT(request: NextRequest) {
  const { supabase, user } = await getSupabaseWithUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // 許可フィールドのみ抽出（user_id の上書き防止）
  const allowed = ['display_name', 'bio', 'avatar_url', 'selected_theme'] as const;
  const payload: Record<string, unknown> = { user_id: user.id };
  for (const key of allowed) {
    if (key in body) payload[key] = body[key];
  }

  // selected_theme を変更する場合、購入済みか確認
  if (payload.selected_theme && payload.selected_theme !== 'free_basic' && payload.selected_theme !== 'free_dark') {
    const { data: theme } = await supabase
      .from('themes')
      .select('is_free')
      .eq('id', payload.selected_theme)
      .maybeSingle();

    if (!theme) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }

    if (!theme.is_free) {
      const { data: purchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('item_type', 'theme')
        .eq('item_id', payload.selected_theme)
        .eq('status', 'paid')
        .maybeSingle();

      if (!purchase) {
        return NextResponse.json({ error: 'Theme not purchased' }, { status: 403 });
      }
    }
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'user_id' })
    .select()
    .single();

  if (error) {
    console.error('[profile PUT] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  return NextResponse.json({ profile: data });
}
