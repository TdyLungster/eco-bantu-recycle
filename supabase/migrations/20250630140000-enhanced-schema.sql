
-- Enhanced database schema for Bantu The People E-Waste Platform
-- Drop existing tables if they exist to recreate with proper structure
DROP TABLE IF EXISTS public.impact_metrics CASCADE;
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.sponsorships CASCADE;
DROP TABLE IF EXISTS public.referrals CASCADE;
DROP TABLE IF EXISTS public.chat_conversations CASCADE;
DROP TABLE IF EXISTS public.user_analytics CASCADE;
DROP TABLE IF EXISTS public.pickups CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Enable PostGIS extension for geospatial support
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enhanced Users table with comprehensive profile data
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('individual', 'business', 'government', 'admin', 'partner')) DEFAULT 'individual',
  company_name TEXT,
  address TEXT,
  city TEXT DEFAULT 'Johannesburg',
  province TEXT DEFAULT 'Gauteng',
  postal_code TEXT,
  bee_level TEXT,
  tax_number TEXT,
  registration_number TEXT,
  industry TEXT,
  employee_count INTEGER,
  annual_ewaste_volume DECIMAL(10,2),
  compliance_requirements JSONB DEFAULT '[]'::jsonb,
  subscription_plan TEXT CHECK (subscription_plan IN ('free_trial', 'basic', 'premium', 'enterprise')) DEFAULT 'free_trial',
  trial_uses_remaining INTEGER DEFAULT 3,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'expired')) DEFAULT 'active',
  subscription_start_date DATE,
  subscription_end_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Companies table for detailed business information
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  legal_name TEXT NOT NULL,
  trading_name TEXT,
  registration_number TEXT UNIQUE,
  tax_number TEXT,
  bee_certificate_level TEXT,
  bee_certificate_expiry DATE,
  ewasa_membership_number TEXT,
  industry_sector TEXT,
  employee_count INTEGER,
  annual_revenue DECIMAL(15,2),
  primary_contact_name TEXT,
  primary_contact_email TEXT,
  primary_contact_phone TEXT,
  billing_address TEXT,
  physical_address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  compliance_status TEXT CHECK (compliance_status IN ('compliant', 'non_compliant', 'pending_review')) DEFAULT 'pending_review',
  risk_assessment_score INTEGER CHECK (risk_assessment_score >= 0 AND risk_assessment_score <= 100),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enhanced Pickup Requests with comprehensive tracking
CREATE TABLE public.pickups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id),
  pickup_reference TEXT UNIQUE NOT NULL DEFAULT 'BTP-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(NEXTVAL('pickup_sequence')::TEXT, 6, '0'),
  status TEXT CHECK (status IN ('pending', 'confirmed', 'scheduled', 'in_transit', 'collected', 'processing', 'completed', 'cancelled')) DEFAULT 'pending',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  
  -- Location and scheduling
  pickup_address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  pickup_date DATE,
  pickup_time_slot TEXT,
  estimated_duration INTEGER, -- in minutes
  special_instructions TEXT,
  access_requirements TEXT, -- security clearance, parking, etc.
  
  -- Items and services
  devices JSONB NOT NULL DEFAULT '{}'::jsonb, -- {laptop: 2, phone: 5, monitors: 3}
  estimated_weight_kg DECIMAL(8,2),
  actual_weight_kg DECIMAL(8,2),
  hazardous_materials BOOLEAN DEFAULT false,
  data_destruction_required BOOLEAN DEFAULT false,
  data_destruction_level TEXT CHECK (data_destruction_level IN ('standard', 'secure', 'military_grade')),
  certificate_required BOOLEAN DEFAULT true,
  
  -- Pricing and payment
  service_tier TEXT CHECK (service_tier IN ('free_trial', 'basic', 'premium', 'enterprise')),
  estimated_value DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')) DEFAULT 'pending',
  payment_method TEXT,
  payment_reference TEXT,
  
  -- Processing and compliance
  driver_id UUID,
  collection_photos JSONB DEFAULT '[]'::jsonb,
  processing_notes TEXT,
  compliance_checks JSONB DEFAULT '{}'::jsonb,
  certificate_url TEXT,
  completion_date TIMESTAMPTZ,
  
  -- Impact tracking
  co2_saved_kg DECIMAL(10,2),
  materials_recovered JSONB DEFAULT '{}'::jsonb, -- breakdown by material type
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create sequence for pickup reference numbers
CREATE SEQUENCE pickup_sequence START 1;

-- Documents management for compliance
CREATE TABLE public.company_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  document_type TEXT CHECK (document_type IN (
    'company_profile', 'bee_certificate', 'company_registration', 'affidavit_bee',
    'tax_registration', 'tax_clearance', 'ekurhuleni_letter', 'compensation_letter',
    'ewasa_membership', 'other'
  )) NOT NULL,
  document_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  upload_date TIMESTAMPTZ DEFAULT now(),
  expiry_date DATE,
  verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
  verification_notes TEXT,
  is_required BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subscription plans and pricing
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name TEXT UNIQUE NOT NULL,
  plan_code TEXT UNIQUE NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10,2),
  price_yearly DECIMAL(10,2),
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  limits JSONB NOT NULL DEFAULT '{}'::jsonb, -- pickup limits, weight limits, etc.
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default subscription plans
INSERT INTO public.subscription_plans (plan_name, plan_code, description, price_monthly, price_yearly, features, limits) VALUES
('Free Trial', 'free_trial', '3 free pickups to experience our service', 0, 0, 
 '{"pickups": 3, "data_destruction": "standard", "certificate": true, "support": "email"}',
 '{"max_pickups": 3, "max_weight_kg": 50, "data_destruction_level": "standard"}'),
