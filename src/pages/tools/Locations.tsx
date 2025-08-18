
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Navigation, ArrowLeft, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import { Link } from 'react-router-dom';

// Mock location data - in production, this would come from Firestore
const recyclingCenters = [
  {
    id: 1,
    name: "Green Tech Recycling Johannesburg",
    address: "123 Recycling Street, Johannesburg Central, 2000",
    city: "Johannesburg",
    province: "Gauteng",
    phone: "+27 11 123 4567",
    email: "info@greentech-jhb.co.za",
    website: "www.greentech.co.za",
    services: ["Computer Recycling", "Mobile Phones", "Servers", "Data Destruction"],
    hours: "Mon-Fri: 8AM-5PM, Sat: 8AM-2PM",
    certified: true,
    lat: -26.2041,
    lng: 28.0473,
    distance: "2.3 km"
  },
  {
    id: 2,
    name: "EcoWaste Solutions Cape Town",
    address: "456 Green Avenue, Cape Town CBD, 8000",
    city: "Cape Town",
    province: "Western Cape",
    phone: "+27 21 987 6543",
    email: "contact@ecowaste-ct.co.za",
    services: ["Laptop Recycling", "Tablets", "Printers", "Cables"],
    hours: "Mon-Fri: 7:30AM-4:30PM",
    certified: true,
    lat: -33.9249,
    lng: 18.4241,
    distance: "1.8 km"
  },
  {
    id: 3,
    name: "Digital Disposal Durban",
    address: "789 Waste Management Road, Durban North, 4000",
    city: "Durban",
    province: "KwaZulu-Natal",
    phone: "+27 31 555 0123",
    email: "hello@digitaldisposal.co.za",
    website: "www.digitaldisposal.co.za",
    services: ["TV Recycling", "Gaming Consoles", "Audio Equipment", "Batteries"],
    hours: "Mon-Fri: 8AM-4PM",
    certified: true,
    lat: -29.8587,
    lng: 31.0218,
    distance: "5.7 km"
  },
  {
    id: 4,
    name: "Recycle Right Pretoria",
    address: "321 Tech Park Drive, Pretoria East, 0181",
    city: "Pretoria",
    province: "Gauteng",
    phone: "+27 12 345 6789",
    email: "info@recycleright.co.za",
    services: ["All Electronics", "Corporate Pickups", "Data Wiping"],
    hours: "Mon-Fri: 8AM-5PM",
    certified: true,
    lat: -25.7479,
    lng: 28.2293,
    distance: "12.1 km"
  }
];

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [filteredCenters, setFilteredCenters] = useState(recyclingCenters);

  const provinces = ['All Provinces', ...Array.from(new Set(recyclingCenters.map(center => center.province)))];

  React.useEffect(() => {
    let filtered = recyclingCenters;

    if (searchTerm) {
      filtered = filtered.filter(center =>
        center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedProvince && selectedProvince !== 'All Provinces') {
      filtered = filtered.filter(center => center.province === selectedProvince);
    }

    setFilteredCenters(filtered);
  }, [searchTerm, selectedProvince]);

  const handleGetDirections = (center: typeof recyclingCenters[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <DarkNavigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Recycling <span className="text-green-400">Locations</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Find certified e-waste recycling centers near you
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by name, city, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              {provinces.map(province => (
                <option key={province} value={province === 'All Provinces' ? '' : province}>
                  {province}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-8 text-center">
                <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-lg mb-2">Interactive Map</h3>
                <p className="text-gray-400 mb-4">
                  Map integration will be available when Google Maps API key is configured
                </p>
                <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCenters.map((center, index) => (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-1">{center.name}</CardTitle>
                        <CardDescription className="text-gray-400 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {center.city}, {center.province}
                        </CardDescription>
                      </div>
                      {center.certified && (
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                          Certified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    {/* Address */}
                    <div className="text-gray-300 text-sm">
                      <p>{center.address}</p>
                      <p className="text-green-400 font-medium mt-1">{center.distance} away</p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300 text-sm">
                        <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{center.phone}</span>
                      </div>
                      {center.email && (
                        <div className="flex items-center text-gray-300 text-sm">
                          <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{center.email}</span>
                        </div>
                      )}
                      {center.website && (
                        <div className="flex items-center text-gray-300 text-sm">
                          <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{center.website}</span>
                        </div>
                      )}
                    </div>

                    {/* Hours */}
                    <div className="text-gray-300 text-sm">
                      <strong>Hours:</strong> {center.hours}
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="text-white font-medium mb-2 text-sm">Services:</h4>
                      <div className="flex flex-wrap gap-1">
                        {center.services.map((service, serviceIndex) => (
                          <Badge
                            key={serviceIndex}
                            variant="secondary"
                            className="bg-blue-600/20 text-blue-400 border-blue-600/30 text-xs"
                          >
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <Button
                        onClick={() => handleGetDirections(center)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 text-sm"
                      >
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No recycling centers found matching your criteria.</p>
            </div>
          )}

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Link to="/tools">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <DarkFooter />
    </div>
  );
};

export default Locations;
