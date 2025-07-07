
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Clock, Mail, Navigation, Car, Building, 
  CheckCircle, Star, Users, Truck, ArrowRight, Globe
} from 'lucide-react';

const EnhancedGoogleMaps = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const locations = [
    {
      id: 1,
      name: "Eco Bantu Recycle Head Office",
      address: "6246 Mocke Street, Daveyton, Benoni, 1507",
      phone: "+27 10 065 4785",
      email: "info@bantuthepeople.com",
      hours: "Mon-Fri: 8AM-5PM, Sat: 8AM-12PM",
      coordinates: { lat: -26.1833, lng: 28.3167 },
      features: ["Corporate Pickups", "Data Destruction", "24/7 Security"],
      capacity: "5000 devices/month",
      certifications: ["ISO 14001", "R2 Certified", "SANS 10462"]
    },
    {
      id: 2,
      name: "Cape Town Branch",
      address: "456 Green Tech Avenue, Century City, Cape Town, 7441",
      phone: "+27 21 987 6543",
      email: "capetown@ewasterecycling.co.za",
      hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-1PM",
      coordinates: { lat: -33.9249, lng: 18.4241 },
      features: ["Consumer Drop-off", "Corporate Partnerships", "Educational Tours"],
      capacity: "3500 devices/month",
      certifications: ["ISO 14001", "WEEE Compliant", "SABS Approved"]
    },
    {
      id: 3,
      name: "Durban Service Center",
      address: "789 Ocean Recycling Hub, Umhlanga, Durban, 4319",
      phone: "+27 31 456 7890",
      email: "durban@ewasterecycling.co.za",
      hours: "Mon-Fri: 8AM-4:30PM, Sat: 8AM-12PM",
      coordinates: { lat: -29.8587, lng: 31.0218 },
      features: ["Mobile Collection", "Schools Program", "SME Support"],
      capacity: "2800 devices/month",
      certifications: ["ISO 14001", "Local Authority Approved"]
    }
  ];

  const serviceAreas = [
    { province: "Gauteng", coverage: "100%", cities: ["Johannesburg", "Pretoria", "Germiston", "Benoni"] },
    { province: "Western Cape", coverage: "95%", cities: ["Cape Town", "Stellenbosch", "Paarl", "George"] },
    { province: "KwaZulu-Natal", coverage: "85%", cities: ["Durban", "Pietermaritzburg", "Newcastle"] },
    { province: "Eastern Cape", coverage: "70%", cities: ["Port Elizabeth", "East London", "Grahamstown"] }
  ];

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setIsMapLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Globe className="w-4 h-4" />
            Find Us Near You
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Nationwide <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Coverage</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From major cities to remote locations, we're expanding our reach to serve every corner of South Africa with world-class e-waste recycling services.
          </p>
        </motion.div>

        {/* Interactive Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Location Cards */}
          <div className="lg:col-span-1 space-y-4">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedLocation === index 
                    ? 'ring-2 ring-blue-500 shadow-xl scale-102' 
                    : 'shadow-lg hover:shadow-xl hover:scale-101'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedLocation(index)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{location.name}</h3>
                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>View on Map</span>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Active
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{location.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{location.hours}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-2">Monthly Capacity: {location.capacity}</div>
                  <div className="flex flex-wrap gap-1">
                    {location.certifications.map((cert, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Display */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden h-96 lg:h-full min-h-[500px]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {!isMapLoaded ? (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                  <div className="text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading interactive map...</p>
                  </div>
                </div>
              ) : (
                <div className="h-full relative">
                  {/* Map Placeholder with Location Details */}
                  <div className="h-full bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 p-8 flex flex-col justify-center">
                    <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h4 className="font-bold text-lg">{locations[selectedLocation].name}</h4>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span>{locations[selectedLocation].address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4 text-green-500" />
                          <span>Capacity: {locations[selectedLocation].capacity}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h5 className="font-semibold text-sm mb-2">Services Available:</h5>
                        <div className="flex flex-wrap gap-1">
                          {locations[selectedLocation].features.map((feature, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Get Directions
                      </button>
                    </div>
                  </div>
                  
                  {/* Quick Action Buttons */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <button className="bg-white shadow-lg rounded-lg p-3 hover:shadow-xl transition-shadow">
                      <Navigation className="w-5 h-5 text-blue-600" />
                    </button>
                    <button className="bg-white shadow-lg rounded-lg p-3 hover:shadow-xl transition-shadow">
                      <Car className="w-5 h-5 text-green-600" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Service Coverage Areas */}
        <motion.div 
          className="bg-white rounded-3xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Service Coverage Areas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceAreas.map((area, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{area.coverage}</div>
                  <h4 className="font-semibold text-gray-800">{area.province}</h4>
                </div>
                
                <div className="space-y-1">
                  {area.cities.map((city, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '#contact'}
            >
              Schedule Pickup <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedGoogleMaps;
