
import React, { useRef, useState, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { useWebVitals } from '@/hooks/usePerformanceOptimization';

const FastHero = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  useWebVitals();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.1 : 1.3]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -30 : -50]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <motion.section 
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        {/* Optimized Background */}
        <div className="absolute inset-0">
          {/* Simplified circuit pattern for better performance */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="circuit" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M0 5h10M5 0v10" stroke="rgba(0, 255, 150, 0.3)" strokeWidth="0.5" fill="none"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>
          
          {/* Reduced floating particles for mobile */}
          {Array.from({ length: isMobile ? 10 : 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6"
          style={{ y: textY }}
        >
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">Transforming </span>
            <span className="text-green-400">E-Waste</span>
          </motion.h1>

          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join South Africa's leading e-waste recycling revolution. 
            <span className="text-green-400"> 360,000 tonnes</span> of electronic waste 
            needs your action.
          </motion.p>

          <motion.button
            className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin The Journey
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
        </motion.div>
      </motion.section>
    </div>
  );
});

FastHero.displayName = 'FastHero';

export default FastHero;
