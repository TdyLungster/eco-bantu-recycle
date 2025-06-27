
-- Enable PostGIS extension for geospatial support
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enhanced database schema for advanced features

-- Users table with role-based access
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('individual', 'business', 'admin', 'sponsor')) DEFAULT 'individual',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Companies/Corporate clients
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  industry TEXT,
  size TEXT CHECK (size IN ('small', 'medium', 'large', 'enterprise')),
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  tax_number TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- E-waste pickup bookings with location support
CREATE TABLE public.pickups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id),
  devices JSONB NOT NULL, -- {laptop: 2, phone: 5, monitors: 3}
  estimated_value DECIMAL(10,2),
  pickup_address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  pickup_date DATE,
  pickup_time TIME,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  payment_id TEXT,
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  special_instructions TEXT,
  data_destruction_required BOOLEAN DEFAULT false,
  express_pickup BOOLEAN DEFAULT false,
  total_amount DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sponsorship tiers and packages
CREATE TABLE public.sponsorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  tier TEXT CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')) NOT NULL,
  monthly_amount DECIMAL(10,2) NOT NULL,
  features JSONB, -- Logo placement, reports, etc.
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT CHECK (status IN ('active', 'inactive', 'cancelled')) DEFAULT 'active',
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Referral system
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  referral_code TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'rewarded')) DEFAULT 'pending',
  reward_amount DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI chat conversations
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  session_id TEXT NOT NULL,
  messages JSONB NOT NULL, -- Array of {role: 'user'|'assistant', content: '...'}
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Analytics and tracking
CREATE TABLE public.user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  session_id TEXT,
  page_view TEXT,
  action TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Impact tracking for sustainability reports
CREATE TABLE public.impact_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  company_id UUID REFERENCES public.companies(id),
  pickup_id UUID REFERENCES public.pickups(id),
  co2_saved_kg DECIMAL(10,2),
  materials_recovered JSONB, -- {metals: 5.2, plastics: 3.1, rare_earth: 0.8}
  devices_processed INTEGER,
  date_recorded DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Payment transactions
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  pickup_id UUID REFERENCES public.pickups(id),
  sponsorship_id UUID REFERENCES public.sponsorships(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  payment_method TEXT CHECK (payment_method IN ('payfast', 'stripe', 'crypto', 'bank_transfer')),
  payment_provider_id TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for companies
CREATE POLICY "Users can view own companies" ON public.companies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own companies" ON public.companies
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for pickups
CREATE POLICY "Users can view own pickups" ON public.pickups
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own pickups" ON public.pickups
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.pickups;
ALTER PUBLICATION supabase_realtime ADD TABLE public.impact_metrics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;

-- Create indexes for performance
CREATE INDEX idx_pickups_user_id ON public.pickups(user_id);
CREATE INDEX idx_pickups_status ON public.pickups(status);
CREATE INDEX idx_pickups_location ON public.pickups(latitude, longitude);
CREATE INDEX idx_sponsorships_company_id ON public.sponsorships(company_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_impact_metrics_date ON public.impact_metrics(date_recorded);
