
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation,
  Star,
  Users,
  Truck,
  ArrowRight,
  Search
} from 'lucide-react';

const GoogleMapsIntegration = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const locations = [
    {
      id: 1,
      name: "Johannesburg Head Office",
      address: "123 Green Street, Sandton, Johannesburg, 2196",
      phone: "+27 11 234 5678",
      email: "jhb@bantuthepeople.co.za",
      hours: "Mon-Fri: 8:00-16:30, Sat: 8:00-12:00",
      services: ["Corporate Pickups", "Data Destruction", "Bulk Processing"],
      rating: 4.9,
      reviews: 127,
      coordinates: { lat: -26.1076, lng: 28.0567 }
    },
    {
      id: 2,
      name: "Cape Town Branch",
      address: "456 Ocean Drive, Green Point, Cape Town, 8001",
      phone: "+27 21 345 6789",
      email: "cpt@bantuthepeople.co.za",
      hours: "Mon-Fri: 8:00-16:30, Sat: 8:00-12:00",
      services: ["Individual Pickups", "SME Solutions", "Residential"],
      rating: 4.8,
      reviews: 89,
      coordinates: { lat: -33.9065, lng: 18.4107 }
    },
    {
      id: 3,
      name: "Durban Service Center",
      address: "789 Marine Parade, Durban, 4001",
      phone: "+27 31 456 7890",
      email: "dbn@bantuthepeople.co.za",
      hours: "Mon-Fri: 8:00-16:30",
      services: ["Manufacturing Pickups", "Educational Programs"],
      rating: 4.7,
      reviews: 64,
      coordinates: { lat: -29.8587, lng: 31.0218 }
    }
  ];

  const serviceAreas = [
    { city: "Johannesburg", coverage: "95%", pickups: "2,400+" },
    { city: "Cape Town", coverage: "88%", pickups: "1,850+" },
    { city: "Durban", coverage: "82%", pickups: "1,200+" },
    { city: "Pretoria", coverage: "90%", pickups: "1,650+" },
    { city: "Port Elizabeth", coverage: "75%", pickups: "890+" },
    { city: "Bloemfontein", coverage: "70%", pickups: "650+" }
  ];

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`User location: ${latitude}, ${longitude}`);
          // In a real app, you'd find the nearest location here
          alert(`We'll find our nearest service point to your location!`);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Please enable location services or enter your address manually.');
        }
      );
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Find Us <span className="text-eco-primary">Near You</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            With service centers across South Africa, we're never far away. 
            Find your nearest location for convenient e-waste recycling.
          </p>
        </motion.div>

        {/* Location Search */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter your city or postal code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-eco-primary outline-none"
              />
            </div>
            <motion.button
              className="bg-eco-primary text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-eco-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLocationRequest}
            >
              <Navigation className="w-4 h-4" />
              Use My Location
            </motion.button>
          </div>
        </div>

        {/* Service Coverage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceAreas.map((area, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-eco-primary/5 to-blue-50 rounded-xl p-6 border border-eco-primary/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{area.city}</h3>
                <span className="text-eco-primary font-bold">{area.coverage}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  {area.pickups} pickups
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2 mx-3">
                  <div 
                    className="bg-eco-primary h-2 rounded-full transition-all"
                    style={{ width: area.coverage }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Cards */}
          <div className="space-y-6">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all cursor-pointer ${
                  selectedLocation === index 
                    ? 'border-eco-primary shadow-xl' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setSelectedLocation(index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{location.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {location.rating} ({location.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <MapPin className="w-6 h-6 text-eco-primary" />
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <span className="text-gray-600 text-sm">{location.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 text-sm">{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 text-sm">{location.hours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Services Available:</h4>
                  <div className="flex flex-wrap gap-2">
                    {location.services.map((service, i) => (
                      <span key={i} className="bg-eco-primary/10 text-eco-primary px-2 py-1 rounded-full text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button 
                    className="flex-1 bg-eco-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-eco-primary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = '#contact';
                    }}
                  >
                    Book Pickup
                  </motion.button>
                  <motion.button 
                    className="flex-1 border border-eco-primary text-eco-primary py-2 px-4 rounded-lg text-sm font-medium hover:bg-eco-primary hover:text-white transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`tel:${location.phone}`);
                    }}
                  >
                    Call Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-gray-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Interactive Map</h3>
                <p className="text-gray-500 mb-4">
                  {locations[selectedLocation].name}
                </p>
                <motion.button 
                  className="bg-eco-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-eco-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const coords = locations[selectedLocation].coordinates;
                    window.open(`https://www.google.com/maps?q=${coords.lat},${coords.lng}`, '_blank');
                  }}
                >
                  View on Google Maps
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="text-center mt-12 bg-gradient-to-r from-eco-primary to-blue-600 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Don't See Your Area?</h3>
          <p className="mb-6">We're expanding our service network. Contact us to arrange pickup in your area.</p>
          <motion.button 
            className="bg-white text-eco-primary px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '#contact'}
          >
            Request Service Area <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleMapsIntegration;
