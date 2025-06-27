
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, Circle, Monitor, Settings } from 'lucide-react';

const Impact = () => {
  const [counters, setCounters] = useState({
    devices: 0,
    co2Saved: 0,
    materialsRecovered: 0,
    communities: 0
  });

  const finalValues = {
    devices: 2547,
    co2Saved: 63675, // kg of CO2
    materialsRecovered: 15430, // kg of materials
    communities: 12
  };

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          devices: Math.floor(finalValues.devices * progress),
          co2Saved: Math.floor(finalValues.co2Saved * progress),
          materialsRecovered: Math.floor(finalValues.materialsRecovered * progress),
          communities: Math.floor(finalValues.communities * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(finalValues);
        }
      }, stepDuration);
    };

    // Start animation when component mounts
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('impact-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const impactStats = [
    {
      icon: Monitor,
      title: "Devices Recycled",
      value: counters.devices.toLocaleString(),
      suffix: "+",
      description: "Electronic devices processed responsibly",
      color: "text-eco-primary"
    },
    {
      icon: ArrowUp,
      title: "CO2 Emissions Prevented",
      value: (counters.co2Saved / 1000).toFixed(1),
      suffix: " tons",
      description: "Carbon footprint reduction achieved",
      color: "text-eco-blue"
    },
    {
      icon: Settings,
      title: "Materials Recovered",
      value: (counters.materialsRecovered / 1000).toFixed(1),
      suffix: " tons",
      description: "Precious metals and components salvaged",
      color: "text-eco-secondary"
    },
    {
      icon: Circle,
      title: "Communities Served",
      value: counters.communities,
      suffix: "+",
      description: "Local areas benefiting from our services",
      color: "text-eco-accent"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "IT Manager, TechCorp SA",
      content: "Bantu The People handled our entire office upgrade e-waste. Professional, reliable, and their environmental impact reports helped us meet our sustainability goals.",
      avatar: "SM"
    },
    {
      name: "David Nkomo",
      role: "Environmental Coordinator",
      content: "As someone passionate about environmental conservation, I'm impressed by their transparent process and genuine commitment to reducing e-waste impact.",
      avatar: "DN"
    },
    {
      name: "Lisa Johnson",
      role: "Small Business Owner",
      content: "The pickup was seamless, and knowing my old computers are being recycled responsibly gives me peace of mind. Highly recommend their services!",
      avatar: "LJ"
    }
  ];

  return (
    <section id="impact-section" className="section-padding bg-gradient-to-br from-eco-primary/10 to-eco-blue/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 eco-gradient-text">
            Our Environmental Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every device we recycle contributes to a cleaner planet. See the real-time impact 
            of our community's commitment to responsible e-waste management.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {impactStats.map((stat, index) => (
            <Card key={index} className="glass-card text-center hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 bg-eco-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Visualization */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 eco-gradient-text">
            How We Make a Difference
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="glass-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-eco-primary/20 to-eco-blue/20" />
              <CardContent className="relative z-10 p-8 text-center">
                <div className="w-20 h-20 bg-eco-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-xl font-bold mb-4">Collection & Sorting</h4>
                <p className="text-muted-foreground">
                  We collect e-waste from homes and businesses, then professionally sort 
                  materials for optimal processing efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-eco-secondary/20 to-eco-accent/20" />
              <CardContent className="relative z-10 p-8 text-center">
                <div className="w-20 h-20 bg-eco-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-xl font-bold mb-4">Processing & Recovery</h4>
                <p className="text-muted-foreground">
                  Advanced disassembly techniques extract valuable materials and components 
                  while ensuring safe disposal of hazardous substances.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-eco-accent/20 to-eco-primary/20" />
              <CardContent className="relative z-10 p-8 text-center">
                <div className="w-20 h-20 bg-eco-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-xl font-bold mb-4">Reuse & Impact</h4>
                <p className="text-muted-foreground">
                  Recovered materials re-enter the supply chain, reducing mining needs 
                  and creating measurable environmental benefits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12 eco-gradient-text">
            What Our Community Says
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-eco-gradient rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
