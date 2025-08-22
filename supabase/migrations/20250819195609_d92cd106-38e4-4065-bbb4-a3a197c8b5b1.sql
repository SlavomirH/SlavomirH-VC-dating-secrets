-- Fix search_path for existing functions to address security warnings
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.user_id = $1
  );
$function$;

CREATE OR REPLACE FUNCTION public.get_preorder_stats()
 RETURNS json
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT json_build_object(
    'total_preorders', COUNT(*),
    'daily_signups', (
      SELECT COUNT(*) 
      FROM public.book_preorders 
      WHERE created_at >= CURRENT_DATE
    ),
    'weekly_signups', (
      SELECT COUNT(*) 
      FROM public.book_preorders 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    )
  )
  FROM public.book_preorders;
$function$;

-- Ensure RLS is enabled on book_preorders table
ALTER TABLE public.book_preorders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them with better security
DROP POLICY IF EXISTS "Admins can view all preorders" ON public.book_preorders;
DROP POLICY IF EXISTS "Anyone can create preorder" ON public.book_preorders;

-- Create more restrictive policies
-- Only authenticated admins can view preorders
CREATE POLICY "Only admins can view preorders"
ON public.book_preorders
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Only allow authenticated users to create preorders
CREATE POLICY "Authenticated users can create preorders"
ON public.book_preorders
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Ensure no public access by explicitly denying anonymous users
CREATE POLICY "Deny anonymous access"
ON public.book_preorders
FOR ALL
TO anon
USING (false);