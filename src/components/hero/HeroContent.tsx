
import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface HeroContentProps {
  textY: MotionValue<number>;
}

const HeroContent = ({ textY }: HeroContentProps) => {
  return (
    <motion.div 
      className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6"
      style={{ y: textY }}
    >
      <motion.h1 
        className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <span className="text-white">Transforming </span>
        <motion.span 
          className="text-green-400 inline-block"
          animate={{ 
            textShadow: [
              "0 0 10px rgba(0, 255, 150, 0.5)",
              "0 0 20px rgba(0, 255, 150, 0.8)",
              "0 0 10px rgba(0, 255, 150, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          E-Waste
        </motion.span>
      </motion.h1>

      <motion.p 
        className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Join South Africa's leading e-waste recycling revolution. 
        <span className="text-green-400"> 360,000 tonnes</span> of electronic waste 
        needs your action.
      </motion.p>

      <motion.button
        className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Begin The Journey
      </motion.button>
    </motion.div>
  );
};

export default HeroContent;
