-- Add snow series themes to the themes table
INSERT INTO themes (id, name, price, stripe_price_id) VALUES
  ('snow_night',  'Snow Night',  600, null),
  ('snow_aurora', 'Snow Aurora', 600, null),
  ('snow_powder', 'Snow Powder', 600, null)
ON CONFLICT (id) DO NOTHING;
