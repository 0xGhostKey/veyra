-- ============================================================
-- 004_functions.sql
-- Veyra: ヘルパー関数
-- ============================================================

-- ----------------------------------------------------------
-- has_purchased: ユーザーが特定アイテムを購入済みか確認
-- ----------------------------------------------------------
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

-- ----------------------------------------------------------
-- get_user_purchases: ユーザーの全購入アイテムID一覧を返す
-- ----------------------------------------------------------
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

-- ----------------------------------------------------------
-- can_use_theme: ユーザーがテーマを使用できるか確認
-- （無料テーマ OR 購入済みテーマ）
-- ----------------------------------------------------------
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

-- ----------------------------------------------------------
-- logo_removal_available: ユーザーがロゴ非表示を購入済みか
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION logo_removal_available(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT has_purchased(p_user_id, 'logo_remove', 'logo_remove');
$$;
