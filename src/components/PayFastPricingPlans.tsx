import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    period: 'month',
    description: 'For individuals and small teams',
    icon: Zap,
    color: 'blue',
    popular: false,
    features: [
      'Unlimited e-waste calculations',
      'Monthly pickup scheduling',
      'Data destruction certificates (3/month)',
      'Basic impact reports',
      'Email support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    period: 'month',
    description: 'Most popular for growing businesses',
    icon: Shield,
    color: 'green',
    popular: true,
    features: [
      'Everything in Basic',
      'Weekly pickup scheduling',
      'Unlimited certificates',
      'Advanced analytics dashboard',
      'Custom impact reports',
      'Phone & email support',
      'Corporate branding options',
      'API access',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    period: 'month',
    description: 'For large organisations',
    icon: Star,
    color: 'purple',
    popular: false,
    features: [
      'Everything in Premium',
      'Daily pickup service',
      'Dedicated account manager',
      'Custom ERP integrations',
      'White-label certificates',
      'Compliance reporting suite',
      '24/7 priority support',
      'SLA guarantee',
    ],
  },
];

const PayFastPricingPlans = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscription = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      const plan = plans.find(p => p.id === planId);
      if (!plan) return;

      const { data, error } = await supabase.functions.invoke('create-payfast-subscription', {
        body: {
          plan_id: planId,
          amount: plan.price * 100,
          item_name: `EcoBantu ${plan.name} Plan`,
          subscription_type: 1,
        },
      });

      if (error) throw error;

      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error('No payment URL returned');
      }
    } catch {
      toast.error('Could not start payment. Please try again or contact support.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const colorMap: Record<string, { border: string; bg: string; btn: string; badge: string }> = {
    blue: {
      border: 'border-blue-500/50',
      bg: 'bg-blue-500/10',
      btn: 'bg-blue-600 hover:bg-blue-700',
      badge: 'bg-blue-500',
    },
    green: {
      border: 'border-green-500',
      bg: 'bg-green-500/10',
      btn: 'bg-green-600 hover:bg-green-700',
      badge: 'bg-green-500',
    },
    purple: {
      border: 'border-purple-500/50',
      bg: 'bg-purple-500/10',
      btn: 'bg-purple-600 hover:bg-purple-700',
      badge: 'bg-purple-500',
    },
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4" id="pricing">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="bg-green-900/50 border border-green-500/40 text-green-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
            Simple Pricing
          </span>
          <h2 className="text-4xl font-black text-white mt-4 mb-3">
            Plans That Grow With You
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            From individual recyclers to enterprise compliance — pay monthly, cancel anytime.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => {
            const c = colorMap[plan.color];
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 ${c.border} ${plan.popular ? 'ring-2 ring-green-500/30' : ''} bg-gray-900 p-6 flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className={`${c.badge} text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg`}>
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 text-${plan.color}-400`} />
                </div>

                <h3 className="text-xl font-black text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                <div className="flex items-end gap-1 mb-5">
                  <span className="text-4xl font-black text-white">R{plan.price}</span>
                  <span className="text-gray-400 text-sm mb-1.5">/{plan.period}</span>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscription(plan.id)}
                  disabled={loadingPlan !== null}
                  className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm transition-all ${c.btn} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Get Started — R{plan.price}/mo</>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* GreenCert Pro CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-950/60 to-gray-900 border border-green-500/40 rounded-2xl p-8 text-center"
        >
          <Shield className="w-10 h-10 text-green-400 mx-auto mb-3" />
          <h3 className="text-2xl font-black text-white mb-2">
            Need Full POPIA + NEMWA Compliance?
          </h3>
          <p className="text-gray-400 max-w-lg mx-auto mb-5">
            GreenCert Pro gives you unlimited compliance certificates, ESG reports,
            7-year audit archives, and a white-label PDF — all for a one-time lifetime fee.
          </p>
          <Link
            to="/pro"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-black px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-green-500/20"
          >
            See GreenCert Pro — From R2,997 Lifetime
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PayFastPricingPlans;
