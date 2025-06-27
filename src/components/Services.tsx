
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Camera, Settings, MapPin, Calendar, User } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "Corporate E-Waste Collection",
      description: "Comprehensive e-waste management for businesses. We handle everything from laptops to servers with certified data destruction.",
      features: ["Scheduled Pickups", "Data Destruction Certificates", "Environmental Reports", "Bulk Processing"]
    },
    {
      icon: User,
      title: "Individual Donations",
      description: "Drop off your personal electronics for responsible recycling. Every device makes a difference in our environmental mission.",
      features: ["Free Drop-off Service", "Same-day Processing", "Impact Tracking", "Donation Receipts"]
    },
    {
      icon: Settings,
      title: "Component Recovery",
      description: "Advanced material recovery from circuit boards, processors, and precious metals with 85% efficiency rate.",
      features: ["Precious Metal Recovery", "Component Refurbishment", "Material Sorting", "Quality Assurance"]
    }
  ];

  const ewasteTypes = [
    { name: "Laptops & Computers", image: "/lovable-uploads/b2fa359e-5a43-420a-856b-ee184a63e6b8.png" },
    { name: "Electronic Components", image: "/lovable-uploads/e87e99d6-08d5-4f73-8f9b-6c7f0921e5ad.png" },
    { name: "Mixed Electronics", image: "/lovable-uploads/116647c6-0b22-4ba1-9ef3-49ea15b9193a.png" }
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-br from-slate-50 to-eco-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 eco-gradient-text">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional e-waste recycling solutions designed to maximize environmental impact 
            while ensuring complete data security and regulatory compliance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className="glass-card hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 mx-auto mb-6 bg-eco-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                <CardDescription className="text-lg">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-eco-primary rounded-full mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full btn-eco">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* E-Waste Types We Process */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 eco-gradient-text">
            E-Waste We Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ewasteTypes.map((type, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={type.image} 
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-eco-gradient/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <h4 className="text-white text-xl font-bold text-center px-4">
                      {type.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Overview */}
        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-3xl font-bold text-center mb-8 eco-gradient-text">
            Our Recycling Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Collection", desc: "We collect your e-waste safely" },
              { step: "2", title: "Sorting", desc: "Professional categorization of materials" },
              { step: "3", title: "Processing", desc: "Advanced disassembly and recovery" },
              { step: "4", title: "Impact", desc: "Environmental benefits realized" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-eco-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
