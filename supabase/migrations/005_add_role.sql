-- ============================================================
-- 005_add_role.sql
-- Veyra: profilesにroleカラムを追加
-- ============================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user'
  CHECK (role IN ('user', 'admin'));

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