('Basic Plan', 'basic', 'Perfect for small businesses and households', 299, 2990,
 '{"pickups": "unlimited", "data_destruction": "standard", "certificate": true, "support": "email", "pickup_scheduling": true}',
 '{"max_weight_per_pickup": 100, "data_destruction_level": "standard"}'),
('Premium Plan', 'premium', 'Advanced features for growing businesses', 799, 7990,
 '{"pickups": "unlimited", "data_destruction": "secure", "certificate": true, "support": "phone_email", "priority_scheduling": true, "impact_reports": true}',
 '{"max_weight_per_pickup": 500, "data_destruction_level": "secure", "priority_support": true}'),
('Enterprise Plan', 'enterprise', 'Comprehensive solution for large organizations', 1999, 19990,
 '{"pickups": "unlimited", "data_destruction": "military_grade", "certificate": true, "support": "dedicated_account_manager", "priority_scheduling": true, "impact_reports": true, "compliance_consulting": true, "custom_reporting": true}',
 '{"max_weight_per_pickup": 2000, "data_destruction_level": "military_grade", "dedicated_support": true}');

-- Impact metrics for global counters
CREATE TABLE public.impact_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT UNIQUE NOT NULL,
  metric_value DECIMAL(15,2) NOT NULL DEFAULT 0,
  unit TEXT,
  description TEXT,
  last_updated TIMESTAMPTZ DEFAULT now()
);

-- Insert initial impact metrics
INSERT INTO public.impact_data (metric_name, metric_value, unit, description) VALUES
('total_kg_recycled', 0, 'kg', 'Total weight of e-waste recycled'),
('total_co2_saved', 0, 'kg', 'Total CO2 emissions prevented'),
('total_devices_processed', 0, 'units', 'Number of electronic devices processed'),
('total_clients_served', 0, 'count', 'Number of unique clients served'),
('total_pickups_completed', 0, 'count', 'Number of successful pickups completed');

-- Blog posts for content management
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_id UUID REFERENCES public.users(id),
  category TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Payment transactions
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  pickup_id UUID REFERENCES public.pickups(id),
  transaction_type TEXT CHECK (transaction_type IN ('pickup_payment', 'subscription', 'additional_service')) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  payment_method TEXT CHECK (payment_method IN ('payfast', 'eft', 'cash', 'credit')),
  payment_provider TEXT,
  provider_transaction_id TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')) DEFAULT 'pending',
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User activity analytics
CREATE TABLE public.user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  session_id TEXT,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::jsonb,
  page_url TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own companies" ON public.companies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own companies" ON public.companies
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own pickups" ON public.pickups
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own pickups" ON public.pickups
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own documents" ON public.company_documents
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.companies 
    WHERE companies.id = company_documents.company_id 
    AND companies.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage own documents" ON public.company_documents
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.companies 
    WHERE companies.id = company_documents.company_id 
    AND companies.user_id = auth.uid()
  ));

CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Public can read published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read impact data" ON public.impact_data
  FOR SELECT TO public USING (true);

CREATE POLICY "Public can read subscription plans" ON public.subscription_plans
  FOR SELECT TO public USING (is_active = true);

-- Create indexes for performance
CREATE INDEX idx_pickups_user_id ON public.pickups(user_id);
CREATE INDEX idx_pickups_status ON public.pickups(status);
CREATE INDEX idx_pickups_location ON public.pickups(latitude, longitude);
CREATE INDEX idx_pickups_pickup_date ON public.pickups(pickup_date);
CREATE INDEX idx_companies_user_id ON public.companies(user_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_documents_company_id ON public.company_documents(company_id);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.pickups;
ALTER PUBLICATION supabase_realtime ADD TABLE public.impact_data;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;

-- Functions to update impact data when pickups are completed
CREATE OR REPLACE FUNCTION update_impact_metrics()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Update total weight recycled
    UPDATE public.impact_data 
    SET metric_value = metric_value + COALESCE(NEW.actual_weight_kg, NEW.estimated_weight_kg, 0),
        last_updated = now()
    WHERE metric_name = 'total_kg_recycled';
    
    -- Update CO2 saved
    UPDATE public.impact_data 
    SET metric_value = metric_value + COALESCE(NEW.co2_saved_kg, 0),
        last_updated = now()
    WHERE metric_name = 'total_co2_saved';
    
    -- Update devices processed (sum of device quantities)
    UPDATE public.impact_data 
    SET metric_value = metric_value + (
      SELECT COALESCE(SUM((value)::integer), 0) 
      FROM jsonb_each_text(NEW.devices)
    ),
    last_updated = now()
    WHERE metric_name = 'total_devices_processed';
    
    -- Update pickups completed
    UPDATE public.impact_data 
    SET metric_value = metric_value + 1,
        last_updated = now()
    WHERE metric_name = 'total_pickups_completed';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_impact_metrics
  AFTER UPDATE ON public.pickups
  FOR EACH ROW
  EXECUTE FUNCTION update_impact_metrics();
