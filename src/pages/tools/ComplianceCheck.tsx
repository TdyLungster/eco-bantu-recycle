
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Loader2, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DarkNavigation from '@/components/DarkNavigation';
import { supabase } from '@/integrations/supabase/client';

type RiskLevel = 'high' | 'medium' | 'low';

interface AssessmentResult {
  assessment: string;
  risk_level: RiskLevel;
  generated_at: string;
}

const DEVICE_OPTIONS = ['Laptops', 'Phones', 'Servers', 'Printers', 'Mixed'];

const EMPLOYEE_OPTIONS = [
  { value: '1-10', label: '1–10 employees' },
  { value: '11-50', label: '11–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '200+', label: '200+ employees' },
];

const riskConfig: Record<RiskLevel, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  high: {
    label: 'HIGH RISK',
    bg: 'bg-red-900/40 border-red-700',
    text: 'text-red-400',
    icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
  },
  medium: {
    label: 'MEDIUM RISK',
    bg: 'bg-yellow-900/30 border-yellow-700',
    text: 'text-yellow-400',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
  },
  low: {
    label: 'LOW RISK',
    bg: 'bg-green-900/30 border-green-700',
    text: 'text-green-400',
    icon: <CheckCircle className="w-5 h-5 text-green-400" />,
  },
};

const ComplianceCheck: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [currentPractices, setCurrentPractices] = useState('');
  const [deviceTypes, setDeviceTypes] = useState<string[]>([]);
  const [employeeCount, setEmployeeCount] = useState('');
  const [hasItDept, setHasItDept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const toggleDevice = (device: string) => {
    setDeviceTypes((prev) =>
      prev.includes(device) ? prev.filter((d) => d !== device) : [...prev, device]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim() || !currentPractices.trim() || !employeeCount) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-compliance-check', {
        body: {
          company_name: companyName.trim(),
          current_practices: currentPractices.trim(),
          device_types: deviceTypes,
          employee_count: employeeCount,
          has_it_department: hasItDept,
        },
      });

      if (error) throw error;

      setResult(data as AssessmentResult);
    } catch (err: unknown) {
      console.error('Compliance check error:', err);
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCompanyName('');
    setCurrentPractices('');
    setDeviceTypes([]);
    setEmployeeCount('');
    setHasItDept(false);
  };

  const risk = result ? riskConfig[result.risk_level] : null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DarkNavigation />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Powered by Claude</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Free Compliance Audit
          </h1>
          <p className="text-gray-400 text-lg">
            AI-powered POPIA &amp; NEMWA gap analysis in 60 seconds
          </p>
        </motion.div>
      </section>

      <main className="max-w-2xl mx-auto px-4 pb-20">
        {!result ? (
          /* Form Card */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="company-name">
                  Company Name <span className="text-green-400">*</span>
                </label>
                <input
                  id="company-name"
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme (Pty) Ltd"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>

              {/* Current practices */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="current-practices">
                  Current e-waste practices <span className="text-green-400">*</span>
                </label>
                <textarea
                  id="current-practices"
                  required
                  rows={4}
                  value={currentPractices}
                  onChange={(e) => setCurrentPractices(e.target.value)}
                  placeholder="We currently store old laptops in a storage room and occasionally throw them in general waste..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors resize-none"
                />
              </div>

              {/* Device types */}
              <div>
                <p className="text-sm font-medium text-gray-300 mb-3">Device types handled</p>
                <div className="flex flex-wrap gap-2">
                  {DEVICE_OPTIONS.map((device) => {
                    const selected = deviceTypes.includes(device);
                    return (
                      <button
                        key={device}
                        type="button"
                        onClick={() => toggleDevice(device)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                          selected
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        {device}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Employee count */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="employee-count">
                  Employee count <span className="text-green-400">*</span>
                </label>
                <div className="relative">
                  <select
                    id="employee-count"
                    required
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    className="w-full appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-green-500 transition-colors pr-10"
                  >
                    <option value="" disabled>Select range…</option>
                    {EMPLOYEE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* IT department checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setHasItDept(!hasItDept)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    hasItDept ? 'bg-green-500 border-green-500' : 'border-gray-600 bg-gray-800 group-hover:border-gray-400'
                  }`}
                >
                  {hasItDept && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={hasItDept}
                  onChange={(e) => setHasItDept(e.target.checked)}
                />
                <span className="text-sm text-gray-300">We have an IT department</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:bg-green-800 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analysing compliance…
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Run Compliance Audit
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          /* Result Card */
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-5"
          >
            {/* Risk badge */}
            <div className={`flex items-center gap-3 border rounded-xl px-5 py-3 ${risk!.bg}`}>
              {risk!.icon}
              <span className={`font-bold text-lg tracking-wide ${risk!.text}`}>
                {risk!.label}
              </span>
            </div>

            {/* Assessment text */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">
                Assessment Report
              </p>
              <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-sans">
                {result.assessment}
              </pre>
              {result.generated_at && (
                <p className="mt-4 text-xs text-gray-600">
                  Generated at {new Date(result.generated_at).toLocaleTimeString('en-ZA')}
                </p>
              )}
            </div>

            {/* CTA */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">
                Get Full POPIA + NEMWA Compliance Package
              </h3>
              <p className="text-gray-400 text-sm mb-5">
                Court-ready certificates, lifetime compliance management, and a dedicated account manager.
              </p>
              <Link
                to="/pro"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                View GreenCert Pro
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Reset */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-300 underline underline-offset-2 transition-colors"
              >
                Run New Audit
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ComplianceCheck;
