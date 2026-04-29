import { createAdminClient } from '@/lib/supabase-admin'
import AdminClient from './AdminClient'

export default async function AdminPage() {
  const admin = createAdminClient()

  // 全ユーザー取得（profiles + auth.users のemail）
  const { data: profiles } = await admin
    .from('profiles')
    .select('user_id, display_name, role, created_at')
    .order('created_at', { ascending: false })

  // auth.usersからemailを取得
  const { data: authUsers } = await admin.auth.admin.listUsers()
  const emailMap: Record<string, string> = {}
  authUsers?.users?.forEach((u) => {
    emailMap[u.id] = u.email ?? ''
  })

  // 全購入履歴取得
  const { data: purchases } = await admin
    .from('purchases')
    .select('id, user_id, item_type, item_id, amount, status, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  const users = (profiles ?? []).map((p) => ({
    user_id: p.user_id,
    display_name: p.display_name,
    email: emailMap[p.user_id] ?? '',
    role: p.role as 'user' | 'admin',
    created_at: p.created_at,
  }))

  return <AdminClient users={users} purchases={purchases ?? []} />
}
