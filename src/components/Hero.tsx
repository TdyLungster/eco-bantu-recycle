
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Calendar, MapPin } from 'lucide-react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroImages = [
    '/lovable-uploads/1d597c1b-c8b7-4bea-a6c4-25070f1172ab.png',
    '/lovable-uploads/f4cd8821-0131-4e55-9b65-ca6018d590af.png',
    '/lovable-uploads/c86ed363-4767-4d65-94ff-e5221ede7e69.png'
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Bantu The People Team ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-eco-primary/80 via-eco-blue/70 to-eco-secondary/60" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white section-padding max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-6xl lg:text-8xl font-bold mb-4 drop-shadow-2xl">
              <span className="text-white">BANTU</span>
              <span className="text-eco-light block lg:inline lg:ml-4">THE PEOPLE</span>
            </h1>
            <div className="w-32 h-1 bg-eco-light mx-auto rounded-full" />
          </div>

          {/* Tagline */}
          <h2 className="text-2xl lg:text-4xl font-light mb-8 drop-shadow-lg">
            Recycling Today for a <span className="text-eco-light font-semibold">Greener Tomorrow</span>
          </h2>

          {/* Mission Statement */}
          <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Professional e-waste recycling services that turn your discarded electronics 
            into environmental action. Join our community in building a sustainable future.
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-6 rounded-2xl">
              <div className="text-4xl font-bold text-eco-light mb-2">2,500+</div>
              <div className="text-lg">Devices Recycled</div>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="text-4xl font-bold text-eco-light mb-2">15,000kg</div>
              <div className="text-lg">E-Waste Processed</div>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="text-4xl font-bold text-eco-light mb-2">85%</div>
              <div className="text-lg">Material Recovery</div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={() => scrollToSection('donation-form')}
              className="btn-eco text-xl px-12 py-6 rounded-2xl group"
            >
              Donate E-Waste Now
              <ArrowDown className="ml-3 h-6 w-6 group-hover:animate-bounce" />
            </Button>
            <Button 
              onClick={() => scrollToSection('services')}
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 text-xl px-12 py-6 rounded-2xl"
            >
              <Calendar className="mr-3 h-6 w-6" />
              Schedule Pickup
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <ArrowDown className="h-8 w-8 text-white/70" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-eco-light/20 rounded-full backdrop-blur-sm border border-white/20" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 bg-eco-blue/20 rounded-full backdrop-blur-sm border border-white/20" />
      </div>
    </section>
  );
};

export default Hero;
