import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createAdminClient } from '@/lib/supabase-admin'

export async function POST(request: NextRequest) {
  // 呼び出し元が admin かチェック
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: () => {},
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (!callerProfile || callerProfile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // リクエストボディ
  const { target_user_id, role } = await request.json()
  if (!target_user_id || !['user', 'admin'].includes(role)) {
    return NextResponse.json({ error: 'Invalid params' }, { status: 400 })
  }

  // service roleで更新（RLSをバイパス）
  const admin = createAdminClient()
  const { error } = await admin
    .from('profiles')
    .update({ role })
    .eq('user_id', target_user_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
