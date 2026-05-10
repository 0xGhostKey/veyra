-- ============================================================
-- 009_add_complete_role.sql
-- Veyra: role に 'complete' を追加
-- ============================================================

ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('user', 'admin', 'complete'));
