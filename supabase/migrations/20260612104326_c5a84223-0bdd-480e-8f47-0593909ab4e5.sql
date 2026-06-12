
-- Lock down SECURITY DEFINER functions: only authenticated users
REVOKE EXECUTE ON FUNCTION public.has_role(app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.use_trial_calculation() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_trial_status() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.use_trial_calculation() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_trial_status() TO authenticated;

-- Tighten pickups INSERT: require authenticated role and non-null uid
DROP POLICY IF EXISTS "Users can create own pickups" ON public.pickups;
CREATE POLICY "Users can create own pickups"
  ON public.pickups FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Scope existing SELECT policies to authenticated role only
DROP POLICY IF EXISTS "Users can view own pickups" ON public.pickups;
CREATE POLICY "Users can view own pickups"
  ON public.pickups FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all pickups" ON public.pickups;
CREATE POLICY "Admins can view all pickups"
  ON public.pickups FOR SELECT
  TO authenticated
  USING (public.has_role('admin'::app_role));

-- Allow users to update/cancel own pickups (only while pending); admins full
CREATE POLICY "Users can update own pending pickups"
  ON public.pickups FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update any pickup"
  ON public.pickups FOR UPDATE
  TO authenticated
  USING (public.has_role('admin'::app_role))
  WITH CHECK (public.has_role('admin'::app_role));

CREATE POLICY "Users can delete own pending pickups"
  ON public.pickups FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admins can delete any pickup"
  ON public.pickups FOR DELETE
  TO authenticated
  USING (public.has_role('admin'::app_role));

-- Scope profiles, transactions, user_roles policies to authenticated
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all transactions" ON public.transactions;
CREATE POLICY "Admins can view all transactions" ON public.transactions
  FOR SELECT TO authenticated USING (public.has_role('admin'::app_role));

DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Remove anon SELECT access if granted (defense in depth)
REVOKE SELECT ON public.profiles FROM anon;
REVOKE SELECT ON public.transactions FROM anon;
REVOKE SELECT ON public.user_roles FROM anon;
REVOKE INSERT, UPDATE, DELETE, SELECT ON public.pickups FROM anon;
