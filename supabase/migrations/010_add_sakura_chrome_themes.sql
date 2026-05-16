-- Sakura series
INSERT INTO themes (id, name, description, price, is_free, is_animated, stripe_price_id)
VALUES
  ('sakura_white',    'Sakura White',    '薄桜×ダスティローズの和モダンなライトテーマ',         500, false, false, null),
  ('sakura_dusk',     'Sakura Dusk',     '夜桜の深紅×チェリーピンクのダークテーマ',             500, false, false, null),
  ('sakura_matcha',   'Sakura Matcha',   '抹茶の深緑×桜ピンクのコントラストテーマ',             500, false, false, null)
ON CONFLICT (id) DO NOTHING;

-- Chrome series
INSERT INTO themes (id, name, description, price, is_free, is_animated, stripe_price_id)
VALUES
  ('chrome_silver',   'Chrome Silver',   'スティールブラック×シルバーの金属質感テーマ',         500, false, false, null),
  ('chrome_platinum', 'Chrome Platinum', 'ディープブラック×プラチナホワイトの純粋な金属感',     500, false, false, null),
  ('chrome_void',     'Chrome Void',     '漆黒の宇宙×エレクトリックブルーのSFメタルテーマ',     500, false, false, null)
ON CONFLICT (id) DO NOTHING;
