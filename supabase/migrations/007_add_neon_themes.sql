-- ============================================================
-- 007_add_neon_themes.sql
-- Veyra: Neon Amber / Neon Violet テーマ追加
-- ============================================================

INSERT INTO themes (id, name, description, price, is_free, is_animated) VALUES
  ('neon_amber',  'Neon Amber',  'オレンジ×ゴールドの熱いネオンテーマ',           600, false, false),
  ('neon_violet', 'Neon Violet', 'パープル×グリーンのサイバーパンクネオンテーマ', 600, false, false)
ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description,
  price       = EXCLUDED.price,
  is_free     = EXCLUDED.is_free,
  is_animated = EXCLUDED.is_animated;
