
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  Recycle, TreePine, Zap, Droplets, Users, Building2, Award, TrendingUp,
  Globe, Leaf, Shield, Factory, Star, ChevronDown, Play, CheckCircle
} from 'lucide-react';

const ImpactStory = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  // Real-time animated counters
  const [counters, setCounters] = useState({
    devices: 0,
    co2: 0,
    energy: 0,
    companies: 0
  });

  useEffect(() => {
    const targets = { devices: 125000, co2: 28500, energy: 15600, companies: 850 };
    const duration = 3000;
    const steps = 60;
    
    const timer = setInterval(() => {
      setCounters(current => {
        const newCounters = { ...current };
        let completed = 0;
        
        Object.entries(targets).forEach(([key, target]) => {
          if (current[key] < target) {
            newCounters[key] = Math.min(
              current[key] + Math.ceil(target / steps), 
              target
            );
          } else {
            completed++;
          }
        });
        
        if (completed === Object.keys(targets).length) {
          clearInterval(timer);
        }
        
        return newCounters;
      });
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const impactData = [
    { month: 'Jan', devices: 8500, revenue: 2.1 },
    { month: 'Feb', devices: 12000, revenue: 2.8 },
    { month: 'Mar', devices: 15500, revenue: 3.2 },
    { month: 'Apr', devices: 19000, revenue: 3.9 },
    { month: 'May', devices: 22500, revenue: 4.5 },
    { month: 'Jun', devices: 25000, revenue: 5.1 }
  ];

  const metrics = [
    {
      title: "Devices Recycled",
      value: counters.devices,
      suffix: "+",
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      description: "Electronic devices safely processed and recycled",
      details: "From smartphones to enterprise servers"
    },
    {
      title: "CO₂ Emissions Prevented",
      value: counters.co2,
      suffix: " tons",
      icon: TreePine,
      color: "from-green-500 to-green-600",
      description: "Equivalent to planting 47,000 trees",
      details: "Measured through certified carbon accounting"
    },
    {
      title: "Energy Recovered",
      value: counters.energy,
      suffix: " MWh",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      description: "Clean energy generated from waste materials",
      details: "Powers 5,200 homes for one year"
    },
    {
      title: "Corporate Partners",
      value: counters.companies,
      suffix: "+",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      description: "Leading companies trust our services",
      details: "From startups to Fortune 500 companies"
    }
  ];

  const successStories = [
    {
      company: "TechCorp SA",
      devices: "15,000",
      savings: "R2.4M",
      story: "Reduced disposal costs by 60% while achieving 100% data security compliance."
    },
    {
      company: "Green Energy Ltd",
      devices: "8,500",
      savings: "R1.8M",
      story: "Achieved carbon neutral certification through our comprehensive recycling program."
    },
    {
      company: "Digital Solutions",
      devices: "22,000",
      savings: "R3.2M",
      story: "Streamlined IT refresh cycles with our corporate partnership program."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-lg font-bold mb-8">
            <Leaf className="w-5 h-5" />
            Our Environmental Impact Story
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            Transforming <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">E-Waste</span> Into Sustainable Impact
          </h1>
          <p className="text-2xl text-blue-900 max-w-5xl mx-auto leading-relaxed mb-8">
            We're not just recycling electronics – we're revolutionizing the entire lifecycle of technology. 
            Every device processed tells a powerful story of environmental responsibility, technological innovation, 
            and sustainable business practices that benefit both our planet and your bottom line.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-600 text-white p-6 rounded-2xl">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-lg">Years of Excellence</div>
            </div>
            <div className="bg-blue-700 text-white p-6 rounded-2xl">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-lg">Corporate Partners</div>
            </div>
            <div className="bg-blue-800 text-white p-6 rounded-2xl">
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-lg">Customer Satisfaction</div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Metrics Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Measurable Environmental Impact
            </h2>
            <p className="text-xl text-blue-800 max-w-3xl mx-auto">
              Real-time data showcasing our commitment to environmental sustainability and corporate responsibility
            </p>
          </div>
          
        {/* Interactive Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className={`relative bg-white rounded-3xl p-8 shadow-xl cursor-pointer transition-all duration-300 ${
                activeMetric === index ? 'scale-105 shadow-2xl' : 'hover:scale-102'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveMetric(index)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5 rounded-3xl`}></div>
              
              <metric.icon className={`w-12 h-12 mb-4 bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`} />
              
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`}>
                {metric.value.toLocaleString()}{metric.suffix}
              </div>
              
              <h3 className="font-bold text-gray-800 mb-2">{metric.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{metric.description}</p>
              
              {activeMetric === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-xs text-gray-500 border-t pt-4"
                >
                  {metric.details}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        </div>

        {/* Interactive Chart Section */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-12 mb-20 border-2 border-blue-200"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-8 text-blue-900">
                Our Exponential Growth Journey
              </h2>
              <p className="text-xl text-blue-800 mb-8 leading-relaxed">
                Witness our remarkable transformation from a small startup to South Africa's leading e-waste recycling company. 
                Each month brings us closer to our vision of a completely sustainable digital ecosystem that benefits both 
                the environment and business bottom lines.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                  <div className="text-4xl font-bold mb-2">285%</div>
                  <div className="text-lg">Year-over-year growth in device processing</div>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                  <div className="text-4xl font-bold mb-2">99.97%</div>
                  <div className="text-lg">Material recovery rate achieved</div>
                </div>
                <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-6 text-white">
                  <div className="text-4xl font-bold mb-2">47</div>
                  <div className="text-lg">Different device categories processed</div>
                </div>
                <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-6 text-white">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-lg">Customer support availability</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="month" stroke="#1e40af" fontSize={12} fontWeight="bold" />
                  <YAxis stroke="#1e40af" fontSize={12} fontWeight="bold" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e40af', 
                      border: 'none',
                      borderRadius: '16px',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="devices" 
                    stroke="#1e40af" 
                    fill="url(#enhancedBlueGradient)" 
                    strokeWidth={4}
                  />
                  <defs>
                    <linearGradient id="enhancedBlueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Success Stories */}
        <div className="mb-20">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6 text-blue-900">
              Transformational Success Stories That <span className="text-blue-600">Drive Change</span>
            </h2>
            <p className="text-2xl text-blue-800 max-w-4xl mx-auto leading-relaxed">
              Real partnerships, measurable environmental impact, and transformational business results 
              that showcase the power of sustainable e-waste management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-blue-100 hover:border-blue-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-2xl text-blue-900">{story.company}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <div className="text-3xl font-bold text-blue-600">{story.devices}</div>
                    <div className="text-base text-blue-800 font-semibold">Devices Processed</div>
                  </div>
                  <div className="bg-blue-100 rounded-2xl p-4">
                    <div className="text-3xl font-bold text-blue-700">{story.savings}</div>
                    <div className="text-base text-blue-900 font-semibold">Total Savings</div>
                  </div>
                </div>
                
                <p className="text-blue-800 text-lg leading-relaxed font-medium">{story.story}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-16 text-center text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Star className="w-20 h-20 mx-auto mb-8 opacity-90" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Write Your Environmental Impact Story?
          </h2>
          <p className="text-2xl mb-12 opacity-95 max-w-4xl mx-auto leading-relaxed">
            Join over 500 leading companies who have already transformed their e-waste management into 
            a competitive advantage while making a measurable positive impact on our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button 
              className="bg-white text-blue-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-50 transition-colors shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '#contact'}
            >
              Start Your Transformation Today
            </motion.button>
            <motion.button 
              className="border-3 border-white text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/tools'}
            >
              Calculate Your Potential Impact
            </motion.button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">Free</div>
              <div className="text-lg">Initial consultation & assessment</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">24hrs</div>
              <div className="text-lg">Response time guarantee</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">Certified</div>
              <div className="text-lg">ISO 14001 & R2 compliance</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStory;
