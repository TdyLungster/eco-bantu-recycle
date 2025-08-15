
-- Enable Row Level Security on tables that need it
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for referrals table
CREATE POLICY "Users can view their own referrals" ON public.referrals
  FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "Users can create referrals" ON public.referrals
  FOR INSERT WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "Users can update their own referrals" ON public.referrals
  FOR UPDATE USING (auth.uid() = referrer_id);

-- Create RLS policies for sponsorships table (company-based access)
CREATE POLICY "Users can view sponsorships for their companies" ON public.sponsorships
  FOR SELECT USING (
    company_id IN (
      SELECT id FROM public.companies WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create sponsorships for their companies" ON public.sponsorships
  FOR INSERT WITH CHECK (
    company_id IN (
      SELECT id FROM public.companies WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update sponsorships for their companies" ON public.sponsorships
  FOR UPDATE USING (
    company_id IN (
      SELECT id FROM public.companies WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for impact_metrics table
CREATE POLICY "Users can view their own impact metrics" ON public.impact_metrics
  FOR SELECT USING (
    auth.uid() = user_id OR 
    company_id IN (
      SELECT id FROM public.companies WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert impact metrics" ON public.impact_metrics
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for chat_conversations table
CREATE POLICY "Users can view their own conversations" ON public.chat_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations" ON public.chat_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" ON public.chat_conversations
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for user_analytics table
CREATE POLICY "Users can view their own analytics" ON public.user_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics" ON public.user_analytics
  FOR INSERT WITH CHECK (true);
