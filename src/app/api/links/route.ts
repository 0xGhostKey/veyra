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

async function getProfileId(supabase: ReturnType<typeof createServerClient>, userId: string) {
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();
  return data?.id ?? null;
}

// GET /api/links — 自分のリンク一覧取得（sort_order 昇順）
export async function GET() {
  const { supabase, user } = await getSupabaseWithUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const profileId = await getProfileId(supabase, user.id);
  if (!profileId) {
    return NextResponse.json({ links: [] });
  }

  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profileId)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[links GET] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  return NextResponse.json({ links: data });
}

// POST /api/links — リンク追加
export async function POST(request: NextRequest) {
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

  const { title, url, icon_type, sort_order } = body as {
    title?: string;
    url?: string;
    icon_type?: string;
    sort_order?: number;
  };

  if (!title || !url) {
    return NextResponse.json({ error: 'title and url are required' }, { status: 400 });
  }

  // URL 形式の簡易チェック
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
  }

  const profileId = await getProfileId(supabase, user.id);
  if (!profileId) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  const { data, error } = await supabase
    .from('links')
    .insert({
      profile_id: profileId,
      title,
      url,
      icon_type: icon_type ?? null,
      sort_order: sort_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    console.error('[links POST] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  return NextResponse.json({ link: data }, { status: 201 });
}
