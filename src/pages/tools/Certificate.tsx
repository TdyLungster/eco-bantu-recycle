
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Download, ArrowLeft, Shield, Lock, Award } from 'lucide-react';
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

const Certificate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    deviceTypes: '',
    serialNumbers: '',
    destructionMethod: 'dod-3-pass',
    certificationLevel: 'standard',
    additionalNotes: '',
    agreeToTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate certificate generation - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsGenerated(true);
      toast.success('Certificate generated successfully!');
    } catch (error) {
      toast.error('Failed to generate certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const downloadCertificate = () => {
    // In production, this would download the actual PDF
    toast.success('Certificate download started');
  };

  const destructionMethods = [
    { value: 'dod-3-pass', label: 'DoD 3-Pass (Standard)', description: 'Department of Defense standard 3-pass overwrite' },
    { value: 'dod-7-pass', label: 'DoD 7-Pass (Enhanced)', description: 'Department of Defense enhanced 7-pass overwrite' },
    { value: 'physical-destruction', label: 'Physical Destruction', description: 'Complete physical destruction of storage media' },
    { value: 'degaussing', label: 'Degaussing', description: 'Magnetic field erasure for magnetic storage' }
  ];

  const certificationLevels = [
    { value: 'standard', label: 'Standard Certificate', price: 'Free' },
    { value: 'premium', label: 'Premium Certificate', price: 'R99' },
    { value: 'enterprise', label: 'Enterprise Certificate', price: 'R299' }
  ];

  if (isGenerated) {
    return (
      <div className="min-h-screen bg-gray-900">
        <DarkNavigation />
        <main className="pt-32 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8">
                  <Award className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-4">Certificate Generated!</h2>
                  <p className="text-gray-300 mb-6">
                    Your data destruction certificate has been generated and is ready for download.
                  </p>
                  
                  {/* Certificate Preview */}
                  <div className="bg-white rounded-lg p-6 mb-6 text-black">
                    <div className="border-4 border-green-600 rounded-lg p-6">
                      <div className="text-center mb-4">
                        <h3 className="text-2xl font-bold text-green-600">DATA DESTRUCTION CERTIFICATE</h3>
                        <p className="text-gray-600">Certificate ID: BTP-{Date.now()}</p>
                      </div>
                      
                      <div className="space-y-3 text-left">
                        <div><strong>Company:</strong> {formData.companyName}</div>
                        <div><strong>Contact:</strong> {formData.contactPerson}</div>
                        <div><strong>Method:</strong> {destructionMethods.find(m => m.value === formData.destructionMethod)?.label}</div>
                        <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
                        Certified by Bantu The People - E-Waste Recycling Solutions<br />
                        This certificate confirms the secure destruction of data according to industry standards.
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={downloadCertificate} className="w-full bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate (PDF)
                    </Button>
                    <Button onClick={() => setIsGenerated(false)} variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                      Generate Another Certificate
                    </Button>
                    <Button asChild variant="ghost" className="w-full text-gray-400 hover:text-white">
                      <Link to="/tools">Back to Tools</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
          
          {/* Header */}
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
              Generate a certified data destruction certificate for your records
            </p>
          </motion.div>

          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-900/20 border-green-600/30 text-center">
                <CardContent className="p-4">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h3 className="text-white font-medium mb-1">Secure</h3>
                  <p className="text-gray-300 text-xs">Industry standard data destruction</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-900/20 border-blue-600/30 text-center">
                <CardContent className="p-4">
                  <Lock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-white font-medium mb-1">Compliant</h3>
                  <p className="text-gray-300 text-xs">POPI Act & GDPR compliant</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-900/20 border-purple-600/30 text-center">
                <CardContent className="p-4">
                  <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="text-white font-medium mb-1">Certified</h3>
                  <p className="text-gray-300 text-xs">Legally recognized certificate</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Certificate Request Form</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete the form below to generate your data destruction certificate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Company Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-white">Company Name *</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson" className="text-white">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        name="contactPerson"
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="Contact person name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="contact@company.com"
                    />
                  </div>

                  {/* Device Information */}
                  <div className="space-y-2">
                    <Label htmlFor="deviceTypes" className="text-white">Device Types *</Label>
                    <Input
                      id="deviceTypes"
                      name="deviceTypes"
                      type="text"
                      required
                      value={formData.deviceTypes}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="e.g., Laptops, Hard Drives, Servers"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serialNumbers" className="text-white">Serial Numbers (Optional)</Label>
                    <Textarea
                      id="serialNumbers"
                      name="serialNumbers"
                      rows={3}
                      value={formData.serialNumbers}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="List serial numbers of devices (one per line)"
                    />
                  </div>

                  {/* Destruction Method */}
                  <div className="space-y-2">
                    <Label htmlFor="destructionMethod" className="text-white">Destruction Method *</Label>
                    <select
                      id="destructionMethod"
                      name="destructionMethod"
                      value={formData.destructionMethod}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      {destructionMethods.map(method => (
                        <option key={method.value} value={method.value}>
                          {method.label} - {method.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Certification Level */}
                  <div className="space-y-2">
                    <Label className="text-white">Certification Level *</Label>
                    <div className="space-y-3">
                      {certificationLevels.map(level => (
                        <div key={level.value} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            id={level.value}
                            name="certificationLevel"
                            value={level.value}
                            checked={formData.certificationLevel === level.value}
                            onChange={handleInputChange}
                            className="text-green-600"
                          />
                          <label htmlFor={level.value} className="text-white flex-1">
                            <span className="font-medium">{level.label}</span>
                            <span className="text-green-400 ml-2">({level.price})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes" className="text-white">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Any special requirements or notes"
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked as boolean})}
                      className="border-gray-600 data-[state=checked]:bg-green-600"
                    />
                    <label htmlFor="agreeToTerms" className="text-gray-300 text-sm leading-relaxed">
                      I agree to the terms and conditions and confirm that the information provided is accurate. 
                      I understand that this certificate serves as proof of secure data destruction according to industry standards.
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      asChild
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
                      {isGenerating ? 'Generating Certificate...' : 'Generate Certificate'}
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
