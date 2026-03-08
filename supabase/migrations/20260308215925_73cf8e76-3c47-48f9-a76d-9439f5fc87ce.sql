-- Drop old SELECT policy
DROP POLICY IF EXISTS "Authenticated users can read submissions" ON public.password_submissions;

-- Allow anon and authenticated to read (admin dashboard uses custom auth, not Supabase auth)
CREATE POLICY "Admin can read all submissions"
  ON public.password_submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);