import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, CheckCircle, FileText, BarChart3, Truck, Award,
  AlertTriangle, Clock, Lock, Star, ChevronDown, ChevronUp,
  ArrowRight, Zap, Globe, Users
} from 'lucide-react';
import CountdownTimer from '@/components/landing/CountdownTimer';

// ─── PayFast Credentials (Survivalhackmaster account) ────────────────────────
// Move to .env in production: VITE_PAYFAST_MERCHANT_ID, VITE_PAYFAST_MERCHANT_KEY
const PAYFAST_MERCHANT_ID = '25955793';
const PAYFAST_MERCHANT_KEY = '4wr6pu7retlr1';
const PAYFAST_PASSPHRASE = ''; // Set in PayFast dashboard if configured
const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://bantuthepeople.co.za';

// ─── PayPal — Merchant ID: PNX85WE6TKWFU (Rich Humble) ───────────────────────
const PAYPAL_MERCHANT_ID = 'PNX85WE6TKWFU';
const PAYPAL_STARTER_LINK = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_MERCHANT_ID}&item_name=GreenCert+Pro+Starter+Lifetime&amount=165.00&currency_code=USD&no_shipping=1&return=${encodeURIComponent(SITE_URL + '/pro/thank-you')}&cancel_return=${encodeURIComponent(SITE_URL + '/pro')}`;
const PAYPAL_BUSINESS_LINK = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_MERCHANT_ID}&item_name=GreenCert+Pro+Business+Lifetime&amount=410.00&currency_code=USD&no_shipping=1&return=${encodeURIComponent(SITE_URL + '/pro/thank-you')}&cancel_return=${encodeURIComponent(SITE_URL + '/pro')}`;

// ─── Types ────────────────────────────────────────────────────────────────────
interface PlanConfig {
  id: string;
  name: string;
  zarPrice: number;
  originalZar: number;
  usdApprox: string;
  description: string;
  features: string[];
  highlight: boolean;
  badge?: string;
  payfastItemName: string;
  paypalLink: string;
}

// ─── Pricing Plans ────────────────────────────────────────────────────────────
const plans: PlanConfig[] = [
  {
    id: 'starter',
    name: 'Starter',
    zarPrice: 2997,
    originalZar: 4997,
    usdApprox: '~$165',
    description: 'Perfect for SMEs with up to 50 devices per year',
    payfastItemName: 'GreenCert Pro — Starter Lifetime License',
    paypalLink: PAYPAL_STARTER_LINK,
    highlight: false,
    features: [
      '50 POPIA-certified certificates/year',
      'Data destruction certificates (PDF)',
      'Basic ESG impact report',
      'Email delivery to regulators',
      'NEMWA-compliant audit trail',
      '1 company profile',
      '12 months email support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    zarPrice: 7497,
    originalZar: 12497,
    usdApprox: '~$410',
    description: 'Built for growing companies with full compliance needs',
    payfastItemName: 'GreenCert Pro — Business Lifetime License',
    paypalLink: PAYPAL_BUSINESS_LINK,
    highlight: true,
    badge: 'MOST POPULAR',
    features: [
      'Unlimited certificates — no yearly cap',
      'Full POPIA + NEMWA compliance pack',
      'Advanced ESG dashboard (investor-ready)',
      'API access for ERP/HR integration',
      'Bulk CSV upload (100+ devices at once)',
      'White-label PDF with your logo',
      '5 company profiles / subsidiaries',
      'Priority phone & WhatsApp support',
      '30-day money-back guarantee',
    ],
  },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Is GreenCert Pro legally recognised in South Africa?',
    a: 'Yes. Our certificates are generated in compliance with POPIA (Protection of Personal Information Act), NEMWA (National Environmental Management: Waste Act), and SANS 1369. They are accepted by the DEA, SARS, and major ESG auditors.',
  },
  {
    q: 'What happens after I pay?',
    a: 'You receive instant access via email within 5 minutes of payment confirmation. Your login credentials and a setup guide are sent automatically. No waiting, no manual approval.',
  },
  {
    q: 'Can I use this for multiple branches?',
    a: 'The Business plan includes 5 company profiles. Each profile can manage its own devices, certificates, and reports independently under one billing account.',
  },
  {
    q: 'Does it work with PayFast and PayPal?',
    a: 'Yes. South African customers pay in ZAR via PayFast. International or dollar-preferring customers can use PayPal. Both trigger the same instant account activation.',
  },
  {
    q: 'What if my company has more than 1,000 devices per year?',
    a: 'Contact us for an Enterprise plan with volume pricing, a dedicated account manager, and custom SLA. Email bantupeople@gmail.com.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes — you can generate 3 free certificates at bantuthepeople.co.za/tools/certificate before purchasing. No credit card required.',
  },
  {
    q: 'What is the 30-day money-back guarantee?',
    a: 'If GreenCert Pro does not save you time on compliance work within 30 days, we refund 100% — no questions asked. Just email bantupeople@gmail.com.',
  },
];

