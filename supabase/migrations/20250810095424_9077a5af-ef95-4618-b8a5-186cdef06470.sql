-- Create a table for book preorders
CREATE TABLE public.book_preorders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  interested_chapters TEXT[],
  marketing_consent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.book_preorders ENABLE ROW LEVEL SECURITY;

-- Create policy for public to insert preorders (anyone can sign up)
CREATE POLICY "Anyone can create preorder"
ON public.book_preorders
FOR INSERT
WITH CHECK (true);

-- Create admin table for managing access
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.user_id = $1
  );
$$;

-- Admin users can view all preorders
CREATE POLICY "Admins can view all preorders"
ON public.book_preorders
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Users can manage their own admin status
CREATE POLICY "Users can view their admin status"
ON public.admin_users
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Add function to get preorder statistics
CREATE OR REPLACE FUNCTION public.get_preorder_stats()
RETURNS JSON
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
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
$$;