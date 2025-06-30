
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Recycle, Shield, Truck, Leaf } from 'lucide-react';

const ImmersiveHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight,
      });
      mouseX.set((clientX - innerWidth / 2) / 25);
      mouseY.set((clientY - innerHeight / 2) / 25);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Circuit board animation paths
  const generateCircuitPaths = () => {
    const paths = [];
    for (let i = 0; i < 80; i++) {
      paths.push({
        d: `M${Math.random() * 100} ${Math.random() * 100} L${Math.random() * 100} ${Math.random() * 100}`,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
      });
    }
    return paths;
  };

  const circuitPaths = generateCircuitPaths();

  const heroImages = [
    '/lovable-uploads/116647c6-0b22-4ba1-9ef3-49ea15b9193a.png',
    '/lovable-uploads/1d597c1b-c8b7-4bea-a6c4-25070f1172ab.png',
    '/lovable-uploads/269a5861-5dc9-43bf-9d22-c739472e118b.png',
    '/lovable-uploads/34b3f31b-63b9-4c2c-80c8-0554f8f35b2d.png',
    '/lovable-uploads/37218efa-07cd-478a-9457-47fcc607ab2b.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        {/* Circuit Board Background */}
        <div className="absolute inset-0 opacity-30">
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
                scale: index === currentImageIndex ? 1.1 : 1
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
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

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          style={{ y: textY }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
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
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Join South Africa's leading e-waste recycling revolution. 
            <span className="text-green-400"> 360,000 tonnes</span> of electronic waste 
            needs your action.
          </motion.p>

          <motion.button
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin The Journey
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-green-400" />
        </motion.div>
      </motion.section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-gray-900 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our <span className="text-green-400">Impact</span> Story
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 536, label: "Tonnes Recycled", icon: Recycle, color: "green" },
              { number: 1200, label: "Clients Served", icon: Truck, color: "blue" },
              { number: 15000, label: "Devices Processed", icon: Shield, color: "purple" },
              { number: 89, label: "Recovery Rate %", icon: Leaf, color: "emerald" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="relative z-10">
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400 mb-4`} />
                  <motion.div 
                    className={`text-4xl font-bold text-${stat.color}-400 mb-2`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2, delay: index * 0.3 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}+
                  </motion.div>
                  <p className="text-gray-300 font-medium">{stat.label}</p>
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

      {/* Scrollytelling Process Section */}
      <section className="relative" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen flex items-center">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              {[
                {
                  title: "Collection",
                  description: "Secure pickup from your location with certified transport and tracking.",
                  image: "/lovable-uploads/549628f5-d48b-4d34-a2e9-34afad44cb56.png"
                },
                {
                  title: "Secure Data Destruction",
                  description: "Military-grade data wiping and physical destruction with certification.",
                  image: "/lovable-uploads/5669cbba-ee2f-4fbb-9d50-e0722c45e5bd.png"
                },
                {
                  title: "Manual Dismantling",
                  description: "Careful separation of materials by trained technicians.",
                  image: "/lovable-uploads/7dea0f08-bae9-4775-9312-f3d10b0e2be9.png"
                },
                {
                  title: "Material Recovery & Rebirth",
                  description: "Precious metals and materials given new life in the circular economy.",
                  image: "/lovable-uploads/88fff659-0e31-46b2-867e-755b79c82d07.png"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Sticky Image */}
            <motion.div 
              className="relative"
              style={{ x: springX, y: springY }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/20">
                <motion.img
                  src="/lovable-uploads/b2fa359e-5a43-420a-856b-ee184a63e6b8.png"
                  alt="E-waste recycling process"
                  className="w-full h-full object-cover"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              {/* Floating elements around the image */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Recycle className="w-8 h-8 text-green-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImmersiveHero;