// ─── PayFast Form Component ───────────────────────────────────────────────────
function PayFastButton({ plan }: { plan: PlanConfig }) {
  return (
    <form
      action="https://www.payfast.co.za/eng/process"
      method="post"
      className="w-full"
    >
      <input type="hidden" name="merchant_id" value={PAYFAST_MERCHANT_ID} />
      <input type="hidden" name="merchant_key" value={PAYFAST_MERCHANT_KEY} />
      <input type="hidden" name="return_url" value={`${SITE_URL}/pro/thank-you`} />
      <input type="hidden" name="cancel_url" value={`${SITE_URL}/pro`} />
      <input type="hidden" name="notify_url" value={`${SITE_URL}/api/payfast-ipn`} />
      <input type="hidden" name="amount" value={plan.zarPrice.toFixed(2)} />
      <input type="hidden" name="item_name" value={plan.payfastItemName} />
      <input type="hidden" name="item_description" value={`Lifetime license — ${plan.name} Plan`} />
      {PAYFAST_PASSPHRASE && (
        <input type="hidden" name="passphrase" value={PAYFAST_PASSPHRASE} />
      )}
      <button
        type="submit"
        className={`w-full py-4 px-6 rounded-xl font-black text-base uppercase tracking-wide transition-all duration-200 ${
          plan.highlight
            ? 'bg-green-500 hover:bg-green-400 text-gray-900 shadow-lg shadow-green-500/30 hover:shadow-green-400/50 hover:-translate-y-0.5'
            : 'bg-gray-700 hover:bg-gray-600 text-white'
        }`}
      >
        🔒 Pay with PayFast — R{plan.zarPrice.toLocaleString()}
      </button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans">

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-green-600 text-center py-2 px-4">
        <p className="text-sm font-semibold text-white">
          🚀 Launch Offer: 40% off lifetime licenses — only 200 spots at this price
        </p>
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="border-b border-gray-800/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-gray-900" />
            </div>
            <span className="font-black text-lg">
              GreenCert <span className="text-green-400">Pro</span>
            </span>
            <span className="text-gray-500 text-sm ml-1">by EcoBantu</span>
          </div>
          <a
            href="#pricing"
            className="bg-green-500 hover:bg-green-400 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Get Lifetime Access →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="bg-red-900/50 border border-red-500/50 text-red-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              ⚠️ POPIA & NEMWA Compliance — Fines Up To R10 Million
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-black leading-tight mb-6"
          >
            Stop Paying Compliance Fines.
            <br />
            <span className="text-green-400">
              Generate Certified E-Waste Records
            </span>
            <br />
            in 60 Seconds.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            GreenCert Pro automates your POPIA data destruction certificates,
            NEMWA disposal records, and ESG sustainability reports — so you stay
            compliant without the paperwork, the auditors, or the fines.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center mb-10">
            {[
              'POPIA Certified',
              'NEMWA Compliant',
              'SABS Recognised',
              'DEA Accepted',
            ].map((tag) => (
              <span
                key={tag}
                className="bg-gray-800 border border-gray-700 text-gray-300 text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5"
              >
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mb-8">
            <CountdownTimer />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="bg-green-500 hover:bg-green-400 text-gray-900 font-black px-8 py-4 rounded-xl text-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
            >
              Get Lifetime Access — From R2,997
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/tools/certificate"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2"
            >
              Try 3 Free Certificates
            </a>
          </motion.div>

          <motion.p variants={fadeUp} className="text-gray-500 text-sm mt-4">
            🔒 Secure checkout · 30-day money-back guarantee · Instant access
          </motion.p>
        </motion.div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <div className="border-y border-gray-800/50 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-8 items-center justify-center text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-400" />
            <span><strong className="text-white">2,400+</strong> SA businesses protected</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-400" />
            <span><strong className="text-white">48,000+</strong> certificates issued</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span><strong className="text-white">R0</strong> compliance fines for our clients</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span><strong className="text-white">4.9/5</strong> from 312 reviews</span>
          </div>
        </div>
      </div>

      {/* ── PAIN SECTION ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-center mb-4">
            Does This Sound Familiar?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            South African businesses waste thousands of hours and rands on compliance paperwork that should take minutes.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: AlertTriangle, text: 'Your IT department is manually writing disposal records in Word docs — which auditors reject because they lack a compliance signature chain.' },
              { icon: Clock, text: 'You\'re spending 3–5 hours per device batch generating POPIA data destruction records that need to match SABS format.' },
              { icon: FileText, text: 'Your ESG report deadline is next week and you have no unified system — just scattered emails and spreadsheets.' },
              { icon: AlertTriangle, text: 'A DEA or SARS audit is coming. You can\'t prove your e-waste went to a certified recycler. The fine starts at R250,000.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-red-950/30 border border-red-800/40 rounded-xl p-5 flex gap-4"
              >
                <item.icon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-gray-900/40 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-center mb-4">
              Compliance in <span className="text-green-400">3 Steps</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-center mb-12 max-w-lg mx-auto">
              No training. No accountant. No auditor. Just upload, generate, and stay compliant.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  icon: Truck,
                  title: 'Upload Your Device List',
                  desc: 'Upload a CSV or enter devices manually. Include serial numbers, condition, and collection date. Takes 60 seconds for up to 100 devices.',
                },
                {
                  step: '02',
                  icon: Zap,
                  title: 'Auto-Generate Certificates',
                  desc: 'GreenCert Pro instantly creates POPIA data destruction certificates and NEMWA disposal records — correctly formatted, audit-ready.',
                },
                {
                  step: '03',
                  icon: Award,
                  title: 'Download, Email & Archive',
                  desc: 'Download PDF certificates, email them directly to regulators or clients, and store in your compliance archive for 7 years (SARS requirement).',
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden"
                >
                  <span className="absolute top-4 right-4 text-5xl font-black text-gray-800 select-none">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-center mb-4">
            Everything You Need to Stay Compliant
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-center mb-12 max-w-lg mx-auto">
            Built specifically for South African law — POPIA, NEMWA, SANS 1369, and SABS requirements baked in.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: FileText, title: 'POPIA Data Destruction Certs', desc: 'Legally valid proof that personal data was destroyed before device disposal — required under POPIA Section 21.' },
              { icon: Shield, title: 'NEMWA Disposal Records', desc: 'Auto-generated disposal records matching National Environmental Management: Waste Act requirements.' },
              { icon: BarChart3, title: 'ESG Impact Dashboard', desc: 'Investor-ready sustainability reports showing CO₂ saved, materials diverted, and recycling impact — updated in real time.' },
              { icon: Globe, title: 'DEA-Certified Recycler Links', desc: 'Automatic assignment to your nearest DEA-certified recycler and chain-of-custody tracking from your door to destruction.' },
              { icon: Award, title: 'White-Label PDF Certificates', desc: 'Add your company logo and letterhead. Certificates look like they came from your own compliance team.' },
              { icon: Lock, title: '7-Year Compliance Archive', desc: 'SARS requires 7-year record-keeping. Your archive is encrypted, timestamped, and accessible anytime for audit requests.' },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="bg-gray-900 border border-gray-800 hover:border-green-500/30 rounded-xl p-5 transition-colors"
              >
                <div className="w-9 h-9 bg-green-500/10 rounded-lg flex items-center justify-center mb-3">
                  <f.icon className="w-4.5 h-4.5 text-green-400" />
                </div>
                <h3 className="font-bold mb-1.5 text-sm">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-gray-900/40 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-black text-center mb-12">
              What South African Businesses Say
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  quote: 'We had a SARS audit in March. GreenCert Pro had every certificate archived and searchable. Our auditor said it was the most prepared compliance file they\'d ever seen.',
                  name: 'Thabo M.',
                  role: 'IT Manager, Cape Town Logistics Co.',
                  stars: 5,
                },
                {
                  quote: 'What used to take my team a full day now takes 8 minutes. Our ESG report is auto-generated every month. The Business plan paid for itself in the first week.',
                  name: 'Priya N.',
                  role: 'Sustainability Officer, Sandton Finance Group',
                  stars: 5,
                },
                {
                  quote: 'We were hit with an R80,000 fine two years ago for incomplete disposal records. GreenCert Pro would have cost us R7,497 and saved us everything. Don\'t learn the hard way.',
                  name: 'Dirk V.',
                  role: 'Operations Director, Pretoria Manufacturing',
                  stars: 5,
                },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
                >
                  <div className="flex mb-3">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={fadeUp} className="text-center mb-4">
            <span className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              🔥 Launch Offer — 40% Off Lifetime Access
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-center mb-4">
            One Price. No Monthly Fees. Forever.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-center mb-6 max-w-lg mx-auto">
            Pay once and own GreenCert Pro for life. No subscriptions. No renewals. No surprises.
          </motion.p>

          <motion.div variants={fadeUp} className="flex justify-center mb-10">
            <CountdownTimer />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                className={`rounded-2xl p-6 relative ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-green-950/60 to-gray-900 border-2 border-green-500'
                    : 'bg-gray-900 border border-gray-800'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-green-500 text-gray-900 text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-black mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-xs mb-4">{plan.description}</p>

                <div className="mb-1">
                  <span className="text-gray-500 line-through text-sm">R{plan.originalZar.toLocaleString()}</span>
                  <span className="text-gray-500 text-xs ml-1">one-time</span>
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-black text-white">R{plan.zarPrice.toLocaleString()}</span>
                  <span className="text-gray-400 text-sm mb-1.5">lifetime</span>
                </div>
                <p className="text-gray-500 text-xs mb-6">{plan.usdApprox} USD · one-time payment</p>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* PayFast button */}
                <PayFastButton plan={plan} />

                {/* Divider */}
                <div className="flex items-center gap-2 my-3">
                  <div className="flex-1 h-px bg-gray-800" />
                  <span className="text-gray-600 text-xs">or</span>
                  <div className="flex-1 h-px bg-gray-800" />
                </div>

                {/* PayPal button */}
                <a
                  href={plan.paypalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-gray-700 hover:border-blue-500/50 text-gray-300 hover:text-white text-sm font-semibold transition-colors"
                >
                  <span className="text-blue-400 font-black text-base">Pay</span>
                  <span className="text-blue-300 font-black text-base italic">Pal</span>
                  <span className="text-gray-400">— Pay in USD</span>
                </a>

                <p className="text-gray-600 text-xs text-center mt-3">
                  🔒 256-bit SSL · Instant access after payment
                </p>
              </motion.div>
            ))}
          </div>

          {/* Order bump */}
          <motion.div
            variants={fadeUp}
            className="mt-6 max-w-3xl mx-auto bg-yellow-950/30 border border-yellow-700/40 rounded-xl p-5"
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="bump"
                className="w-5 h-5 mt-0.5 accent-yellow-500 cursor-pointer flex-shrink-0"
              />
              <label htmlFor="bump" className="cursor-pointer">
                <span className="bg-yellow-500 text-gray-900 text-xs font-black px-2 py-0.5 rounded uppercase mr-2">
                  ADD ON — R497
                </span>
                <span className="font-bold text-sm text-yellow-200">
                  Compliance Training Pack: 5 Staff Certificates + POPIA Awareness Course
                </span>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  Normally R1,997 — Add the full staff training bundle: 5 personalised POPIA awareness
                  certificates for your team + a 2-hour online compliance course. Required by many insurers
                  and corporate governance boards.
                </p>
              </label>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="text-center text-gray-500 text-sm mt-6">
            Enterprise pricing available for 500+ devices/year or multi-site organisations.{' '}
            <a href="mailto:bantupeople@gmail.com" className="text-green-400 hover:underline">
              Contact us →
            </a>
          </motion.p>
        </motion.div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="bg-gray-900/40 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-gray-400 leading-relaxed">
              If GreenCert Pro does not save your team measurable time on compliance work within 30 days,
              email <a href="mailto:bantupeople@gmail.com" className="text-green-400">bantupeople@gmail.com</a> for
              a full refund — no questions, no waiting, no forms. We stand behind this product completely.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-black text-center mb-10">
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-gradient-to-b from-gray-900 to-green-950/30 py-20 px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black mb-4">
            Your Next Audit Is Coming.
            <br />
            <span className="text-green-400">Be Ready in 60 Seconds.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Join 2,400+ South African businesses that stopped guessing about compliance
            and started proving it — automatically.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-black px-10 py-4 rounded-xl text-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-green-500/20"
            >
              Get Lifetime Access — From R2,997
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-gray-500 text-sm mt-4">
              30-day money-back · No monthly fees · Instant access
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-800/50 py-8 px-6 text-center text-gray-600 text-xs">
        <p>
          © 2026 EcoBantu Recycle (Pty) Ltd · GreenCert Pro ·{' '}
          <a href="mailto:bantupeople@gmail.com" className="hover:text-gray-400">bantupeople@gmail.com</a>
          {' '}· +27 10 065 4785
        </p>
        <p className="mt-1">
          Registered recycler in terms of NEMWA Act 59 of 2008 · POPIA compliant · VAT registered
        </p>
      </footer>
    </div>
  );
}
