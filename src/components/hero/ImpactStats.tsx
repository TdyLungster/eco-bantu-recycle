
import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, Shield, Truck, Leaf } from 'lucide-react';

interface ImpactStatsProps {
  isMobile: boolean;
}

const ImpactStats = ({ isMobile }: ImpactStatsProps) => {
  const stats = [
    { number: 536, label: "Tonnes Recycled", icon: Recycle, color: "green" },
    { number: 1200, label: "Clients Served", icon: Truck, color: "blue" },
    { number: 15000, label: "Devices Processed", icon: Shield, color: "purple" },
    { number: 89, label: "Recovery Rate %", icon: Leaf, color: "emerald" }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 text-white px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our <span className="text-green-400">Impact</span> Story
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -5 }}
            >
              <div className="relative z-10">
                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${stat.color}-400 mb-3 sm:mb-4`} />
                <motion.div 
                  className={`text-3xl sm:text-4xl font-bold text-${stat.color}-400 mb-2`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2, delay: index * 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.number}+
                </motion.div>
                <p className="text-gray-300 font-medium text-sm sm:text-base">{stat.label}</p>
              </div>
              
              {/* Progress bar */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-400"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: index * 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
