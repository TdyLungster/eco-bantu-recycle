
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ImageShowcase = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const images = [
    {
      src: "/lovable-uploads/88fff659-0e31-46b2-867e-755b79c82d07.png",
      alt: "Our Team in Action",
      title: "Professional E-Waste Team",
      description: "Our certified technicians handle your electronics with care and expertise"
    },
    {
      src: "/lovable-uploads/37218efa-07cd-478a-9457-47fcc607ab2b.png",
      alt: "E-Waste Collection",
      title: "Secure Collection Process",
      description: "Professional collection and sorting of electronic waste materials"
    },
    {
      src: "/lovable-uploads/269a5861-5dc9-43bf-9d22-c739472e118b.png",
      alt: "Processing Facility",
      title: "State-of-the-Art Processing",
      description: "Modern facility equipped for safe and efficient e-waste processing"
    },
    {
      src: "/lovable-uploads/34b3f31b-63b9-4c2c-80c8-0554f8f35b2d.png",
      alt: "Recycling Factory",
      title: "Sustainable Recycling",
      description: "Advanced recycling facility powered by renewable energy"
    },
    {
      src: "/lovable-uploads/549628f5-d48b-4d34-a2e9-34afad44cb56.png",
      alt: "Environmental Impact",
      title: "Environmental Excellence",
      description: "Creating a sustainable future through responsible e-waste management"
    },
    {
      src: "/lovable-uploads/7dea0f08-bae9-4775-9312-f3d10b0e2be9.png",
      alt: "Impact Dashboard",
      title: "Measurable Impact",
      description: "Track your environmental contribution with detailed impact reports"
    }
  ];

  return (
    <div className="bg-white py-16" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            See Our Impact in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From collection to processing, witness how we transform e-waste into environmental impact
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.description}</p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ♻️ Eco-Friendly
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-green-200">Tons Recycled</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1,200kg</div>
              <div className="text-green-200">CO₂ Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">850+</div>
              <div className="text-green-200">Devices Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">120+</div>
              <div className="text-green-200">Corporate Partners</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageShowcase;
