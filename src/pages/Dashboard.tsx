import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  FileText, Cpu, Leaf, Clock, LogOut, Plus, ArrowRight, Shield
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import toast from 'react-hot-toast';

interface Certificate {
  id: string;
  company_name: string;
  created_at: string;
  device_count: number;
  cert_id: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [stats, setStats] = useState({ certs: 0, devices: 0, co2: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate('/');
        return;
      }
      setUser(data.user);
      loadData(data.user.id);
    });
  }, [navigate]);

  const loadData = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        setCerts(data);
        const totalDevices = data.reduce((sum: number, c: Certificate) => sum + (c.device_count || 0), 0);
        setStats({
          certs: data.length,
          devices: totalDevices,
          co2: Math.round(totalDevices * 0.7),
        });
      }
    } catch {
      // Table may not exist yet — show empty state gracefully
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out');
    navigate('/');
  };

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? '??';

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? 'there';
  const plan = user?.user_metadata?.plan ?? 'free';
  const isPro = plan === 'pro' || plan === 'business';

  const STAT_CARDS = [
    { icon: FileText, label: 'Certificates Generated', value: stats.certs },
    { icon: Cpu, label: 'Devices Processed', value: stats.devices },
    { icon: Leaf, label: 'CO₂ Saved (kg)', value: stats.co2 },
    { icon: Clock, label: 'Last Activity', value: certs[0] ? new Date(certs[0].created_at).toLocaleDateString('en-ZA') : '—' },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard — Bantu The People</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-gray-950 text-white">
        <DarkNavigation />

        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-gray-900 text-lg">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl font-black">Welcome back, {displayName.split(' ')[0]}!</h1>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </motion.div>

          {/* Upgrade banner for free users */}
          {!isPro && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-green-900/30 border border-green-500/40 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-sm text-green-100">
                  Upgrade to <strong>GreenCert Pro</strong> to unlock unlimited certificates, bulk upload, and audit-ready ESG reports.
                </p>
              </div>
              <Link
                to="/pro"
                className="flex items-center gap-1 text-sm font-bold text-green-400 hover:text-green-300 whitespace-nowrap transition-colors"
              >
                Upgrade now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {STAT_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
              >
                <card.icon className="w-5 h-5 text-green-400 mb-3" />
                <p className="text-2xl font-black text-white">{loading ? '—' : card.value}</p>
                <p className="text-gray-500 text-xs mt-1">{card.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Certificates table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-6"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-bold text-sm uppercase tracking-widest text-gray-400">Recent Certificates</h2>
              <Link
                to="/tools/certificate"
                className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Generate New
              </Link>
            </div>

            {loading ? (
              <div className="p-6 space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-10 bg-gray-800 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : certs.length === 0 ? (
              <div className="py-14 text-center">
                <FileText className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-400 font-semibold mb-1">No certificates yet</p>
                <p className="text-gray-600 text-sm mb-5">Generate your first POPIA-certified certificate in under 60 seconds.</p>
                <Link
                  to="/tools/certificate"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  Generate First Certificate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800">
                      <th className="text-left px-6 py-3">Cert ID</th>
                      <th className="text-left px-6 py-3">Company</th>
                      <th className="text-left px-6 py-3">Date</th>
                      <th className="text-left px-6 py-3">Devices</th>
                      <th className="text-left px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certs.map((cert) => (
                      <tr key={cert.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-green-400 text-xs">{cert.cert_id}</td>
                        <td className="px-6 py-4 text-white">{cert.company_name}</td>
                        <td className="px-6 py-4 text-gray-400">{new Date(cert.created_at).toLocaleDateString('en-ZA')}</td>
                        <td className="px-6 py-4 text-gray-400">{cert.device_count ?? '—'}</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-900/50 text-green-400 text-xs font-bold px-2 py-1 rounded-full">Valid</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </main>

        <DarkFooter />
      </div>
    </>
  );
}
