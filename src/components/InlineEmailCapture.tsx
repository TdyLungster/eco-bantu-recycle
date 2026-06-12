import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import toast from 'react-hot-toast';

export default function InlineEmailCapture() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await supabase.from('leads').insert({ email, source: 'inline_cta' });
      setDone(true);
    } catch {
      toast.error('Something went wrong — please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-950 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        {/* Email capture */}
        <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-8 text-center mb-6">
          <Mail className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <h3 className="text-2xl font-black text-white mb-2">
            Monthly recycling &amp; compliance tips
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Join 2,000+ South African businesses. No spam. Unsubscribe anytime.
          </p>

          {done ? (
            <p className="text-green-400 font-semibold">You're in! Check your inbox for a welcome email.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-400 text-gray-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {loading ? 'Subscribing...' : 'Subscribe Free'}
              </button>
            </form>
          )}
          <p className="text-gray-600 text-xs mt-3">bantupeople@gmail.com · No spam, ever.</p>
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/27100654785?text=Hi%20Bantu%20The%20People%2C%20I%20want%20to%20book%20a%20free%20e-waste%20pickup"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl text-sm transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          Prefer WhatsApp? Message us now for a free pickup →
        </a>
      </motion.div>
    </section>
  );
}
