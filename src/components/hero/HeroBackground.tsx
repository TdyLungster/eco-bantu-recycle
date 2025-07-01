
import React from 'react';
import { motion } from 'framer-motion';

interface HeroBackgroundProps {
  isMobile: boolean;
  heroImages: string[];
  currentImageIndex: number;
}

const HeroBackground = ({ isMobile, heroImages, currentImageIndex }: HeroBackgroundProps) => {
  // Reduced circuit paths for mobile performance
  const generateCircuitPaths = () => {
    const paths = [];
    const pathCount = isMobile ? 30 : 80;
    for (let i = 0; i < pathCount; i++) {
      paths.push({
        d: `M${Math.random() * 100} ${Math.random() * 100} L${Math.random() * 100} ${Math.random() * 100}`,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
      });
    }
    return paths;
  };

  const circuitPaths = generateCircuitPaths();

  return (
    <>
      {/* Circuit Board Background - Reduced opacity on mobile */}
      <div className={`absolute inset-0 ${isMobile ? 'opacity-20' : 'opacity-30'}`}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {circuitPaths.map((path, index) => (
            <motion.path
              key={index}
              d={path.d}
              stroke="rgba(0, 255, 150, 0.2)"
              strokeWidth="0.1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                delay: path.delay,
                duration: path.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
      </div>

      {/* Dynamic Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
              backgroundBlendMode: 'overlay',
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 0.15 : 0,
              scale: index === currentImageIndex ? (isMobile ? 1.05 : 1.1) : 1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Floating Particles - Reduced on mobile */}
      <div className="absolute inset-0">
        {Array.from({ length: isMobile ? 20 : 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, isMobile ? -10 : -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
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
    </>
  );
};

export default HeroBackground;
