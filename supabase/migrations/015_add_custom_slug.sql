-- ============================================================
-- 015_add_custom_slug.sql
-- カスタムURL スラッグ対応
-- ============================================================

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_slug text UNIQUE;

CREATE INDEX IF NOT EXISTS idx_profiles_custom_slug ON profiles(custom_slug);
