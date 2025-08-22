-- Remove unnecessary columns from book_preorders table
ALTER TABLE public.book_preorders 
DROP COLUMN IF EXISTS name,
DROP COLUMN IF EXISTS company,
DROP COLUMN IF EXISTS role;