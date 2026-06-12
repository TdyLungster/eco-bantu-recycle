import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Users, BarChart3, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';

const PERSONAS = [
  {
    icon: Shield,
    role: 'Compliance Officers',
    headline: 'Stay POPIA & NEMWA compliant',
    points: [
      'Legally-accepted destruction certificates',
      'Full audit trail for regulators',
      'Accepted by DEA, SARS, ESG auditors',
    ],
    cta: 'Get GreenCert Pro',
    href: '/pro',
  },
  {
    icon: Briefcase,
    role: 'IT Managers',
    headline: 'Secure device retirement, zero hassle',
    points: [
      'Free on-site collection, any volume',
      'Certified data destruction (DoD 5220.22-M)',
      'Same-week scheduling available',
    ],
    cta: 'Book Free Pickup',
    href: '/tools/pickup',
  },
  {
    icon: BarChart3,
    role: 'ESG & Sustainability Teams',
    headline: 'Investor-ready ESG reporting',
    points: [
      'CO₂ saved reports per batch',
      'Circular economy impact metrics',
      'White-label PDF for annual reports',
    ],
    cta: 'See Impact Dashboard',
    href: '/tools/impact',
  },
  {
    icon: Users,
    role: 'Procurement & Finance',
    headline: 'Cut compliance costs by 95%',
    points: [
      'No consultant fees — R7,497 once-off',
      'Volume discounts for enterprise',
      'Invoice + receipt for SARS records',
    ],
    cta: 'View Pricing',
    href: '/pro',
  },
];

export default function B2BTargeting() {
  return (
    <section className="bg-gray-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Built for business</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2 mb-3">
            Whatever your role — we've got you covered
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            From IT departments to executive boardrooms, our solutions speak your language and solve your specific compliance challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-gray-800/60 border border-gray-700 hover:border-green-500/40 rounded-2xl p-6 flex flex-col gap-4 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/15 rounded-xl flex items-center justify-center group-hover:bg-green-500/25 transition-colors">
                  <p.icon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">{p.role}</p>
                  <p className="text-white font-bold text-sm">{p.headline}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {p.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                to={p.href}
                className="mt-auto flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
              >
                {p.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
