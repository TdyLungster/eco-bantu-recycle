import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Download, ArrowLeft, Shield, Lock, Award, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  deviceTypes: string;
  deviceCount: string;
  serialNumbers: string;
  destructionMethod: string;
  certificationLevel: string;
  additionalNotes: string;
  agreeToTerms: boolean;
}

const destructionMethods = [
  { value: 'dod-3-pass', label: 'DoD 3-Pass (Standard)', description: 'Department of Defense 3-pass overwrite' },
  { value: 'dod-7-pass', label: 'DoD 7-Pass (Enhanced)', description: 'Department of Defense enhanced 7-pass overwrite' },
  { value: 'physical-destruction', label: 'Physical Destruction', description: 'Complete physical destruction of storage media' },
  { value: 'degaussing', label: 'Degaussing', description: 'Magnetic field erasure for magnetic storage' },
];

const certificationLevels = [
  { value: 'standard', label: 'Standard Certificate', price: 'Free' },
  { value: 'premium', label: 'Premium Certificate (GreenCert Pro)', price: 'R99' },
  { value: 'enterprise', label: 'Enterprise Certificate (GreenCert Pro)', price: 'R299' },
];

function generateCertId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BTP-${ts}-${rand}`;
}

function CertificatePreview({ formData, certId, certDate }: {
  formData: FormData;
  certId: string;
  certDate: string;
}) {
  const method = destructionMethods.find(m => m.value === formData.destructionMethod);

  return (
    <div
      id="certificate-preview"
      className="bg-white rounded-lg p-8 text-black text-sm print:shadow-none"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      <div className="border-4 border-green-600 rounded-lg p-6">
        {/* Header */}
        <div className="text-center mb-6 border-b-2 border-green-200 pb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-700 uppercase tracking-wide">
                Bantu The People
              </h2>
              <p className="text-xs text-gray-500">Eco Recycle Solutions · bantuthepeople.co.za</p>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-widest mt-3">
            Data Destruction Certificate
          </h3>
          <p className="text-gray-500 text-xs mt-1">
            POPIA Section 21 Compliant · NEMWA Act 59 of 2008
          </p>
        </div>

        {/* Certificate ID & Date */}
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span><strong>Certificate ID:</strong> {certId}</span>
          <span><strong>Issue Date:</strong> {certDate}</span>
        </div>

        {/* Body */}
        <p className="text-gray-700 mb-4 leading-relaxed">
          This certificate confirms that <strong>{formData.companyName}</strong>, represented by{' '}
          <strong>{formData.contactPerson}</strong>, has engaged Bantu The People for the secure
          destruction of electronic data storage devices in accordance with the Protection of
          Personal Information Act (POPIA) and the National Environmental Management: Waste Act.
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded p-4 mb-4 text-xs">
          <div><strong className="text-gray-600">Company:</strong><br />{formData.companyName}</div>
          <div><strong className="text-gray-600">Contact Person:</strong><br />{formData.contactPerson}</div>
          <div><strong className="text-gray-600">Email:</strong><br />{formData.email}</div>
          <div><strong className="text-gray-600">Device Count:</strong><br />{formData.deviceCount || 'Not specified'}</div>
          <div><strong className="text-gray-600">Device Types:</strong><br />{formData.deviceTypes}</div>
          <div><strong className="text-gray-600">Destruction Method:</strong><br />{method?.label}</div>
          {formData.serialNumbers && (
            <div className="col-span-2">
              <strong className="text-gray-600">Serial Numbers:</strong><br />
              <span className="whitespace-pre-wrap break-all">{formData.serialNumbers}</span>
            </div>
          )}
          {formData.additionalNotes && (
            <div className="col-span-2">
              <strong className="text-gray-600">Notes:</strong><br />
              {formData.additionalNotes}
            </div>
          )}
        </div>

        {/* Certification */}
        <div className="border border-green-200 rounded p-3 bg-green-50 mb-4 text-xs text-gray-600">
          <strong>Method description:</strong> {method?.description}. This process meets the
          requirements of SANS 1369, DoD 5220.22-M, and ISO/IEC 27001 data destruction standards.
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p>Authorised by: Bantu The People</p>
            <p>Registration No: 2023/XXXXX/07</p>
            <p>Tel: 010 065 4785 · rich@bantuthepeople.com</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-0.5 bg-gray-400 mb-1" />
            <p className="text-xs text-gray-500">Authorised Signature</p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 border-2 border-green-600 rounded-full flex items-center justify-center">
              <div className="text-center">
                <Award className="w-6 h-6 text-green-600 mx-auto" />
                <p className="text-[8px] text-green-700 font-bold">VERIFIED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Certificate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [certId, setCertId] = useState('');
  const [certDate, setCertDate] = useState('');
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    deviceTypes: '',
    deviceCount: '',
    serialNumbers: '',
    destructionMethod: 'dod-3-pass',
    certificationLevel: 'standard',
    additionalNotes: '',
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    if (formData.certificationLevel !== 'standard') {
      toast('Premium and Enterprise certificates require GreenCert Pro.', { icon: 'ℹ️' });
      window.open('/pro', '_blank');
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCertId(generateCertId());
      setCertDate(new Date().toLocaleDateString('en-ZA', {
        day: 'numeric', month: 'long', year: 'numeric'
      }));
      setIsGenerated(true);
      toast.success('Certificate generated successfully!');

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'certificate_generated', {
          event_category: 'engagement',
          event_label: formData.certificationLevel,
        });
      }
    } catch {
      toast.error('Failed to generate certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const printCertificate = () => {
    const el = document.getElementById('certificate-preview');
    if (!el) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head>
        <title>Data Destruction Certificate — ${certId}</title>
        <style>
          body { margin: 40px; font-family: Georgia, serif; }
          @media print { body { margin: 0; } }
        </style>
      </head><body>${el.outerHTML}</body></html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 300);
    toast.success('Print dialog opened');
  };

  if (isGenerated) {
    return (
      <div className="min-h-screen bg-gray-900">
        <DarkNavigation />
        <main className="pt-32 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-center mb-6">
                <Award className="w-14 h-14 text-green-400 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-white">Certificate Ready!</h2>
                <p className="text-gray-400 mt-1">
                  Print or save as PDF using your browser's print dialog.
                </p>
              </div>

              <CertificatePreview
                formData={formData}
                certId={certId}
                certDate={certDate}
              />

              <div className="space-y-3 mt-6">
                <Button
                  onClick={printCertificate}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print / Save as PDF
                </Button>
                <Button
                  onClick={() => setIsGenerated(false)}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Generate Another Certificate
                </Button>
                <Button asChild variant="ghost" className="w-full text-gray-400 hover:text-white">
                  <Link to="/pro">
                    ⬆️ Upgrade to GreenCert Pro — Unlimited + ESG Reports
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
        <DarkFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <DarkNavigation />

      <main className="pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <FileCheck className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Data Destruction <span className="text-green-400">Certificate</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Generate a POPIA-compliant data destruction certificate — free for standard use.
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, color: 'green', title: 'POPIA Compliant', sub: 'Section 21 compliant' },
                { icon: Lock, color: 'blue', title: 'Secure', sub: 'Industry-standard methods' },
                { icon: Award, color: 'purple', title: 'Certified', sub: 'Legally recognised' },
              ].map(({ icon: Icon, color, title, sub }) => (
                <Card key={title} className={`bg-${color}-900/20 border-${color}-600/30 text-center`}>
                  <CardContent className="p-4">
                    <Icon className={`w-8 h-8 text-${color}-400 mx-auto mb-2`} />
                    <h3 className="text-white font-medium mb-1 text-sm">{title}</h3>
                    <p className="text-gray-300 text-xs">{sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Certificate Request Form</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete all required fields to generate your certificate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-white">Company Name *</Label>
                      <Input
                        id="companyName" name="companyName" type="text" required
                        value={formData.companyName} onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson" className="text-white">Contact Person *</Label>
                      <Input
                        id="contactPerson" name="contactPerson" type="text" required
                        value={formData.contactPerson} onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email Address *</Label>
                      <Input
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="contact@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deviceCount" className="text-white">Number of Devices *</Label>
                      <Input
                        id="deviceCount" name="deviceCount" type="number" required min="1"
                        value={formData.deviceCount} onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="e.g. 5"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deviceTypes" className="text-white">Device Types *</Label>
                    <Input
                      id="deviceTypes" name="deviceTypes" type="text" required
                      value={formData.deviceTypes} onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="e.g. Laptops, Hard Drives, Servers, Smartphones"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serialNumbers" className="text-white">Serial Numbers (Optional)</Label>
                    <Textarea
                      id="serialNumbers" name="serialNumbers" rows={3}
                      value={formData.serialNumbers} onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="One per line: SN12345, SN67890..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destructionMethod" className="text-white">Destruction Method *</Label>
                    <select
                      id="destructionMethod" name="destructionMethod"
                      value={formData.destructionMethod} onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {destructionMethods.map(method => (
                        <option key={method.value} value={method.value}>
                          {method.label} — {method.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Certification Level *</Label>
                    <div className="space-y-3">
                      {certificationLevels.map(level => (
                        <div key={level.value} className="flex items-center space-x-3">
                          <input
                            type="radio" id={level.value} name="certificationLevel"
                            value={level.value}
                            checked={formData.certificationLevel === level.value}
                            onChange={handleInputChange}
                            className="accent-green-500"
                          />
                          <label htmlFor={level.value} className="text-white flex-1 text-sm">
                            <span className="font-medium">{level.label}</span>
                            <span className="text-green-400 ml-2">({level.price})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes" className="text-white">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes" name="additionalNotes" rows={2}
                      value={formData.additionalNotes} onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Any special requirements or compliance notes"
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                      }
                      className="border-gray-600 data-[state=checked]:bg-green-600 mt-0.5"
                    />
                    <label htmlFor="agreeToTerms" className="text-gray-300 text-sm leading-relaxed">
                      I confirm that the information provided is accurate and I agree that this certificate
                      serves as proof of secure data destruction under POPIA Section 21 and NEMWA Act 59 of 2008.
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      type="button" variant="outline" asChild
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Link to="/tools">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Tools
                      </Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isGenerating || !formData.agreeToTerms}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      {isGenerating ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Generating...
                        </span>
                      ) : 'Generate Certificate'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <DarkFooter />
    </div>
  );
};

export default Certificate;
