-- Migration 006: add link_size column and support gallery link_type

-- 1. link_size: 'small' (2 per row) or 'large' (full width) for image links
ALTER TABLE public.links
  ADD COLUMN IF NOT EXISTS link_size TEXT NOT NULL DEFAULT 'small';

-- 2. gallery photos: stored as link_type = 'gallery'
--    If there is a CHECK constraint on link_type, drop and recreate it.
DO $$
BEGIN
  -- Drop existing check constraint on link_type if it exists
  DECLARE
    constraint_name TEXT;
  BEGIN
    SELECT tc.constraint_name INTO constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.check_constraints cc
      ON tc.constraint_name = cc.constraint_name
    WHERE tc.table_name = 'links'
      AND tc.constraint_type = 'CHECK'
      AND cc.check_clause LIKE '%link_type%';

    IF constraint_name IS NOT NULL THEN
      EXECUTE 'ALTER TABLE public.links DROP CONSTRAINT ' || quote_ident(constraint_name);
    END IF;
  END;
END $$;

-- Add updated CHECK constraint allowing 'text', 'image', 'gallery'
ALTER TABLE public.links
  ADD CONSTRAINT links_link_type_check
  CHECK (link_type IN ('text', 'image', 'gallery'));
