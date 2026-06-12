import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Truck, FileText } from 'lucide-react';

interface HeroContentProps {
  textY: MotionValue<number>;
}

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const STATS = [
  { label: 'Tonnes Recycled', target: 536, suffix: '+' },
  { label: 'Companies Served', target: 2000, suffix: '+' },
  { label: 'Certificates Issued', target: 8400, suffix: '+' },
  { label: 'CO₂ Saved (kg)', target: 375000, suffix: '+' },
];

function StatCard({ label, target, suffix }: { label: string; target: number; suffix: string }) {
  const { count, ref } = useCountUp(target, 2200);
  return (
    <div className="text-center">
      <span ref={ref} className="block text-2xl md:text-3xl font-black text-green-400 tabular-nums">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-gray-400 text-xs mt-0.5 block">{label}</span>
    </div>
  );
}

const TRUST_BADGES = [
  { icon: Shield, label: 'POPIA Compliant' },
  { icon: FileText, label: 'NEMWA Certified' },
  { icon: CheckCircle, label: 'ISO 14001 Aligned' },
  { icon: Truck, label: 'Free Pickup' },
];

const HeroContent = ({ textY }: HeroContentProps) => {
  return (
    <motion.div
      className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6"
      style={{ y: textY }}
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
      >
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        South Africa's #1 Certified E-Waste Recyclers
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="text-4xl sm:text-6xl md:text-7xl font-black mb-5 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <span className="text-white">Transform Your </span>
        <motion.span
          className="text-green-400 inline-block"
          animate={{
            textShadow: [
              '0 0 12px rgba(34,197,94,0.4)',
              '0 0 24px rgba(34,197,94,0.7)',
              '0 0 12px rgba(34,197,94,0.4)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          E-Waste
        </motion.span>
        <span className="text-white"> Into Compliance</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        Free corporate pickup · POPIA-certified data destruction · NEMWA-compliant certificates.
        <span className="text-green-400 font-semibold"> Serving Johannesburg, Cape Town &amp; Durban.</span>
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <Link
          to="/tools/pickup"
          className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-black px-8 py-4 rounded-xl text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/40"
        >
          <Truck className="w-5 h-5" />
          Book Free Pickup
        </Link>
        <Link
          to="/pro"
          className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-105"
        >
          Get GreenCert Pro
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.55 }}
      >
        {TRUST_BADGES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Icon className="w-3.5 h-3.5 text-green-500" />
            {label}
          </div>
        ))}
      </motion.div>

      {/* Stat counters */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-6 py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65 }}
      >
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
