
import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Recycle } from 'lucide-react';

interface ScrollytellingProcessProps {
  isMobile: boolean;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

const ScrollytellingProcess = ({ isMobile, springX, springY }: ScrollytellingProcessProps) => {
  const processSteps = [
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
  ];

  return (
    <section className="relative" style={{ height: isMobile ? '200vh' : '400vh' }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 sm:space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Sticky Image */}
          <motion.div 
            className="relative order-first lg:order-last"
            style={{ x: isMobile ? 0 : springX, y: isMobile ? 0 : springY }}
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
              className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-green-400/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Recycle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScrollytellingProcess;
