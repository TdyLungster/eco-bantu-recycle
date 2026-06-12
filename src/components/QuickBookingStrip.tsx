import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import toast from 'react-hot-toast';

const CITIES = ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Other'];

export default function QuickBookingStrip() {
  const [form, setForm] = useState({ company: '', city: '', devices: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.city || !form.email) return;
    setLoading(true);
    try {
      await supabase.from('leads').insert({
        email: form.email,
        source: 'quick_booking',
        company_name: form.company,
        city: form.city,
        device_count: parseInt(form.devices) || 0,
      });
      setDone(true);
      toast.success('Booking received! We\'ll contact you within 2 hours.');
    } catch {
      toast.error('Something went wrong — please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-950 border-b border-gray-800 py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="flex items-center gap-2 justify-center mb-5">
          <Truck className="w-5 h-5 text-green-400" />
          <h2 className="text-white font-bold text-lg">Book Your Free Corporate Pickup</h2>
          <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full border border-green-500/30">FREE</span>
        </div>

        {done ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <CheckCircle className="w-10 h-10 text-green-400" />
            <p className="text-white font-bold text-lg">Booking received!</p>
            <p className="text-gray-400 text-sm">Our team will contact you within 2 business hours to confirm your pickup slot.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Company Name *"
              value={form.company}
              onChange={(e) => set('company', e.target.value)}
              required
              className="lg:col-span-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 text-sm"
            />
            <select
              value={form.city}
              onChange={(e) => set('city', e.target.value)}
              required
              className="lg:col-span-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-sm"
            >
              <option value="" disabled>Select City *</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              type="number"
              placeholder="No. of Devices (approx)"
              value={form.devices}
              onChange={(e) => set('devices', e.target.value)}
              min="1"
              className="lg:col-span-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 text-sm"
            />
            <input
              type="email"
              placeholder="Work Email *"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              required
              className="lg:col-span-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="lg:col-span-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-black py-3 px-6 rounded-xl text-sm transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Truck className="w-4 h-4" />}
              {loading ? 'Booking...' : 'Request Pickup'}
            </button>
          </form>
        )}

        <p className="text-center text-gray-600 text-xs mt-3">
          Free service · Same-week collection · You'll receive a POPIA-certified data destruction certificate
        </p>
      </motion.div>
    </section>
  );
}
