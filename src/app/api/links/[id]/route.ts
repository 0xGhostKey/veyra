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

// 対象リンクが自分のプロフィールに属するか確認
async function getLinkIfOwned(
  supabase: ReturnType<typeof createServerClient>,
  linkId: string,
  userId: string
) {
  const { data } = await supabase
    .from('links')
    .select('id, profile_id, profiles!inner(user_id)')
    .eq('id', linkId)
    .maybeSingle();

  if (!data) return null;

  const profiles = data.profiles as { user_id: string } | { user_id: string }[];
  const owner = Array.isArray(profiles) ? profiles[0] : profiles;
  if (owner?.user_id !== userId) return null;

  return data;
}

// PATCH /api/links/[id] — リンク更新
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { supabase, user } = await getSupabaseWithUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const owned = await getLinkIfOwned(supabase, id, user.id);
  if (!owned) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // URL が含まれる場合は形式チェック
  if (body.url) {
    try {
      new URL(body.url as string);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }
  }

  // 許可フィールドのみ更新
  const allowed = ['title', 'url', 'icon_type', 'sort_order', 'is_active'] as const;
  const payload: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) payload[key] = body[key];
  }

  if (Object.keys(payload).length === 0) {
    return NextResponse.json({ error: 'No updatable fields provided' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('links')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[links PATCH] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  return NextResponse.json({ link: data });
}

// DELETE /api/links/[id] — リンク削除
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { supabase, user } = await getSupabaseWithUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const owned = await getLinkIfOwned(supabase, id, user.id);
  if (!owned) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { error } = await supabase.from('links').delete().eq('id', id);

  if (error) {
    console.error('[links DELETE] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
