-- ============================================================
-- Veyra: 全マイグレーション（001〜004 まとめて実行）
-- Supabase SQL Editor に貼り付けて Run してください
-- ============================================================


-- ============================================================
-- 001: テーブル作成
-- ============================================================

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

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_links_profile_id ON links(profile_id);
CREATE INDEX idx_links_sort_order ON links(profile_id, sort_order);
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_item ON purchases(user_id, item_type, item_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_links_updated_at
  BEFORE UPDATE ON links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ============================================================
-- 002: RLS ポリシー
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_public"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "profiles_delete_own"
  ON profiles FOR DELETE
  USING (auth.uid()::text = user_id);

CREATE POLICY "links_select_public"
  ON links FOR SELECT USING (true);

CREATE POLICY "links_insert_own"
  ON links FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = links.profile_id
        AND profiles.user_id = auth.uid()::text
    )
  );

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

CREATE POLICY "links_delete_own"
  ON links FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = links.profile_id
        AND profiles.user_id = auth.uid()::text
    )
  );

CREATE POLICY "themes_select_public"
  ON themes FOR SELECT USING (true);

CREATE POLICY "purchases_select_own"
  ON purchases FOR SELECT
  USING (auth.uid()::text = user_id::text);


-- ============================================================
-- 003: テーマ初期データ
-- ============================================================

INSERT INTO themes (id, name, description, price, is_free, is_animated) VALUES
  ('free_basic',      'Basic',           'シンプルな白背景テーマ',                         0,   true,  false),
  ('free_dark',       'Simple Dark',     'シンプルな黒背景テーマ',                         0,   true,  false),
  ('luxury_black',    'Luxury Black',    'ゴールドアクセントの高級感あるテーマ',           500, false, false),
  ('glass_premium',   'Glass Premium',   'ガラスモーフィズムの半透明テーマ',               500, false, false),
  ('neon_glow',       'Neon Glow',       'ネオン発光の派手なSNS向けテーマ',               600, false, false),
  ('animated_aurora', 'Animated Aurora', 'ゆっくり動くグラデーションアニメーションテーマ', 900, false, true)
ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description,
  price       = EXCLUDED.price,
  is_free     = EXCLUDED.is_free,
  is_animated = EXCLUDED.is_animated;


-- ============================================================
-- 004: ヘルパー関数
-- ============================================================

CREATE OR REPLACE FUNCTION has_purchased(
  p_user_id  uuid,
  p_item_type text,
  p_item_id   text
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM purchases
    WHERE user_id   = p_user_id
      AND item_type = p_item_type
      AND item_id   = p_item_id
      AND status    = 'paid'
  );
$$;

CREATE OR REPLACE FUNCTION get_user_purchases(p_user_id uuid)
RETURNS TABLE (item_type text, item_id text)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT p.item_type, p.item_id
  FROM purchases p
  WHERE p.user_id = p_user_id
    AND p.status  = 'paid';
$$;

CREATE OR REPLACE FUNCTION can_use_theme(
  p_user_id  uuid,
  p_theme_id text
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM themes t
    WHERE t.id = p_theme_id
      AND (
        t.is_free = true
        OR has_purchased(p_user_id, 'theme', p_theme_id)
      )
  );
$$;

CREATE OR REPLACE FUNCTION logo_removal_available(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT has_purchased(p_user_id, 'logo_remove', 'logo_remove');
$$;
