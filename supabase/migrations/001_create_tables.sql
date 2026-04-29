-- ============================================================
-- 001_create_tables.sql
-- Veyra: テーブル作成マイグレーション
-- ============================================================

-- profiles テーブル
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL,
  display_name text,
  bio text,
  avatar_url text,
  selected_theme text NOT NULL DEFAULT 'free_basic',
  logo_removed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- links テーブル
CREATE TABLE links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  icon_type text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- themes テーブル
CREATE TABLE themes (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  price integer NOT NULL DEFAULT 0,
  is_free boolean NOT NULL DEFAULT false,
  is_animated boolean NOT NULL DEFAULT false,
  stripe_price_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- purchases テーブル
CREATE TABLE purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  item_type text NOT NULL CHECK (item_type IN ('logo_remove', 'theme', 'theme_pack')),
  item_id text NOT NULL,
  amount integer NOT NULL,
  stripe_session_id text,
  stripe_payment_intent_id text,
  status text NOT NULL CHECK (status IN ('paid', 'failed', 'refunded')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- インデックス
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_links_profile_id ON links(profile_id);
CREATE INDEX idx_links_sort_order ON links(profile_id, sort_order);
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_item ON purchases(user_id, item_type, item_id);

-- updated_at 自動更新トリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- profiles の updated_at トリガー
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- links の updated_at トリガー
CREATE TRIGGER trg_links_updated_at
  BEFORE UPDATE ON links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
