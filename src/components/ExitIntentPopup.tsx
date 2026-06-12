import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import toast from 'react-hot-toast';

const SESSION_KEY = 'exit_popup_shown';

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        sessionStorage.setItem(SESSION_KEY, '1');
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await supabase.from('leads').insert({ email, source: 'exit_intent' });
      setDone(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-7 h-7 text-green-400" />
            </div>

            {done ? (
              <>
                <h3 className="text-2xl font-black text-white mb-2">Check your inbox!</h3>
                <p className="text-gray-400 text-sm">Your free compliance checklist is on its way to <strong className="text-white">{email}</strong>.</p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 text-green-400 text-sm hover:underline"
                >
                  Continue to site →
                </button>
              </>
            ) : (
              <>
                <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Free Download</p>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                  Get Your Free E-Waste<br />Compliance Checklist
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  47 South African companies use this checklist to stay POPIA &amp; NEMWA compliant. Download free — no catch.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-400 text-gray-900 font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Send Me The Checklist'}
                  </button>
                </form>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 text-gray-600 hover:text-gray-400 text-xs transition-colors"
                >
                  No thanks, I'll figure out compliance on my own
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
