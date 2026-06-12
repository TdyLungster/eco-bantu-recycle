import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Nomvula Dlamini',
    company: 'Dlamini & Associates (Pty) Ltd',
    text: 'Bantu The People handled our entire office IT refresh — 200+ laptops disposed of correctly. The POPIA certificates were ready in under an hour.',
    stars: 5,
  },
  {
    name: 'Grant Swanepoel',
    company: 'Swanepoel Construction',
    text: 'We were worried about data security on our old servers. Their data destruction process gave us legal proof of compliance. Highly professional.',
    stars: 5,
  },
  {
    name: 'Priya Naidoo',
    company: 'Naidoo Logistics Solutions',
    text: 'Free pickup, same-week collection, and a full ESG report for our sustainability audit. GreenCert Pro is worth every cent.',
    stars: 5,
  },
  {
    name: 'Themba Khumalo',
    company: 'Khumalo Property Group',
    text: 'After our SARS audit, we needed proper e-waste documentation fast. Bantu sorted it out with GreenCert Pro in one afternoon.',
    stars: 5,
  },
  {
    name: 'Anri van der Berg',
    company: 'VDB Financial Services',
    text: 'Clean process from start to finish. The certificate PDF is professional enough to include in investor reports. Our auditors were impressed.',
    stars: 5,
  },
  {
    name: 'Siphamandla Zulu',
    company: 'Zulu Tech Distributors',
    text: 'We process e-waste for 15 clients a month. GreenCert Pro Business plan paid for itself in the first week by replacing manual spreadsheet work.',
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="bg-gray-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-white font-bold text-xl">4.9/5</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">from 127 verified client reviews</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Trusted by South African <span className="text-green-400">businesses</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col gap-3"
            >
              <Stars count={review.stars} />
              <p className="text-gray-300 text-sm leading-relaxed">"{review.text}"</p>
              <div className="mt-auto pt-3 border-t border-gray-700">
                <p className="text-white font-semibold text-sm">{review.name}</p>
                <p className="text-gray-500 text-xs">{review.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
