
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import ImpactStats from './hero/ImpactStats';
import ScrollytellingProcess from './hero/ScrollytellingProcess';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { useMouseTracking } from '../hooks/useMouseTracking';
import { useImageSlideshow } from '../hooks/useImageSlideshow';

const ImmersiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useMobileDetection();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.2 : 1.5]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -100]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useMouseTracking(mouseX, mouseY, isMobile, setMousePosition);

  const heroImages = [
    '/lovable-uploads/116647c6-0b22-4ba1-9ef3-49ea15b9193a.png',
    '/lovable-uploads/1d597c1b-c8b7-4bea-a6c4-25070f1172ab.png',
    '/lovable-uploads/269a5861-5dc9-43bf-9d22-c739472e118b.png',
    '/lovable-uploads/34b3f31b-63b9-4c2c-80c8-0554f8f35b2d.png',
    '/lovable-uploads/37218efa-07cd-478a-9457-47fcc607ab2b.png'
  ];

  const currentImageIndex = useImageSlideshow(heroImages);

  return (
    <div ref={containerRef} className="relative overflow-hidden" style={{ position: 'relative' }}>
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <HeroBackground 
          isMobile={isMobile}
          heroImages={heroImages}
          currentImageIndex={currentImageIndex}
        />

        <HeroContent textY={textY} />

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
        </motion.div>
      </motion.section>

      <ImpactStats isMobile={isMobile} />

      <ScrollytellingProcess 
        isMobile={isMobile}
        springX={springX}
        springY={springY}
      />
    </div>
  );
};

export default ImmersiveHero;
