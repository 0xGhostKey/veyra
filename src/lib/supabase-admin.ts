import { createClient } from '@supabase/supabase-js'

// Service roleキーを使用 — RLSをバイパスして全データにアクセス可能
// サーバーサイド（API Route / Server Component）でのみ使用すること
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
