import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';
const PayFastPricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isProcessing, setIsProcessing] = useState(false);
  const plans = [{
    id: 'free',
    name: 'Free Trial',
    price: 0,
    period: '3 uses',
    description: 'Perfect for trying our service',
    features: ['3 free e-waste calculations', 'Basic impact reports', 'Email support', 'Community resources', 'Basic recycling tips'],
    limitations: ['Limited to 3 calculations', 'No pickup service', 'Basic support only'],
    color: 'gray',
    icon: Star,
    popular: false
  }, {
    id: 'basic',
    name: 'Basic Plan',
    price: 99,
    period: 'month',
    description: 'Great for individuals and small businesses',
    features: ['Unlimited e-waste calculations', 'Monthly pickup service', 'Detailed impact reports', 'Data destruction certificates', 'Priority email support', 'Mobile app access', 'Recycling reminders'],
    color: 'blue',
    icon: Zap,
    popular: false
  }, {
    id: 'premium',
    name: 'Premium Plan',
    price: 199,
    period: 'month',
    description: 'Perfect for growing businesses',
    features: ['Everything in Basic', 'Weekly pickup service', 'Advanced analytics dashboard', 'Custom impact reports', 'Phone & email support', 'Corporate branding options', 'Bulk processing discounts', 'API access'],
    color: 'green',
    icon: Shield,
    popular: true
  }, {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    period: 'month',
    description: 'For large organizations',
    features: ['Everything in Premium', 'Daily pickup service', 'Dedicated account manager', 'Custom integration support', 'White-label solutions', 'Advanced security features', 'Compliance reporting', 'SLA guarantee', '24/7 support'],
    color: 'purple',
    icon: Star,
    popular: false
  }];
  const handleSubscription = async (planId: string) => {
    if (planId === 'free') {
      // Handle free trial logic
      toast.success('Free trial activated! You have 3 calculations remaining.');
      return;
    }
    setIsProcessing(true);
    try {
      const plan = plans.find(p => p.id === planId);

      // Create PayFast subscription
      const {
        data,
        error
      } = await supabase.functions.invoke('create-payfast-subscription', {
        body: {
          plan_id: planId,
          amount: plan.price * 100,
          // Convert to cents
          item_name: plan.name,
          subscription_type: 1 // Monthly
        }
      });
      if (error) throw error;

      // Redirect to PayFast
      if (data.payment_url) {
        window.open(data.payment_url, '_blank');
      }
      toast.success('Redirecting to PayFast for secure payment...');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to process subscription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  return <div className="bg-gradient-to-br from-gray-50 to-green-50 py-16">
      <div className="container mx-auto px-4">
        

        

        {/* Additional Information */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mt-12">
          
        </motion.div>
      </div>
    </div>;
};
export default PayFastPricingPlans;