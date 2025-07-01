
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
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Leaf className="w-4 h-4" />
            Impact Story
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Transforming <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">E-Waste</span> Into Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're not just recycling electronics – we're building a sustainable future. 
            Every device tells a story of environmental responsibility and technological innovation.
          </p>
        </motion.div>

        {/* Interactive Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        {/* Interactive Chart Section */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Our Growth Journey
              </h2>
              <p className="text-gray-600 mb-6">
                Witness our exponential growth in device processing and environmental impact. 
                Each month brings us closer to our vision of a zero-waste digital future.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-blue-600">180%</div>
                  <div className="text-sm text-blue-800">Year-over-year growth</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-green-800">Recovery rate</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="devices" 
                    stroke="#3B82F6" 
                    fill="url(#blueGradient)" 
                    strokeWidth={3}
                  />
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Success Stories */}
        <div className="mb-16">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Success Stories That <span className="text-green-600">Matter</span>
            </h2>
            <p className="text-xl text-gray-600">
              Real partnerships, measurable impact, transformational results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="font-bold text-lg">{story.company}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{story.devices}</div>
                    <div className="text-sm text-gray-600">Devices Processed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{story.savings}</div>
                    <div className="text-sm text-gray-600">Cost Savings</div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">{story.story}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-center text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Star className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Write Your Impact Story?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the leading companies transforming their e-waste into environmental and economic value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '#contact'}
            >
              Start Your Journey
            </motion.button>
            <motion.button 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all"
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

export default ImpactStory;
