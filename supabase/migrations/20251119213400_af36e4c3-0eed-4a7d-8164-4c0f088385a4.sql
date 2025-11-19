-- Comprehensive database setup with all security fixes

-- Create profiles table (instead of users table to avoid auth conflicts)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  company_name TEXT,
  trial_uses_remaining INTEGER DEFAULT 3,
  trial_expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '30 days'),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create app_role enum
CREATE TYPE app_role AS ENUM ('user', 'admin', 'business');

-- Create user_roles table (prevents privilege escalation)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
  ON user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION has_role(check_role app_role)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN EXISTS(
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = check_role
  );
END;
$$;

-- Function to use trial calculation (server-side enforcement)
CREATE OR REPLACE FUNCTION use_trial_calculation()
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  remaining INTEGER;
BEGIN
  UPDATE profiles 
  SET trial_uses_remaining = GREATEST(trial_uses_remaining - 1, 0)
  WHERE id = auth.uid() 
    AND trial_uses_remaining > 0
    AND (trial_expires_at IS NULL OR trial_expires_at > now())
  RETURNING trial_uses_remaining INTO remaining;
  
  IF remaining IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'remaining', 0,
      'message', 'No trial calculations remaining'
    );
  END IF;
  
  RETURN jsonb_build_object(
    'success', true,
    'remaining', remaining,
    'message', 'Trial calculation used'
  );
END;
$$;

-- Function to get trial status
CREATE OR REPLACE FUNCTION get_trial_status()
RETURNS JSONB
SECURITY DEFINER
SET search_path = public
LANGUAGE sql
AS $$
  SELECT jsonb_build_object(
    'remaining', COALESCE(trial_uses_remaining, 0),
    'expires_at', trial_expires_at,
    'expired', trial_expires_at < now()
  )
  FROM profiles WHERE id = auth.uid();
$$;

-- Trigger for profile creation on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Assign default user role
  INSERT INTO user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create pickups table
CREATE TABLE pickups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  item_description TEXT NOT NULL,
  estimated_weight NUMERIC,
  preferred_date DATE,
  preferred_time TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE pickups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pickups"
  ON pickups FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own pickups"
  ON pickups FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all pickups"
  ON pickups FOR SELECT
  USING (has_role('admin'));

-- Create transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payfast_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions"
  ON transactions FOR SELECT
  USING (has_role('admin'));

-- Performance indexes
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_profiles_trial ON profiles(trial_uses_remaining, trial_expires_at);
CREATE INDEX idx_pickups_user_id ON pickups(user_id);
CREATE INDEX idx_pickups_status ON pickups(status);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_payfast ON transactions(payfast_payment_id);