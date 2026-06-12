import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Download, MessageSquare, ArrowRight, Shield } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function ProThankYou() {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(10);

  // PayFast passes payment_id, item_name, and custom fields in the return URL
  const itemName = searchParams.get('item_name') ?? 'GreenCert Pro';
  const paymentId = searchParams.get('payment_id') ?? '—';
  const email = searchParams.get('email_address') ?? 'your inbox';

  // Confetti-like auto-redirect after 10 seconds (optional — remove if unwanted)
  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(id);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12 }}
        className="max-w-xl w-full text-center"
      >
        {/* Success icon */}
        <motion.div variants={fadeUp} className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-2">
          <span className="bg-green-900/50 text-green-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
            Payment Confirmed
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-black mt-4 mb-3">
          Welcome to GreenCert <span className="text-green-400">Pro!</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-8">
          Your lifetime license for <strong className="text-white">{itemName}</strong> is now active.
          Check <strong className="text-white">{email}</strong> — your login credentials and setup guide
          have been sent.
        </motion.p>

        {/* Steps */}
        <motion.div variants={fadeUp} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left mb-6 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-2">
            Your Next 3 Steps
          </h2>
          {[
            { icon: Mail, step: '01', title: 'Check your email', desc: 'Login credentials and your setup guide are on their way. Check spam if you don\'t see it in 5 minutes.' },
            { icon: Shield, step: '02', title: 'Log in and add your company', desc: 'Set up your company profile, upload your logo, and configure your compliance settings — takes 10 minutes.' },
            { icon: Download, step: '03', title: 'Generate your first certificate', desc: 'Upload a device batch (or enter manually) and generate your first POPIA-certified certificate in under 60 seconds.' },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <s.icon className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">{s.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* WhatsApp support */}
        <motion.div variants={fadeUp} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3 mb-6 text-left">
          <MessageSquare className="w-5 h-5 text-green-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">Need help? WhatsApp us directly</p>
            <p className="text-xs text-gray-500">
              Message <span className="text-green-400">+27 10 065 4785</span> — we respond within 2 hours on business days.
            </p>
          </div>
        </motion.div>

        {paymentId !== '—' && (
          <motion.p variants={fadeUp} className="text-gray-600 text-xs mb-6">
            Payment reference: {paymentId}
          </motion.p>
        )}

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="mailto:bantupeople@gmail.com"
            className="flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Contact Support
          </a>
        </motion.div>

        <motion.p variants={fadeUp} className="text-gray-700 text-xs mt-6">
          Share GreenCert Pro with a colleague and earn R500 per referral.{' '}
          <a href="mailto:bantupeople@gmail.com?subject=Referral Program" className="text-green-600 hover:text-green-400">
            Learn more →
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
