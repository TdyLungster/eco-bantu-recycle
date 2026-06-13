import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, ArrowRight, Lock, RotateCcw, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://bantuthepeople.com';
const MERCHANT_ID = import.meta.env.VITE_PAYFAST_MERCHANT_ID ?? '25955793';
const MERCHANT_KEY = import.meta.env.VITE_PAYFAST_MERCHANT_KEY ?? '4wr6pu7retlr1';
// IPN webhook → Supabase Edge Function (no Netlify backend needed)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? '';
const NOTIFY_URL = SUPABASE_URL
  ? `${SUPABASE_URL}/functions/v1/handle-payfast-webhook`
  : `${SITE_URL}/api/payfast-ipn`;

function getBillingDate() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1, 1);
  return d.toISOString().split('T')[0];
}

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    description: 'For individuals and small teams',
    icon: Zap,
    accent: 'from-teal-400 to-emerald-500',
    borderIdle: 'border-gray-700',
    borderHover: 'hover:border-teal-500/50',
    btnClass: 'bg-teal-600 hover:bg-teal-500',
    popular: false,
    features: [
      'Unlimited e-waste calculations',
      'Monthly pickup scheduling',
      'Data destruction certificates (3/mo)',
      'Basic impact reports',
      'Email support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    description: 'Most popular for growing businesses',
    icon: Shield,
    accent: 'from-green-500 to-emerald-500',
    borderIdle: 'border-green-500/60',
    borderHover: 'hover:border-green-400',
    btnClass: 'bg-green-600 hover:bg-green-500',
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
    description: 'For large organisations',
    icon: Star,
    accent: 'from-emerald-600 to-green-800',
    borderIdle: 'border-gray-700',
    borderHover: 'hover:border-emerald-600/50',
    btnClass: 'bg-emerald-700 hover:bg-emerald-600',
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

const TRUST = [
  { icon: Lock, label: '256-bit SSL encryption' },
  { icon: RotateCcw, label: 'Cancel anytime' },
  { icon: HeadphonesIcon, label: 'Setup assistance included' },
];

function PayFastForm({ plan }: { plan: typeof plans[0] }) {
  const billingDate = getBillingDate();
  return (
    <form
      action="https://www.payfast.co.za/eng/process"
      method="POST"
      className="w-full"
    >
      <input type="hidden" name="merchant_id" value={MERCHANT_ID} />
      <input type="hidden" name="merchant_key" value={MERCHANT_KEY} />
      <input type="hidden" name="return_url" value={`${SITE_URL}/pro/thank-you`} />
      <input type="hidden" name="cancel_url" value={`${SITE_URL}/`} />
      <input type="hidden" name="notify_url" value={NOTIFY_URL} />
      <input type="hidden" name="amount" value={plan.price.toFixed(2)} />
      <input type="hidden" name="item_name" value={`Bantu The People ${plan.name} Plan`} />
      <input type="hidden" name="subscription_type" value="1" />
      <input type="hidden" name="billing_date" value={billingDate} />
      <input type="hidden" name="recurring_amount" value={plan.price.toFixed(2)} />
      <input type="hidden" name="frequency" value="3" />
      <input type="hidden" name="cycles" value="0" />
      <button
        type="submit"
        className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm transition-all ${plan.btnClass} flex items-center justify-center gap-2 shadow-lg`}
      >
        <Lock className="w-3.5 h-3.5 opacity-70" />
        Get Started — R{plan.price}/mo
      </button>
    </form>
  );
}

const PayFastPricingPlans = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="bg-gray-950 py-20 px-4" id="pricing">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Monthly Plans
          </span>
          <h2 className="text-4xl font-black text-white mt-4 mb-3">
            Plans That Grow With You
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From individual recyclers to enterprise compliance — pay monthly, cancel anytime. Billed in ZAR via PayFast.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHovered(plan.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-2xl border-2 ${plan.borderIdle} ${plan.borderHover} bg-gray-900 p-6 flex flex-col gap-4 transition-all duration-300 ${hovered === plan.id ? 'shadow-xl -translate-y-1' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-green-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-green-500/30">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon + gradient accent */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.accent} p-0.5`}>
                  <div className="w-full h-full bg-gray-900 rounded-[10px] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">{plan.name}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1.5 pb-1 border-b border-gray-800">
                  <span className={`text-4xl font-black bg-gradient-to-r ${plan.accent} bg-clip-text text-transparent`}>R{plan.price}</span>
                  <span className="text-gray-500 text-sm mb-1.5">/month</span>
                </div>

                {/* Features */}
                <ul className="space-y-2 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* PayFast direct form — no backend needed */}
                <PayFastForm plan={plan} />
              </motion.div>
            );
          })}
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {TRUST.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-gray-500 text-xs">
              <Icon className="w-3.5 h-3.5 text-green-500" />
              {label}
            </div>
          ))}
        </div>

        {/* GreenCert Pro CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gray-900 border border-green-500/30 rounded-2xl p-8 text-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 pointer-events-none" />
          <Shield className="w-10 h-10 text-green-400 mx-auto mb-3" />
          <h3 className="text-2xl font-black text-white mb-2">
            Need Full POPIA + NEMWA Compliance?
          </h3>
          <p className="text-gray-400 max-w-lg mx-auto mb-5 text-sm leading-relaxed">
            GreenCert Pro gives you unlimited compliance certificates, ESG reports,
            7-year audit archives, and a white-label PDF — all for a <strong className="text-white">one-time lifetime fee</strong>.
            No monthly billing, no surprises.
          </p>
          <Link
            to="/pro"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-black px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-green-500/25"
          >
            See GreenCert Pro — From R2,997 Lifetime
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-gray-600 text-xs mt-3">One-time payment · Instant delivery · 7-day money-back guarantee</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PayFastPricingPlans;
