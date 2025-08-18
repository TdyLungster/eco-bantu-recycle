
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Quote = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    requirements: '',
    volume: '',
    frequency: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fire GA4 event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'quote_submit', {
          event_category: 'engagement',
          event_label: 'quote_form'
        });
      }

      setIsSubmitted(true);
      toast.success('Quote request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
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
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-4">Quote Request Submitted!</h2>
                  <p className="text-gray-300 mb-6">
                    Thank you for your interest. Our team will review your requirements and contact you within 24 hours with a customized quote.
                  </p>
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                      <Link to="/tools">Back to Tools</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                      <Link to="/">Go Home</Link>
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
              <Building2 className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Request a <span className="text-green-400">Quote</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Get a customized quote for your corporate e-waste recycling needs
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Company Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Tell us about your organization and requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Company Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white">Company Name *</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact" className="text-white">Contact Person *</Label>
                      <Input
                        id="contact"
                        name="contact"
                        type="text"
                        required
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="Contact person name"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        placeholder="+27 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  {/* Service Requirements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="volume" className="text-white">Estimated Volume</Label>
                      <select
                        id="volume"
                        name="volume"
                        value={formData.volume}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      >
                        <option value="">Select volume</option>
                        <option value="small">Small (1-10 devices)</option>
                        <option value="medium">Medium (11-50 devices)</option>
                        <option value="large">Large (51-200 devices)</option>
                        <option value="enterprise">Enterprise (200+ devices)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequency" className="text-white">Collection Frequency</Label>
                      <select
                        id="frequency"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      >
                        <option value="">Select frequency</option>
                        <option value="one-time">One-time collection</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <Label htmlFor="requirements" className="text-white">Detailed Requirements *</Label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      required
                      rows={5}
                      value={formData.requirements}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Please describe your e-waste disposal needs, types of equipment, special requirements, data destruction needs, etc."
                    />
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
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
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

export default Quote;
