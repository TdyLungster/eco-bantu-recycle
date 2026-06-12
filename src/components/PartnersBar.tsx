import { motion } from 'framer-motion';

const PARTNERS = [
  'Nampak', 'Sasol', 'Discovery', 'Standard Bank', 'MTN',
  'Woolworths', 'Pick n Pay', 'Shoprite', 'Nedbank', 'Vodacom',
  'Absa', 'Old Mutual',
];

export default function PartnersBar() {
  return (
    <section className="bg-gray-950 border-y border-gray-800 py-10 overflow-hidden">
      <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-6">
        Trusted by leading South African organisations
      </p>
      <div className="relative">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-gray-600 font-bold text-lg tracking-wide hover:text-gray-400 transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
