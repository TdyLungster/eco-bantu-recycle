import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, RadialBarChart, RadialBar
} from 'recharts';
import { 
  Recycle, TreePine, Zap, Droplets, Users, Building2, Award, TrendingUp,
  MapPin, Calendar, ArrowRight, Globe, Leaf, Shield, Factory, Star
} from 'lucide-react';

const ImpactDashboard = () => {
  const [activeChart, setActiveChart] = useState('overview');
  const [animatedStats, setAnimatedStats] = useState({
    devices: 0,
    co2: 0,
    energy: 0,
    jobs: 0
  });

  // Animate numbers on load
  useEffect(() => {
    const targets = { devices: 89500, co2: 15420, energy: 8700, jobs: 287 };
    const duration = 2000;
    const increment = 50;
    
    const timer = setInterval(() => {
      setAnimatedStats(current => {
        const newStats = { ...current };
        let allComplete = true;
        
        Object.keys(targets).forEach(key => {
          if (current[key] < targets[key]) {
            newStats[key] = Math.min(current[key] + Math.ceil(targets[key] / increment), targets[key]);
            allComplete = false;
          }
        });
        
        if (allComplete) clearInterval(timer);
        return newStats;
      });
    }, duration / increment);

    return () => clearInterval(timer);
  }, []);

  const wasteRecyclingData = [
    { month: 'Jan', smartphones: 1200, laptops: 800, tablets: 400, servers: 150 },
    { month: 'Feb', smartphones: 1400, laptops: 950, tablets: 500, servers: 180 },
    { month: 'Mar', smartphones: 1800, laptops: 1100, tablets: 650, servers: 220 },
    { month: 'Apr', smartphones: 2200, laptops: 1300, tablets: 800, servers: 280 },
    { month: 'May', smartphones: 2800, laptops: 1600, tablets: 950, servers: 350 },
    { month: 'Jun', smartphones: 3200, laptops: 1900, tablets: 1100, servers: 420 }
  ];

  const impactByRegion = [
    { name: 'Gauteng', value: 35, devices: 31325, color: '#1B7A3E' },
    { name: 'Western Cape', value: 25, devices: 22375, color: '#2E8B57' },
    { name: 'KwaZulu-Natal', value: 20, devices: 17900, color: '#32CD32' },
    { name: 'Eastern Cape', value: 12, devices: 10740, color: '#4682B4' },
    { name: 'Other Provinces', value: 8, devices: 7160, color: '#90EE90' }
  ];

  const environmentalSavings = [
    { category: 'CO₂ Prevented', value: 15420, unit: 'tonnes', icon: TreePine, color: '#1B7A3E' },
    { category: 'Energy Recovered', value: 8700, unit: 'MWh', icon: Zap, color: '#2E8B57' },
    { category: 'Water Saved', value: 2100, unit: 'k liters', icon: Droplets, color: '#4682B4' },
    { category: 'Materials Recovered', value: 2847, unit: 'tonnes', icon: Recycle, color: '#32CD32' }
  ];

  const certificationData = [
    { name: 'ISO 14001', value: 100, color: '#1B7A3E' },
    { name: 'R2 Certified', value: 95, color: '#2E8B57' },
    { name: 'Data Security', value: 100, color: '#4682B4' },
    { name: 'WEEE Compliance', value: 98, color: '#32CD32' }
  ];

  const globalComparison = [
    { country: 'South Africa', recycling: 89, recovery: 92, sustainability: 88 },
    { country: 'USA', recycling: 85, recovery: 88, sustainability: 82 },
    { country: 'Germany', recycling: 91, recovery: 89, sustainability: 93 },
    { country: 'Japan', recycling: 87, recovery: 90, sustainability: 85 },
    { country: 'Australia', recycling: 83, recovery: 86, sustainability: 80 }
  ];

  const charts = {
    overview: {
      title: 'Recycling Trends',
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={wasteRecyclingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '12px'
              }} 
            />
            <Area type="monotone" dataKey="smartphones" stackId="1" stroke="#1B7A3E" fill="#1B7A3E" fillOpacity={0.8} />
            <Area type="monotone" dataKey="laptops" stackId="1" stroke="#2E8B57" fill="#2E8B57" fillOpacity={0.8} />
            <Area type="monotone" dataKey="tablets" stackId="1" stroke="#4682B4" fill="#4682B4" fillOpacity={0.8} />
            <Area type="monotone" dataKey="servers" stackId="1" stroke="#32CD32" fill="#32CD32" fillOpacity={0.8} />
          </AreaChart>
        </ResponsiveContainer>
      )
    },
    regional: {
      title: 'Regional Impact Distribution',
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={impactByRegion}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {impactByRegion.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [
                `${value}% (${props.payload.devices.toLocaleString()} devices)`, 
                props.payload.name
              ]}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )
    },
    certifications: {
      title: 'Compliance & Certifications',
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={certificationData}>
            <RadialBar dataKey="value" cornerRadius={10} label={{ position: 'insideStart', fill: '#fff', fontSize: '12px' }} />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Compliance Score']}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      )
    },
    global: {
      title: 'Global Performance Comparison',
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={globalComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="country" stroke="#666" fontSize={11} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="recycling" fill="#1B7A3E" name="Recycling Rate" />
            <Bar dataKey="recovery" fill="#2E8B57" name="Material Recovery" />
            <Bar dataKey="sustainability" fill="#4682B4" name="Sustainability Score" />
          </BarChart>
        </ResponsiveContainer>
      )
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Our <span className="bg-gradient-to-r from-eco-primary to-eco-blue bg-clip-text text-transparent">Global Impact</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Leading Africa's e-waste revolution with world-class recycling technology, 
            certified processes, and measurable environmental impact.
          </p>
        </motion.div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { number: animatedStats.devices, label: "Devices Processed", icon: Building2, suffix: "+", color: "text-green-600" },
            { number: animatedStats.co2, label: "Trees Worth CO₂ Saved", icon: TreePine, suffix: "+", color: "text-emerald-600" },
            { number: animatedStats.energy, label: "MWh Energy Recovered", icon: Zap, suffix: "+", color: "text-blue-600" },
            { number: animatedStats.jobs, label: "Jobs Created", icon: Users, suffix: "+", color: "text-purple-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <stat.icon className={`w-12 h-12 ${stat.color} mb-4`} />
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number.toLocaleString()}{stat.suffix}
              </div>
              <p className="text-gray-700 font-semibold text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Charts Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(charts).map(([key, chart]) => (
              <button
                key={key}
                onClick={() => setActiveChart(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeChart === key
                    ? 'bg-eco-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {chart.title}
              </button>
            ))}
          </div>
          
          <motion.div
            key={activeChart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              {charts[activeChart].title}
            </h3>
            {charts[activeChart].component}
          </motion.div>
        </div>

        {/* Environmental Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {environmentalSavings.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <item.icon className="w-10 h-10 mb-4" style={{ color: item.color }} />
              <div className="text-3xl font-bold mb-2" style={{ color: item.color }}>
                {item.value.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-1">{item.unit}</div>
              <div className="font-semibold text-gray-800">{item.category}</div>
            </motion.div>
          ))}
        </div>

        {/* Global Recognition */}
        <motion.div 
          className="bg-gradient-to-r from-eco-primary to-eco-blue rounded-3xl p-8 text-white text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Globe className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-3xl font-bold mb-4">Global Recognition</h3>
          <p className="text-xl mb-6 opacity-90">
            Ranked #1 E-Waste Recycling Company in Africa | ISO 14001 Certified | R2 Responsible Recycling
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-current" />
              <span className="font-semibold">4.9/5 Customer Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              <span className="font-semibold">100% Data Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6" />
              <span className="font-semibold">Industry Leader</span>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-6 text-gray-900">Ready to Join the Revolution?</h3>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Partner with Africa's leading e-waste recycling company and make a measurable impact on our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              className="bg-eco-primary text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-eco-primary/90 transition-colors shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '#contact'}
            >
              Schedule Free Pickup <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="border-2 border-eco-primary text-eco-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-eco-primary hover:text-white transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/tools'}
            >
              Calculate Your Impact
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactDashboard;
