
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Recycle, Zap, Globe, Users } from 'lucide-react';

const ParticleSystem = () => {
  return (
    <Canvas className="absolute inset-0 pointer-events-none">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          position={[-2, 0, 0]}
        >
          ECO
          <meshStandardMaterial color="#1B7A3E" />
        </Text3D>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

const AnimatedCounter = ({ end, label, icon: Icon }: { end: number; label: string; icon: any }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Icon className="w-8 h-8 mx-auto mb-2 text-green-400" />
      <div className="text-3xl font-bold text-white mb-1">
        {inView && <CountUp end={end} duration={2.5} />}+
      </div>
      <div className="text-sm text-green-200">{label}</div>
    </motion.div>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP Timeline for hero animations
      const tl = gsap.timeline();
      
      tl.from(".hero-title", {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power3.out",
        stagger: 0.2
      })
      .from(".hero-subtitle", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out"
      }, "-=0.5")
      .from(".hero-cta", {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        ease: "back.out(1.7)"
      }, "-=0.3");

      // Floating animation for the main CTA
      gsap.to(".floating-cta", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-blue-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <ParticleSystem />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <motion.div
              ref={titleRef}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="hero-title text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block">Bantu</span>
                <span className="block text-green-400">The People</span>
              </h1>
              
              <div className="hero-subtitle text-xl lg:text-2xl text-green-200 max-w-lg">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 1 }}
                  className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-green-400"
                >
                  Recycling Today for a Greener Tomorrow
                </motion.span>
              </div>
            </motion.div>

            <div className="hero-cta space-y-6">
              <p className="text-lg text-green-100 max-w-xl">
                Professional e-waste recycling services in Johannesburg. Transform your old electronics into environmental impact with our cutting-edge recycling solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="floating-cta bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ 
                    boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
                    scale: 1.05 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Free Pickup
                </motion.button>
                
                <motion.button
                  className="border-2 border-green-400 text-green-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-400 hover:text-green-900 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Corporate Packages
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <AnimatedCounter end={500} label="Tons Recycled" icon={Recycle} />
            <AnimatedCounter end={1200} label="CO₂ Saved (kg)" icon={Globe} />
            <AnimatedCounter end={850} label="Devices Processed" icon={Zap} />
            <AnimatedCounter end={120} label="Corporate Partners" icon={Users} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
