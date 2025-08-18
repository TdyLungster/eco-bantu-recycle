
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Search, Plus, Filter, ExternalLink, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import toast from 'react-hot-toast';

// Mock data - replace with Firestore integration
const mockDirectory = [
  {
    id: 1,
    name: "Green Tech Recycling",
    city: "Johannesburg",
    address: "123 Recycling Street, Johannesburg Central, 2000",
    phone: "+27 11 123 4567",
    email: "info@greentech.co.za",
    website: "www.greentech.co.za",
    services: ["Computer Recycling", "Mobile Phones", "Servers", "Data Destruction"],
    lat: -26.2041,
    lng: 28.0473,
    certified: true,
    hours: "Mon-Fri: 8AM-5PM, Sat: 8AM-2PM"
  },
  {
    id: 2,
    name: "Cape E-Waste Solutions",
    city: "Cape Town",
    address: "456 Green Avenue, Cape Town CBD, 8000",
    phone: "+27 21 987 6543",
    email: "contact@capewaste.co.za",
    website: "www.capewaste.co.za",
    services: ["Laptop Recycling", "Tablets", "Printers", "Cables"],
    lat: -33.9249,
    lng: 18.4241,
    certified: true,
    hours: "Mon-Fri: 7:30AM-4:30PM"
  },
  {
    id: 3,
    name: "Durban Digital Disposal",
    city: "Durban",
    address: "789 Waste Management Road, Durban North, 4000",
    phone: "+27 31 555 0123",
    email: "hello@durbandigital.co.za",
    website: "www.durbandigital.co.za",
    services: ["TV Recycling", "Gaming Consoles", "Audio Equipment", "Batteries"],
    lat: -29.8587,
    lng: 31.0218,
    certified: true,
    hours: "Mon-Fri: 8AM-4PM"
  }
];

const Directory = () => {
  const [directory, setDirectory] = useState(mockDirectory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [filteredDirectory, setFilteredDirectory] = useState(mockDirectory);

  const cities = ['All Cities', ...Array.from(new Set(directory.map(item => item.city)))];
  const allServices = Array.from(new Set(directory.flatMap(item => item.services)));

  useEffect(() => {
    let filtered = directory;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCity && selectedCity !== 'All Cities') {
      filtered = filtered.filter(item => item.city === selectedCity);
    }

    if (selectedService) {
      filtered = filtered.filter(item => item.services.includes(selectedService));
    }

    setFilteredDirectory(filtered);
  }, [searchTerm, selectedCity, selectedService, directory]);

  const handleAddCompany = () => {
    toast.success('Add Company feature coming soon!');
  };

  const handleContactCompany = (company: typeof mockDirectory[0]) => {
    if (company.email) {
      window.location.href = `mailto:${company.email}`;
    } else if (company.phone) {
      window.location.href = `tel:${company.phone}`;
    } else {
      toast.error('No contact information available');
    }
  };

  const handleVisitWebsite = (website: string) => {
    const url = website.startsWith('http') ? website : `https://${website}`;
    window.open(url, '_blank');
  };

  const handleGetDirections = (company: typeof mockDirectory[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${company.lat},${company.lng}`;
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              E-Waste <span className="text-green-400">Directory</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find certified e-waste recycling centers and service providers across South Africa.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
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
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              {cities.map(city => (
                <option key={city} value={city === 'All Cities' ? '' : city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              <option value="">All Services</option>
              {allServices.map(service => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Add Company Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end mb-8"
          >
            <Button 
              onClick={handleAddCompany}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your Company
            </Button>
          </motion.div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDirectory.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-1">
                          {company.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {company.city}
                        </CardDescription>
                      </div>
                      {company.certified && (
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                          Certified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    {/* Address */}
                    <div className="text-gray-300 text-sm">
                      <p>{company.address}</p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      {company.phone && (
                        <div className="flex items-center text-gray-300 text-sm">
                          <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{company.phone}</span>
                        </div>
                      )}
                      {company.email && (
                        <div className="flex items-center text-gray-300 text-sm">
                          <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{company.email}</span>
                        </div>
                      )}
                      {company.website && (
                        <div className="flex items-center text-gray-300 text-sm">
                          <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                          <button
                            onClick={() => handleVisitWebsite(company.website)}
                            className="text-green-400 hover:text-green-300 hover:underline"
                          >
                            {company.website}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Hours */}
                    {company.hours && (
                      <div className="text-gray-300 text-sm">
                        <strong>Hours:</strong> {company.hours}
                      </div>
                    )}

                    {/* Services */}
                    <div>
                      <h4 className="text-white font-medium mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-1">
                        {company.services.map((service, serviceIndex) => (
                          <Badge
                            key={serviceIndex}
                            variant="secondary"
                            className="bg-green-600/20 text-green-400 border-green-600/30 text-xs"
                          >
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <Button
                        onClick={() => handleContactCompany(company)}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm"
                      >
                        Contact
                      </Button>
                      <Button
                        onClick={() => handleGetDirections(company)}
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 text-sm"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredDirectory.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No companies found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </main>

      <DarkFooter />
    </div>
  );
};

export default Directory;
