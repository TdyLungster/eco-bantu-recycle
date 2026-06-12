import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, TrendingUp, Award, Calendar, LogOut, ExternalLink,
  Truck, FileCheck, BookOpen, Leaf, Info, RefreshCw,
  Sparkles, Mail, Copy, ChevronDown, ChevronUp, BarChart3,
  FileText, Shield, Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import toast from 'react-hot-toast';

const ADMIN_EMAIL = 'dludlulungile08@gmail.com';

interface Lead {
  id?: string;
  email: string;
  company_name?: string | null;
  city?: string | null;
  device_count?: number | null;
  source?: string | null;
  created_at: string;
}

interface Stats {
  totalLeads: number;
  todayLeads: number;
  totalCerts: number;
}

type AuthStatus = 'loading' | 'ok' | 'denied';

interface AiInsights {
  insights: string;
  top_city: string;
  total_leads: number;
  total_devices: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
};

export default function Admin() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
  const [adminEmail, setAdminEmail] = useState('');
  const [stats, setStats] = useState<Stats>({ totalLeads: 0, todayLeads: 0, totalCerts: 0 });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState<AiInsights | null>(null);
  const [aiInsightsLoading, setAiInsightsLoading] = useState(false);
  const [draftingEmail, setDraftingEmail] = useState<string | null>(null); // lead email
  const [draftedEmail, setDraftedEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // Auth check
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        setAuthStatus('denied');
        return;
      }
      if (user.email !== ADMIN_EMAIL) {
        setAuthStatus('denied');
        return;
      }
      setAdminEmail(user.email ?? '');
      setAuthStatus('ok');
    });
  }, []);

  // Fetch data once auth is confirmed
  useEffect(() => {
    if (authStatus !== 'ok') return;
    fetchData();
  }, [authStatus]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      await Promise.all([fetchLeads(), fetchCerts()]);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      // Total count
      const { count: total } = await (supabase as any)
        .from('leads')
        .select('*', { count: 'exact', head: true });

      // Today's count
      const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const { count: todayCount } = await (supabase as any)
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', `${todayStr}T00:00:00`);

      // Recent rows
      const { data: rows, error } = await (supabase as any)
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      setLeads(rows ?? []);
      setStats(prev => ({
        ...prev,
        totalLeads: total ?? 0,
        todayLeads: todayCount ?? 0,
      }));
    } catch {
      // leads table may not be accessible — show empty state silently
    }
  };

  const fetchCerts = async () => {
    try {
      const { count } = await supabase
        .from('certificates' as any)
        .select('*', { count: 'exact', head: true });
      setStats(prev => ({ ...prev, totalCerts: count ?? 0 }));
    } catch {
      // certificates table may not exist yet — ignore gracefully
    }
  };

  const runAiInsights = async () => {
    if (!leads.length) { toast.error('No leads to analyse yet'); return; }
    setAiInsightsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-lead-insights', { body: { leads } });
      if (error) throw error;
      setAiInsights(data);
    } catch {
      toast.error('AI analysis failed — check ANTHROPIC_API_KEY in Supabase secrets');
    } finally {
      setAiInsightsLoading(false);
    }
  };

  const draftEmailForLead = async (lead: Lead) => {
    setDraftingEmail(lead.email);
    setDraftedEmail('');
    setEmailLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-email-drafter', {
        body: {
          lead_email: lead.email,
          company_name: lead.company_name,
          city: lead.city,
          device_count: lead.device_count,
          source: lead.source,
          tone: 'professional',
        },
      });
      if (error) throw error;
      setDraftedEmail(data?.email || '');
    } catch {
      toast.error('Email drafting failed');
    } finally {
      setEmailLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success('Copied to clipboard!'));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out');
    window.location.href = '/';
  };

  // ── Auth gates ────────────────────────────────────────────────────────────
  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-9 h-9 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (authStatus === 'denied') {
    return <Navigate to="/" replace />;
  }

  // ── Render ────────────────────────────────────────────────────────────────
  const statCards = [
    {
      label: 'Total Leads',
      value: stats.totalLeads,
      icon: <Users className="w-5 h-5" />,
      color: 'text-green-400',
    },
    {
      label: "Today's Leads",
      value: stats.todayLeads,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-emerald-400',
    },
    {
      label: 'Certificates Issued',
      value: stats.totalCerts,
      icon: <Award className="w-5 h-5" />,
      color: 'text-green-300',
    },
    {
      label: 'Active Since',
      value: '2024',
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-green-500',
    },
  ];

  const quickActions = [
    { label: 'Book Pickup', icon: <Truck className="w-4 h-4" />, to: '/tools/pickup' },
    { label: 'Generate Certificate', icon: <FileCheck className="w-4 h-4" />, to: '/tools/certificate' },
    { label: 'View Blog', icon: <BookOpen className="w-4 h-4" />, to: '/blog' },
    { label: 'GreenCert Pro', icon: <Leaf className="w-4 h-4" />, to: '/pro' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ── Top Bar ─────────────────────────────────────────────────────────── */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <h1 className="text-lg font-bold tracking-tight text-white">Admin Dashboard</h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-950 text-green-400 border border-green-800">
              {adminEmail}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-green-400 transition-colors"
            >
              View Live Site <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={fetchData}
              disabled={dataLoading}
              title="Refresh data"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Stats Row ───────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card, i) => (
              <motion.div
                key={card.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-3"
              >
                <div className={`${card.color} flex items-center gap-2`}>
                  {card.icon}
                  <span className="text-xs font-medium text-gray-400">{card.label}</span>
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {dataLoading && card.label !== 'Active Since' ? (
                    <span className="inline-block w-12 h-7 bg-gray-800 rounded animate-pulse" />
                  ) : (
                    card.value
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Recent Leads ────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Recent Leads <span className="normal-case text-gray-600">(last 20)</span>
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
          >
            {dataLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-7 h-7 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : leads.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-500">
                <Users className="w-8 h-8 opacity-40" />
                <p className="text-sm">No leads yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-left">
                      {['Email', 'Company', 'City', 'Devices', 'Source', 'Date', 'Actions'].map(col => (
                        <th
                          key={col}
                          className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => (
                      <React.Fragment key={lead.id ?? i}>
                      <motion.tr
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="border-b border-gray-800/60 last:border-0 hover:bg-gray-800/40 transition-colors"
                      >
                        <td className="px-4 py-3 text-green-400 font-medium truncate max-w-[200px]">
                          {lead.email}
                        </td>
                        <td className="px-4 py-3 text-gray-300">{lead.company_name ?? '—'}</td>
                        <td className="px-4 py-3 text-gray-300">{lead.city ?? '—'}</td>
                        <td className="px-4 py-3 text-gray-300">{lead.device_count ?? '—'}</td>
                        <td className="px-4 py-3">
                          {lead.source ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-800 text-gray-400 border border-gray-700">
                              {lead.source}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {lead.created_at
                            ? new Date(lead.created_at).toLocaleDateString('en-ZA', {
                                day: '2-digit', month: 'short', year: 'numeric',
                              })
                            : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => draftEmailForLead(lead)}
                            className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 bg-green-500/10 hover:bg-green-500/20 px-2 py-1 rounded-lg transition-colors"
                          >
                            <Mail className="w-3 h-3" /> Draft
                          </button>
                        </td>
                      </motion.tr>
                      {/* Email draft panel */}
                      <AnimatePresence>
                        {draftingEmail === lead.email && (
                          <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td colSpan={7} className="px-4 py-4 bg-gray-800/50 border-b border-gray-700">
                              {emailLoading ? (
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                  <Sparkles className="w-4 h-4 animate-pulse text-green-400" />
                                  Claude is drafting your email...
                                </div>
                              ) : draftedEmail ? (
                                <div className="space-y-2">
                                  <pre className="text-xs text-gray-300 whitespace-pre-wrap font-sans bg-gray-900 border border-gray-700 rounded-lg p-3 max-h-48 overflow-y-auto">
                                    {draftedEmail}
                                  </pre>
                                  <div className="flex gap-2">
                                    <button onClick={() => copyToClipboard(draftedEmail)}
                                      className="flex items-center gap-1 text-xs bg-green-500 hover:bg-green-400 text-gray-900 font-bold px-3 py-1.5 rounded-lg">
                                      <Copy className="w-3 h-3" /> Copy Email
                                    </button>
                                    <button onClick={() => setDraftingEmail(null)}
                                      className="text-xs text-gray-500 hover:text-gray-300 px-3 py-1.5 rounded-lg">
                                      Close
                                    </button>
                                  </div>
                                </div>
                              ) : null}
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </section>

        {/* ── AI Tools Row ─────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-green-400" /> AI Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'AI Lead Insights', icon: BarChart3, desc: 'Analyse your leads with Claude', action: true },
              { label: 'ESG Report', icon: FileText, to: '/tools/esg-report', desc: 'Generate investor reports' },
              { label: 'Compliance Check', icon: Shield, to: '/tools/compliance-check', desc: 'POPIA/NEMWA gap audit' },
              { label: 'AI Assistant', icon: Zap, to: '/', desc: 'Claude chat on live site' },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {item.action ? (
                  <button
                    onClick={runAiInsights}
                    disabled={aiInsightsLoading}
                    className="w-full text-left bg-gray-900 border border-gray-800 hover:border-green-500/50 rounded-xl p-4 transition-colors group"
                  >
                    <item.icon className="w-5 h-5 text-green-400 mb-2" />
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{aiInsightsLoading ? 'Analysing...' : item.desc}</p>
                  </button>
                ) : (
                  <Link
                    to={item.to!}
                    className="block bg-gray-900 border border-gray-800 hover:border-green-500/50 rounded-xl p-4 transition-colors group"
                  >
                    <item.icon className="w-5 h-5 text-green-400 mb-2" />
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* AI Insights result */}
          <AnimatePresence>
            {aiInsights && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 bg-gray-900 border border-green-500/30 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-bold text-white">AI Lead Analysis</span>
                    <span className="text-xs text-gray-500">· {aiInsights.total_leads} leads · {aiInsights.total_devices} devices · Top city: {aiInsights.top_city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => copyToClipboard(aiInsights.insights)}
                      className="text-xs text-gray-500 hover:text-green-400 flex items-center gap-1">
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                    <button onClick={() => setAiInsights(null)} className="text-gray-600 hover:text-gray-300 text-xs">✕</button>
                  </div>
                </div>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                  {aiInsights.insights}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── Bottom Grid: Quick Actions + Revenue Note ────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Quick Actions */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Quick Actions</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 grid grid-cols-2 gap-3"
            >
              {quickActions.map((action, i) => (
                <motion.div
                  key={action.label}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Link
                    to={action.to}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-gray-800 hover:bg-green-900/40 border border-gray-700 hover:border-green-700 text-gray-300 hover:text-green-300 text-sm font-medium transition-all duration-200"
                  >
                    <span className="text-green-500">{action.icon}</span>
                    {action.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Revenue Note */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Revenue</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-900 border border-green-900/50 rounded-xl p-5 h-full flex flex-col gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-lg bg-green-950/60 border border-green-900">
                  <Info className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">PayFast Payments</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    PayFast payments are tracked at{' '}
                    <a
                      href="https://www.payfast.co.za"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 underline underline-offset-2"
                    >
                      payfast.co.za merchant portal
                    </a>
                    . Webhook confirmations are handled by the{' '}
                    <code className="px-1.5 py-0.5 rounded bg-gray-800 text-green-300 text-xs font-mono">
                      handle-payfast-webhook
                    </code>{' '}
                    edge function.
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-3 border-t border-gray-800">
                <p className="text-xs text-gray-600">
                  Merchant ID: <span className="text-gray-500 font-mono">25955793</span>
                </p>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </div>
  );
}
