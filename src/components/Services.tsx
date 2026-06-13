import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Monitor, Settings, User, CheckCircle, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Monitor,
    title: 'Corporate E-Waste Collection',
    description: 'Scheduled pickups for businesses of all sizes. Laptops, servers, phones — we handle everything with certified data destruction.',
    features: ['Scheduled Pickups', 'Data Destruction Certificates', 'ESG Impact Reports', 'Bulk Processing'],
    href: '/tools/pickup',
    cta: 'Book Free Pickup',
  },
  {
    icon: User,
    title: 'Individual Donations',
    description: 'Drop off your personal electronics for responsible recycling. Every device makes a real difference.',
    features: ['Free Drop-off Service', 'Same-day Processing', 'Impact Tracking', 'Donation Receipts'],
    href: '/tools/pickup',
    cta: 'Schedule Drop-off',
  },
  {
    icon: Settings,
    title: 'Component Recovery',
    description: 'Advanced material recovery from circuit boards, processors, and precious metals with 85% efficiency.',
    features: ['Precious Metal Recovery', 'Component Refurbishment', 'Material Sorting', 'Quality Assurance'],
    href: '/tools/value',
    cta: 'Check Device Value',
  },
];

const PROCESS = [
  { step: '01', title: 'Book Pickup', desc: 'Fill in our 30-second form — we confirm within 2 hours' },
  { step: '02', title: 'We Collect', desc: 'Same-week collection from your office, anywhere in SA' },
  { step: '03', title: 'Data Destroyed', desc: 'DoD 5220.22-M certified destruction of all stored data' },
  { step: '04', title: 'Get Certificate', desc: 'POPIA + NEMWA compliance certificate delivered instantly' },
];

const EWASTE_TYPES = [
  { name: 'Laptops & Computers', image: '/lovable-uploads/b2fa359e-5a43-420a-856b-ee184a63e6b8.png' },
  { name: 'Electronic Components', image: '/lovable-uploads/e87e99d6-08d5-4f73-8f9b-6c7f0921e5ad.png' },
  { name: 'Mixed Electronics', image: '/lovable-uploads/116647c6-0b22-4ba1-9ef3-49ea15b9193a.png' },
];

const Services = () => {
  return (
    <section id="services" className="bg-gray-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest">What we do</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2 mb-3">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Professional e-waste recycling built for South African compliance requirements.
            Every service delivers the certificates your auditors actually accept.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-gray-900 border border-gray-800 hover:border-green-500/40 rounded-2xl p-6 flex flex-col gap-4 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-500/15 rounded-xl flex items-center justify-center group-hover:bg-green-500/25 transition-colors">
                <s.icon className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
              </div>
              <ul className="space-y-1.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to={s.href}
                className="mt-auto flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
              >
                {s.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Process steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-white font-black text-xl text-center mb-8">How It Works — 4 Simple Steps</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="text-center">
                <div className="w-12 h-12 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-400 font-black text-sm">{p.step}</span>
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{p.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-green-500/20" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* E-Waste types image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EWASTE_TYPES.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative group rounded-2xl overflow-hidden aspect-video"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-sm">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
