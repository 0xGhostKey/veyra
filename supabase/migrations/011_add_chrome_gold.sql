INSERT INTO themes (id, name, description, price, is_free, is_animated, stripe_price_id)
VALUES
  ('chrome_gold', 'Chrome Gold', 'ディープブラック×バーニッシュゴールドの金属光沢テーマ', 500, false, false, null)
ON CONFLICT (id) DO NOTHING;
