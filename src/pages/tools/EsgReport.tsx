import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Copy, RefreshCw, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DarkNavigation from '@/components/DarkNavigation';
import { supabase } from '@/integrations/supabase/client';

const DEVICE_TYPE_OPTIONS = [
  'Laptops',
  'Desktops',
  'Phones',
  'Servers',
  'Tablets',
  'Mixed Electronics',
];

const CITY_OPTIONS = [
  'Johannesburg',
  'Cape Town',
  'Durban',
  'Pretoria',
  'Other',
];

interface FormState {
  company_name: string;
  period: string;
  devices_recycled: string;
  device_types: string[];
  city: string;
  include_co2: boolean;
}

const defaultForm: FormState = {
  company_name: '',
  period: '',
  devices_recycled: '',
  device_types: [],
  city: 'Johannesburg',
  include_co2: true,
};

const EsgReport: React.FC = () => {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  const handleDeviceTypeToggle = (type: string) => {
    setForm((prev) => ({
      ...prev,
      device_types: prev.device_types.includes(type)
        ? prev.device_types.filter((t) => t !== type)
        : [...prev.device_types, type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.company_name.trim()) {
      toast.error('Please enter your company name.');
      return;
    }
    if (!form.period.trim()) {
      toast.error('Please enter a reporting period.');
      return;
    }
    const devicesNum = parseInt(form.devices_recycled, 10);
    if (isNaN(devicesNum) || devicesNum < 1) {
      toast.error('Please enter the number of devices recycled.');
      return;
    }
    if (form.device_types.length === 0) {
      toast.error('Please select at least one device type.');
      return;
    }

    setLoading(true);
    setReport(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-esg-report', {
        body: {
          company_name: form.company_name.trim(),
          period: form.period.trim(),
          devices_recycled: devicesNum,
          device_types: form.device_types,
          city: form.city,
          include_co2: form.include_co2,
        },
      });

      if (error) throw error;

      setReport(data.report);
      setGeneratedAt(data.generated_at);
      toast.success('ESG report generated successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate report. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!report) return;
    try {
      await navigator.clipboard.writeText(report);
      toast.success('Report copied to clipboard!');
    } catch {
      toast.error('Failed to copy. Please select and copy the text manually.');
    }
  };

  const handleReset = () => {
    setReport(null);
    setGeneratedAt(null);
    setForm(defaultForm);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DarkNavigation />

      <main className="pt-24 pb-20 px-4">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
            <span className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Claude
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI ESG Report Generator
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Generate investor-ready ESG impact reports in seconds. Fully NEMWA-compliant language,
            ready to paste into your annual report.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Form */}
          {!report && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6"
              >
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="company_name">
                    Company Name <span className="text-green-400">*</span>
                  </label>
                  <input
                    id="company_name"
                    type="text"
                    required
                    value={form.company_name}
                    onChange={(e) => setForm((p) => ({ ...p, company_name: e.target.value }))}
                    placeholder="e.g. Acme Corporation (Pty) Ltd"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>

                {/* Reporting Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="period">
                    Reporting Period <span className="text-green-400">*</span>
                  </label>
                  <input
                    id="period"
                    type="text"
                    required
                    value={form.period}
                    onChange={(e) => setForm((p) => ({ ...p, period: e.target.value }))}
                    placeholder="Q1 2025 or Annual 2025"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>

                {/* Devices Recycled */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="devices_recycled">
                    Devices Recycled <span className="text-green-400">*</span>
                  </label>
                  <input
                    id="devices_recycled"
                    type="number"
                    min={1}
                    required
                    value={form.devices_recycled}
                    onChange={(e) => setForm((p) => ({ ...p, devices_recycled: e.target.value }))}
                    placeholder="e.g. 150"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>

                {/* Device Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Device Types <span className="text-green-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {DEVICE_TYPE_OPTIONS.map((type) => {
                      const checked = form.device_types.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleDeviceTypeToggle(type)}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                            checked
                              ? 'bg-green-500/15 border-green-500 text-green-400'
                              : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                              checked ? 'bg-green-500 border-green-500' : 'border-gray-600'
                            }`}
                          >
                            {checked && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                                <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="city">
                    City / Location
                  </label>
                  <select
                    id="city"
                    value={form.city}
                    onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none cursor-pointer"
                  >
                    {CITY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Include CO2 Toggle */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={form.include_co2}
                        onChange={(e) => setForm((p) => ({ ...p, include_co2: e.target.checked }))}
                      />
                      <div
                        className={`w-11 h-6 rounded-full transition-colors ${
                          form.include_co2 ? 'bg-green-500' : 'bg-gray-700'
                        }`}
                      />
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          form.include_co2 ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      Include CO₂ calculations
                    </span>
                  </label>
                  <p className="mt-1.5 ml-14 text-xs text-gray-500">
                    Estimates CO₂ savings at 25 kg per device — suitable for Scope 3 emissions reporting.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:bg-green-500/50 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-xl transition-colors text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating ESG Report…
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate ESG Report
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* Result */}
          {report && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Report card */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                  <div className="flex items-center gap-2 text-green-400">
                    <FileText className="w-5 h-5" />
                    <span className="font-semibold text-sm">ESG Impact Report</span>
                  </div>
                  {generatedAt && (
                    <span className="text-xs text-gray-500">
                      Generated {new Date(generatedAt).toLocaleString('en-ZA', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-gray-200 leading-relaxed">
                    {report}
                  </pre>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-medium py-3 rounded-xl transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy to Clipboard
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-medium py-3 rounded-xl transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate New Report
                </button>
              </div>

              {/* Pro upsell */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-green-500/10 to-green-400/5 border border-green-500/30 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <p className="text-white font-semibold mb-1">Want branded PDF versions?</p>
                  <p className="text-gray-400 text-sm">
                    GreenCert Pro includes unlimited AI reports, branded PDFs, and lifetime compliance management.
                  </p>
                </div>
                <Link
                  to="/pro"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap text-sm"
                >
                  Upgrade to GreenCert Pro
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EsgReport;
