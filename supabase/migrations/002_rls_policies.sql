-- ============================================================
-- 002_rls_policies.sql
-- Veyra: Row Level Security ポリシー設定
-- ============================================================

-- RLS を有効化
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- profiles ポリシー
-- ============================================================

-- SELECT: 全員許可（公開プロフィールページ用）
CREATE POLICY "profiles_select_public"
  ON profiles FOR SELECT
  USING (true);

-- INSERT: 認証済みユーザーが自分の user_id でのみ作成可能
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- UPDATE: 自分のプロフィールのみ更新可能
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- DELETE: 自分のプロフィールのみ削除可能
CREATE POLICY "profiles_delete_own"
  ON profiles FOR DELETE
  USING (auth.uid()::text = user_id);

-- ============================================================
-- links ポリシー
-- ============================================================

-- SELECT: 全員許可（公開プロフィールページ用）
CREATE POLICY "links_select_public"
  ON links FOR SELECT
  USING (true);

-- INSERT: 自分のプロフィールに紐づくリンクのみ作成可能
CREATE POLICY "links_insert_own"
  ON links FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = links.profile_id
        AND profiles.user_id = auth.uid()::text
    )
  );

-- UPDATE: 自分のプロフィールに紐づくリンクのみ更新可能
CREATE POLICY "links_update_own"
  ON links FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = links.profile_id
        AND profiles.user_id = auth.uid()::text
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = links.profile_id
        AND profiles.user_id = auth.uid()::text
    )
  );

-- DELETE: 自分のプロフィールに紐づくリンクのみ削除可能
CREATE POLICY "links_delete_own"
  ON links FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = links.profile_id
        AND profiles.user_id = auth.uid()::text
    )
  );

-- ============================================================
-- themes ポリシー
-- ============================================================

-- SELECT: 全員許可
CREATE POLICY "themes_select_public"
  ON themes FOR SELECT
  USING (true);

-- INSERT/UPDATE/DELETE: 禁止（管理者は service_role で直接操作）

-- ============================================================
-- purchases ポリシー
-- ============================================================

-- SELECT: 自分の購入履歴のみ
CREATE POLICY "purchases_select_own"
  ON purchases FOR SELECT
  USING (auth.uid()::text = user_id::text);

-- INSERT/UPDATE/DELETE: 禁止（Webhook の service_role のみ挿入可）
