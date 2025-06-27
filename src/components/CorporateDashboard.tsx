
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Crown, TrendingUp, Award, Download, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SponsorshipData {
  tier: string;
  monthly_amount: number;
  features: any;
  company_name: string;
  status: string;
}

interface ImpactData {
  month: string;
  devices: number;
  co2_saved: number;
  value: number;
}

const CorporateDashboard = () => {
  const [sponsorshipData, setSponsorshipData] = useState<SponsorshipData | null>(null);
  const [impactData, setImpactData] = useState<ImpactData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch sponsorship data
      const { data: sponsorship } = await supabase
        .from('sponsorships')
        .select(`
          *,
          companies(company_name)
        `)
        .eq('status', 'active')
        .single();

      if (sponsorship) {
        setSponsorshipData({
          ...sponsorship,
          company_name: sponsorship.companies?.company_name || 'Your Company'
        });
      }

      // Generate sample impact data
      const sampleData: ImpactData[] = [
        { month: 'Jan', devices: 45, co2_saved: 380, value: 6750 },
        { month: 'Feb', devices: 52, co2_saved: 440, value: 7800 },
        { month: 'Mar', devices: 38, co2_saved: 320, value: 5700 },
        { month: 'Apr', devices: 65, co2_saved: 550, value: 9750 },
        { month: 'May', devices: 48, co2_saved: 405, value: 7200 },
        { month: 'Jun', devices: 71, co2_saved: 600, value: 10650 }
      ];
      
      setImpactData(sampleData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setIsLoading(false);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'from-purple-500 to-purple-600';
      case 'gold': return 'from-yellow-500 to-yellow-600';
      case 'silver': return 'from-gray-400 to-gray-500';
      default: return 'from-orange-500 to-orange-600';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum': return '💎';
      case 'gold': return '🏆';
      case 'silver': return '🥈';
      default: return '🥉';
    }
  };

  const materialData = [
    { name: 'Metals', value: 45, color: '#22c55e' },
    { name: 'Plastics', value: 30, color: '#3b82f6' },
    { name: 'Rare Earth', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 10, color: '#6b7280' }
  ];

  const generateReport = async () => {
    try {
      // In a real implementation, this would generate a PDF report
      const reportData = {
        company: sponsorshipData?.company_name,
        tier: sponsorshipData?.tier,
        totalDevices: impactData.reduce((sum, month) => sum + month.devices, 0),
        totalCO2: impactData.reduce((sum, month) => sum + month.co2_saved, 0),
        totalValue: impactData.reduce((sum, month) => sum + month.value, 0),
        reportDate: new Date().toISOString()
      };
      
      console.log('Generating report:', reportData);
      alert('CSR Report generated successfully! Check your email.');
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${getTierColor(sponsorshipData?.tier || 'bronze')} rounded-xl flex items-center justify-center text-2xl`}>
                {getTierIcon(sponsorshipData?.tier || 'bronze')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {sponsorshipData?.company_name || 'Corporate Dashboard'}
                </h1>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span className="text-lg font-semibold text-gray-600 capitalize">
                    {sponsorshipData?.tier || 'Bronze'} Partner
                  </span>
                </div>
              </div>
            </div>
            
            <motion.button
              onClick={generateReport}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              Generate CSR Report
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'Total Devices Recycled', 
              value: impactData.reduce((sum, month) => sum + month.devices, 0),
              icon: TrendingUp,
              color: 'text-blue-600',
              bgColor: 'bg-blue-50'
            },
            { 
              title: 'CO₂ Saved (kg)', 
              value: impactData.reduce((sum, month) => sum + month.co2_saved, 0),
              icon: Award,
              color: 'text-green-600',
              bgColor: 'bg-green-50'
            },
            { 
              title: 'Recovery Value (R)', 
              value: impactData.reduce((sum, month) => sum + month.value, 0).toLocaleString(),
              icon: TrendingUp,
              color: 'text-purple-600',
              bgColor: 'bg-purple-50'
            },
            { 
              title: 'Monthly Investment', 
              value: `R${sponsorshipData?.monthly_amount?.toLocaleString() || '0'}`,
              icon: Calendar,
              color: 'text-orange-600',
              bgColor: 'bg-orange-50'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-xl p-6 border border-gray-200`}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              </div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Impact Over Time */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Impact</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="devices" fill="#22c55e" name="Devices" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Material Recovery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Material Recovery</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={materialData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {materialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Sponsorship Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Sponsorship Benefits</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Logo Placement',
                description: 'Featured on our website and marketing materials',
                status: 'Active'
              },
              {
                title: 'Monthly Reports',
                description: 'Detailed impact reports for CSR compliance',
                status: 'Active'
              },
              {
                title: 'Certificate of Impact',
                description: 'Official documentation of environmental contribution',
                status: 'Active'
              }
            ].map((benefit, index) => (
              <div key={benefit.title} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{benefit.title}</h4>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {benefit.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CorporateDashboard;
