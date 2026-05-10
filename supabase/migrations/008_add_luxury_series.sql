-- ============================================================
-- 008_add_luxury_series.sql
-- Veyra: Luxury Navy / Luxury Ivory テーマ追加
-- ============================================================

INSERT INTO themes (id, name, description, price, is_free, is_animated) VALUES
  ('luxury_navy',  'Luxury Navy',  'ディープネイビー×ゴールドの上質なテーマ',          500, false, false),
  ('luxury_ivory', 'Luxury Ivory', 'アイボリー×アンティークゴールドの洗練されたテーマ', 500, false, false)
ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description,
  price       = EXCLUDED.price,
  is_free     = EXCLUDED.is_free,
  is_animated = EXCLUDED.is_animated;
