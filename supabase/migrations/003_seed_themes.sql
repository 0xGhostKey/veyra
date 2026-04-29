-- ============================================================
-- 003_seed_themes.sql
-- Veyra: 初期テーマデータ投入
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
