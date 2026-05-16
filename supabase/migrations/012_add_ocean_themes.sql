INSERT INTO themes (id, name, description, price, is_free, is_animated, stripe_price_id)
VALUES
  ('ocean_abyss',  'Ocean Abyss',  '深海の暗黒×バイオルミネッセントシアンの幻想テーマ',       500, false, false, null),
  ('ocean_lagoon', 'Ocean Lagoon', 'トロピカルラグーン×エメラルドターコイズのリゾートテーマ', 500, false, false, null),
  ('ocean_arctic', 'Ocean Arctic', '北極海の静寂×氷晶ブルーの澄んだテーマ',                   500, false, false, null)
ON CONFLICT (id) DO NOTHING;
