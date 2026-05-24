-- ============================================================
-- 014_add_subscription_fields.sql
-- ロゴ非表示の月額サブスクリプション対応
-- ============================================================

-- profiles に Stripe サブスクリプション関連カラムを追加
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id text,
  ADD COLUMN IF NOT EXISTS subscription_status text;

-- インデックス
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_subscription_id ON profiles(stripe_subscription_id);
