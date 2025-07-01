
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Recycle, 
  TreePine, 
  Zap, 
  Droplets, 
  Users, 
  Building2,
  Award,
  TrendingUp,
  MapPin,
  Calendar,
  ArrowRight
} from 'lucide-react';

const Impact = () => {
  const [currentImpact, setCurrentImpact] = useState(0);
  const [activeTab, setActiveTab] = useState('environmental');

  const impactStats = [
    { 
      number: 2847, 
      label: "Tonnes E-Waste Recycled", 
      icon: Recycle, 
      color: "green",
      description: "Equivalent to 5,694 cars removed from roads"
    },
    { 
      number: 15420, 
      label: "Trees Worth of CO₂ Saved", 
      icon: TreePine, 
      color: "emerald",
      description: "Equal to planting a small forest"
    },
    { 
      number: 89500, 
      label: "Devices Securely Processed", 
      icon: Building2, 
      color: "blue",
      description: "From smartphones to data centers"
    },
    { 
      number: 4200, 
      label: "Corporate Partners", 
      icon: Users, 
      color: "purple",
      description: "Trusted by leading companies"
    }
  ];

  const environmentalImpacts = [
    {
      title: "Carbon Footprint Reduction",
      value: "12,450 tonnes CO₂",
      description: "Prevented from entering atmosphere",
      icon: TreePine,
      trend: "+23% this year"
    },
    {
      title: "Energy Recovery",
      value: "8.7 GWh",
      description: "Renewable energy generated",
      icon: Zap,
      trend: "+31% this year"
    },
    {
      title: "Water Conservation",
      value: "2.1M liters",
      description: "Saved through proper recycling",
      icon: Droplets,
      trend: "+18% this year"
    }
  ];

  const socialImpacts = [
    {
      title: "Jobs Created",
      value: "287",
      description: "Direct and indirect employment",
      icon: Users,
      trend: "+42% growth"
    },
    {
      title: "Communities Served",
      value: "156",
      description: "Across South Africa",
      icon: MapPin,
      trend: "15 new this quarter"
    },
    {
      title: "Educational Programs",
      value: "45",
      description: "Schools and universities reached",
      icon: Award,
      trend: "12 workshops monthly"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImpact((prev) => (prev + 1) % impactStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'environmental', label: 'Environmental Impact', data: environmentalImpacts },
    { id: 'social', label: 'Social Impact', data: socialImpacts }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-eco-primary">Impact</span> Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every device recycled creates a ripple effect of positive change. 
            See how we're transforming e-waste into environmental and social value.
          </p>
        </motion.div>

        {/* Rotating Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              className={`relative bg-white rounded-3xl p-6 shadow-lg border-2 transition-all duration-500 ${
                currentImpact === index 
                  ? `border-${stat.color}-400 shadow-2xl scale-105` 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              
              <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                {stat.number.toLocaleString()}+
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2">{stat.label}</h3>
              <p className="text-sm text-gray-600">{stat.description}</p>
              
              {currentImpact === index && (
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 rounded-b-3xl`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Detailed Impact Tabs */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 mx-2 mb-2 rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'bg-eco-primary text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tabs.find(tab => tab.id === activeTab)?.data.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <item.icon className="w-8 h-8 text-eco-primary" />
                  <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                    {item.trend}
                  </span>
                </div>
                
                <div className="text-2xl font-bold text-gray-800 mb-2">{item.value}</div>
                <h3 className="font-semibold text-gray-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h3>
          <p className="text-gray-600 mb-6">Join thousands of businesses creating positive change through responsible e-waste recycling.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              className="bg-eco-primary text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-eco-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '#contact'}
            >
              Schedule Pickup <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button 
              className="border-2 border-eco-primary text-eco-primary px-8 py-3 rounded-full font-semibold hover:bg-eco-primary hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/tools'}
            >
              Calculate Impact
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
