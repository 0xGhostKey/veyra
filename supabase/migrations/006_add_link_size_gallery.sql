-- Migration 006: add link_size column and support gallery link_type

-- 1. link_size カラムを追加
ALTER TABLE public.links
  ADD COLUMN IF NOT EXISTS link_size TEXT NOT NULL DEFAULT 'small';

-- 2. link_type の CHECK 制約を安全に更新
DO $$
DECLARE
  v_constraint_name TEXT;
BEGIN
  SELECT tc.constraint_name INTO v_constraint_name
  FROM information_schema.table_constraints tc
  JOIN information_schema.check_constraints cc
    ON tc.constraint_name = cc.constraint_name
  WHERE tc.table_name = 'links'
    AND tc.constraint_type = 'CHECK'
    AND cc.check_clause LIKE '%link_type%'
    AND tc.constraint_name NOT LIKE '%not_null%';

  IF v_constraint_name IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.links DROP CONSTRAINT ' || quote_ident(v_constraint_name);
  END IF;
END $$;

-- 3. 新しい CHECK 制約を追加（既に存在する場合はスキップ）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'links'
      AND constraint_name = 'links_link_type_check'
  ) THEN
    ALTER TABLE public.links
      ADD CONSTRAINT links_link_type_check
      CHECK (link_type IN ('text', 'image', 'gallery'));
  END IF;
END $$;
