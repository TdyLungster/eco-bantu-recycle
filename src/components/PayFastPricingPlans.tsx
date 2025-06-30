
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

const PayFastPricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      period: '3 uses',
      description: 'Perfect for trying our service',
      features: [
        '3 free e-waste calculations',
        'Basic impact reports',
        'Email support',
        'Community resources',
        'Basic recycling tips'
      ],
      limitations: [
        'Limited to 3 calculations',
        'No pickup service',
        'Basic support only'
      ],
      color: 'gray',
      icon: Star,
      popular: false
    },
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 99,
      period: 'month',
      description: 'Great for individuals and small businesses',
      features: [
        'Unlimited e-waste calculations',
        'Monthly pickup service',
        'Detailed impact reports',
        'Data destruction certificates',
        'Priority email support',
        'Mobile app access',
        'Recycling reminders'
      ],
      color: 'blue',
      icon: Zap,
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 199,
      period: 'month',
      description: 'Perfect for growing businesses',
      features: [
        'Everything in Basic',
        'Weekly pickup service',
        'Advanced analytics dashboard',
        'Custom impact reports',
        'Phone & email support',
        'Corporate branding options',
        'Bulk processing discounts',
        'API access'
      ],
      color: 'green',
      icon: Shield,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 499,
      period: 'month',
      description: 'For large organizations',
      features: [
        'Everything in Premium',
        'Daily pickup service',
        'Dedicated account manager',
        'Custom integration support',
        'White-label solutions',
        'Advanced security features',
        'Compliance reporting',
        'SLA guarantee',
        '24/7 support'
      ],
      color: 'purple',
      icon: Star,
      popular: false
    }
  ];

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
      const { data, error } = await supabase.functions.invoke('create-payfast-subscription', {
        body: {
          plan_id: planId,
          amount: plan.price * 100, // Convert to cents
          item_name: plan.name,
          subscription_type: 1, // Monthly
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

  return (
    <div className="bg-gradient-to-br from-gray-50 to-green-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Recycling Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start with our free trial and upgrade as your e-waste needs grow
          </p>

          {/* Toggle for Monthly/Yearly */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-gray-600">Monthly</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-12 h-6 bg-gray-300 rounded-full shadow-inner"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform duration-300 ease-in-out"></div>
            </div>
            <span className="text-gray-600">Yearly <span className="text-green-600 font-semibold">(Save 20%)</span></span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-green-500 ring-opacity-50' : ''
                } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className={`p-6 ${plan.popular ? 'pt-12' : ''}`}>
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      plan.color === 'gray' ? 'bg-gray-100 text-gray-600' :
                      plan.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      plan.color === 'green' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    
                    <div className="text-center">
                      <span className="text-4xl font-bold text-gray-800">
                        R{plan.price}
                      </span>
                      <span className="text-gray-600 ml-1">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Limitations:</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, idx) => (
                            <li key={idx} className="text-xs text-gray-400">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={() => handleSubscription(plan.id)}
                    disabled={isProcessing}
                    className={`w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 ${
                      plan.id === 'free' 
                        ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        : plan.popular
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      plan.id === 'free' ? 'Start Free Trial' : 'Subscribe Now'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Secure Payment with PayFast
            </h3>
            <p className="text-gray-600 mb-6">
              All payments are processed securely through PayFast, South Africa's leading payment gateway. 
              Your financial information is protected with bank-level security.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Bank-Level Security</h4>
                <p className="text-gray-600 text-sm">PCI DSS compliant payment processing</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Instant Activation</h4>
                <p className="text-gray-600 text-sm">Access your plan immediately after payment</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Cancel Anytime</h4>
                <p className="text-gray-600 text-sm">No long-term contracts or hidden fees</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PayFastPricingPlans;
