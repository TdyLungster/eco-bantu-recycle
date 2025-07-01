
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Clock, Navigation, Star, Award, 
  Truck, Recycle, Shield, Users, Calendar, ArrowRight
} from 'lucide-react';

const EnhancedGoogleMaps = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [showScheduler, setShowScheduler] = useState(false);

  const locations = [
    {
      id: 1,
      name: "Johannesburg Hub",
      address: "123 Recycling Street, Sandton, Johannesburg",
      phone: "+27 11 123 4567",
      hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-2PM",
      services: ["Corporate Pickup", "Data Destruction", "Bulk Recycling"],
      rating: 4.9,
      coordinates: { lat: -26.1043, lng: 28.0436 },
      image: "/lovable-uploads/116647c6-0b22-4ba1-9ef3-49ea15b9193a.png"
    },
    {
      id: 2,
      name: "Cape Town Center",
      address: "456 Green Tech Avenue, Century City, Cape Town",
      phone: "+27 21 987 6543",
      hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-2PM",
      services: ["Individual Drop-off", "Corporate Pickup", "Certified Destruction"],
      rating: 4.8,
      coordinates: { lat: -33.9249, lng: 18.4241 },
      image: "/lovable-uploads/1d597c1b-c8b7-4bea-a6c4-25070f1172ab.png"
    },
    {
      id: 3,
      name: "Durban Facility",
      address: "789 Eco Park Road, Umhlanga, Durban",
      phone: "+27 31 456 7890",
      hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-1PM",
      services: ["Marine Electronics", "Industrial Equipment", "Data Centers"],
      rating: 4.7,
      coordinates: { lat: -29.8587, lng: 31.0218 },
      image: "/lovable-uploads/269a5861-5dc9-43bf-9d22-c739472e118b.png"
    }
  ];

  const stats = [
    { icon: Truck, label: "Free Pickups", value: "2,847" },
    { icon: Users, label: "Happy Clients", value: "1,200+" },
    { icon: Award, label: "Industry Awards", value: "15" },
    { icon: Shield, label: "Security Rating", value: "100%" }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Find Us <span className="bg-gradient-to-r from-eco-primary to-eco-blue bg-clip-text text-transparent">Anywhere</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            With strategically located facilities across South Africa, we're always close by 
            to provide world-class e-waste recycling services.
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <stat.icon className="w-10 h-10 text-eco-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Cards */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Locations</h3>
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 cursor-pointer transition-all ${
                  selectedLocation === index 
                    ? 'border-eco-primary shadow-xl scale-105' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setSelectedLocation(index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h4>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(location.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-gray-700">{location.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-eco-primary mt-0.5 flex-shrink-0" />
                    <span>{location.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-eco-primary" />
                    <span className="font-semibold">{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-eco-primary" />
                    <span>{location.hours}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Services:</div>
                  <div className="flex flex-wrap gap-2">
                    {location.services.map((service, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-eco-primary/10 text-eco-primary text-xs font-semibold rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map and Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Interactive Map Placeholder */}
              <div className="h-80 bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Navigation className="w-16 h-16 text-eco-primary mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">
                      {locations[selectedLocation].name}
                    </h4>
                    <p className="text-gray-600 max-w-md">
                      Interactive map integration available. Click "Get Directions" for live navigation.
                    </p>
                  </div>
                </div>
                
                {/* Map overlay with location marker */}
                <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg">
                  <MapPin className="w-6 h-6 text-eco-primary" />
                </div>
              </div>

              {/* Location Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <motion.button 
                        className="w-full bg-eco-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-eco-primary/90 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.open(`https://maps.google.com/?q=${locations[selectedLocation].coordinates.lat},${locations[selectedLocation].coordinates.lng}`, '_blank')}
                      >
                        <Navigation className="w-5 h-5" />
                        Get Directions
                      </motion.button>
                      <motion.button 
                        className="w-full border-2 border-eco-primary text-eco-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-eco-primary hover:text-white transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.location.href = `tel:${locations[selectedLocation].phone}`}
                      >
                        <Phone className="w-5 h-5" />
                        Call Now
                      </motion.button>
                      <motion.button 
                        className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowScheduler(true)}
                      >
                        <Calendar className="w-5 h-5" />
                        Schedule Pickup
                      </motion.button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Why Choose This Location?</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Recycle className="w-5 h-5 text-eco-primary" />
                        <span className="text-sm text-gray-700">State-of-the-art recycling facility</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-eco-primary" />
                        <span className="text-sm text-gray-700">Certified data destruction services</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-eco-primary" />
                        <span className="text-sm text-gray-700">Free pickup for bulk items</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-eco-primary" />
                        <span className="text-sm text-gray-700">ISO 14001 & R2 certified processes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Scheduler Modal */}
        {showScheduler && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Schedule Free Pickup</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eco-primary outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eco-primary outline-none"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eco-primary outline-none"
                />
                <textarea 
                  placeholder="Describe your e-waste items..."
                  rows={3}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eco-primary outline-none resize-none"
                />
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowScheduler(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setShowScheduler(false);
                      alert('Pickup scheduled! We\'ll contact you within 24 hours.');
                    }}
                    className="flex-1 bg-eco-primary text-white py-3 rounded-xl font-semibold hover:bg-eco-primary/90 transition-colors"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 bg-gradient-to-r from-eco-primary to-eco-blue rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
          <p className="text-xl mb-6 opacity-90">
            We provide tailored e-waste management for enterprises, data centers, and large organizations.
          </p>
          <motion.button 
            className="bg-white text-eco-primary px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 mx-auto hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '#contact'}
          >
            Contact Enterprise Team <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedGoogleMaps;
