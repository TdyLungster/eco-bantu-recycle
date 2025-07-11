
import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, Shield, Truck, Leaf, Award, Users, Globe, Zap } from 'lucide-react';

interface ImpactStatsProps {
  isMobile: boolean;
}

const ImpactStats = ({ isMobile }: ImpactStatsProps) => {
  const stats = [
    { number: 536, label: "Tonnes Recycled", icon: Recycle, color: "green" },
    { number: 1200, label: "Clients Served", icon: Users, color: "blue" },
    { number: 15000, label: "Devices Processed", icon: Shield, color: "purple" },
    { number: 89, label: "Recovery Rate %", icon: Leaf, color: "emerald" }
  ];

  const achievements = [
    { icon: Award, title: "ISO 14001 Certified", description: "Environmental management system certification" },
    { icon: Globe, title: "Carbon Neutral Operations", description: "Zero net carbon emissions across all facilities" },
    { icon: Zap, title: "99.9% Data Destruction", description: "Secure data wiping with certified processes" },
    { icon: Truck, title: "Same-Day Collection", description: "Rapid pickup service across South Africa" }
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-blue-900/95" />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Environmental Impact</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Leading South Africa's e-waste recycling revolution with certified processes, 
            sustainable practices, and measurable environmental impact across Johannesburg and beyond.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -5 }}
            >
              <div className="relative z-10">
                <stat.icon className={`w-8 h-8 sm:w-10 sm:h-10 text-${stat.color}-400 mb-4`} />
                <motion.div 
                  className={`text-4xl sm:text-5xl font-bold text-${stat.color}-400 mb-2`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2, delay: index * 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.number}+
                </motion.div>
                <p className="text-gray-300 font-semibold text-base sm:text-lg">{stat.label}</p>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
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

        {/* SEO Content Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/10">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
              Why Choose Bantu The People for E-Waste Recycling?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-green-400">Certified Excellence</h4>
                <p className="leading-relaxed">
                  As South Africa's premier e-waste recycling company, we maintain ISO 14001 certification 
                  and comply with all environmental regulations. Our state-of-the-art facilities in 
                  Johannesburg process electronic waste with zero environmental impact.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-blue-400">Secure Data Destruction</h4>
                <p className="leading-relaxed">
                  Protect your sensitive information with our certified data destruction services. 
                  We guarantee 99.9% data erasure using military-grade wiping protocols, ensuring 
                  complete privacy protection for all corporate and personal devices.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-purple-400">Circular Economy Leader</h4>
                <p className="leading-relaxed">
                  We recover valuable materials from electronic waste, contributing to South Africa's 
                  circular economy. Our advanced recycling processes extract precious metals, rare earth 
                  elements, and other valuable components for reuse in new products.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-emerald-400">Environmental Impact</h4>
                <p className="leading-relaxed">
                  Every device we process prevents toxic materials from entering landfills and 
                  waterways. Our carbon-neutral operations have saved over 2,400 tonnes of CO₂ 
                  emissions, making us the most environmentally responsible choice in South Africa.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: isMobile ? 1 : 1.02 }}
            >
              <achievement.icon className="w-10 h-10 mx-auto mb-4 text-green-400 group-hover:text-blue-400 transition-colors duration-300" />
              <h4 className="text-lg font-semibold text-white mb-2">{achievement.title}</h4>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Make an Environmental Impact?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join over 1,200 businesses and individuals who trust Bantu The People 
            for professional e-waste recycling services in South Africa.
          </p>
          <motion.button
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
            whileHover={{ 
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
              scale: 1.05 
            }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Free Pickup Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;
