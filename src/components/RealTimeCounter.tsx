import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Recycle, TrendingUp, Users, Zap } from 'lucide-react';

const RealTimeCounter = () => {
  const [counters, setCounters] = useState({
    ewasteRecycled: 2400,
    co2Saved: 1850,
    partnersJoined: 127,
    devicesSaved: 3920
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        ewasteRecycled: prev.ewasteRecycled + Math.floor(Math.random() * 3),
        co2Saved: prev.co2Saved + Math.floor(Math.random() * 2),
        partnersJoined: prev.partnersJoined + (Math.random() > 0.95 ? 1 : 0),
        devicesSaved: prev.devicesSaved + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: <Recycle className="w-8 h-8" />,
      value: counters.ewasteRecycled,
      label: "kg E-Waste Recycled",
      suffix: "kg",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: counters.co2Saved,
      label: "kg CO₂ Saved",
      suffix: "kg",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: counters.partnersJoined,
      label: "Partners Joined",
      suffix: "",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: counters.devicesSaved,
      label: "Devices Saved",
      suffix: "",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real-Time <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch our environmental impact grow in real-time as we transform South Africa's e-waste landscape
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center text-white mb-4 mx-auto`}>
                {stat.icon}
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <CountUp 
                    end={stat.value} 
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs text-green-400">Live</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            * Statistics updated every 5 seconds | EWASA & SASP Compliant
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RealTimeCounter;