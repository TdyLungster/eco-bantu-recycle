
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from './ui/button';

const OptimizedImageShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const images = [
    {
      src: '/lovable-uploads/116647c6-0b22-4ba1-9ef3-49ea15b9193a.png',
      title: 'E-Waste Collection',
      description: 'Professional collection of electronic devices from businesses and individuals'
    },
    {
      src: '/lovable-uploads/1d597c1b-c8b7-4bea-a6c4-25070f1172ab.png',
      title: 'Secure Processing',
      description: 'State-of-the-art facilities ensuring secure data destruction and material recovery'
    },
    {
      src: '/lovable-uploads/269a5861-5dc9-43bf-9d22-c739472e118b.png',
      title: 'Environmental Impact',
      description: 'Measurable positive impact on our environment through responsible recycling'
    },
    {
      src: '/lovable-uploads/34b3f31b-63b9-4c2c-80c8-0554f8f35b2d.png',
      title: 'Community Partnership',
      description: 'Working together with communities for a sustainable future'
    },
    {
      src: '/lovable-uploads/37218efa-07cd-478a-9457-47fcc607ab2b.png',
      title: 'Innovation Hub',
      description: 'Leading technological solutions in e-waste management and recycling'
    }
  ];

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextImage, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, nextImage]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (!isLoaded) {
    return (
      <div className="relative h-[70vh] bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="relative h-[70vh] overflow-hidden bg-white">
      {/* Image Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-8 md:p-12">
            <div className="max-w-4xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-white"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {images[currentIndex].title}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                    {images[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="w-12 h-12 bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="w-12 h-12 bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Play/Pause Button */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-110'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            key={currentIndex}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </div>
      </div>
    </section>
  );
};

export default OptimizedImageShowcase;
