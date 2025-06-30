
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

const GoogleMapsIntegration = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 1,
      name: "Bantu The People - Johannesburg Central",
      address: "123 Main Street, Johannesburg, 2000",
      phone: "+27 11 123 4567",
      hours: "Mon-Fri: 8AM-5PM, Sat: 8AM-2PM",
      lat: -26.2041,
      lng: 28.0473,
      services: ["E-waste Collection", "Data Destruction", "Corporate Pickup"]
    },
    {
      id: 2,
      name: "Drop-off Point - Sandton",
      address: "456 Rivonia Road, Sandton, 2146",
      phone: "+27 11 987 6543",
      hours: "Mon-Fri: 9AM-4PM",
      lat: -26.1076,
      lng: 28.0567,
      services: ["Drop-off Only", "Small Electronics"]
    },
    {
      id: 3,
      name: "Processing Center - Midrand",
      address: "789 Industrial Ave, Midrand, 1685",
      phone: "+27 11 456 7890",
      hours: "Mon-Fri: 7AM-4PM",
      lat: -25.9953,
      lng: 28.1294,
      services: ["Processing", "Corporate Services", "Bulk Collection"]
    }
  ];

  useEffect(() => {
    // Initialize Google Maps
    const initMap = () => {
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -26.1076, lng: 28.0567 },
        zoom: 11,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{ "weight": "2.00" }]
          },
          {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#9c9c9c" }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{ "visibility": "on" }]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{ "color": "#f2f2f2" }]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#e8f5e8" }]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{ "color": "#4a90e2" }, { "visibility": "on" }]
          }
        ]
      });

      // Add markers for each location
      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: {
            url: '/lovable-uploads/cfca449b-1492-49de-88ff-473dac53a963.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3">
              <h3 class="font-bold text-green-800">${location.name}</h3>
              <p class="text-sm text-gray-600 mt-1">${location.address}</p>
              <p class="text-sm text-gray-600 mt-1">📞 ${location.phone}</p>
              <p class="text-sm text-gray-600 mt-1">🕒 ${location.hours}</p>
              <div class="mt-2">
                <p class="text-xs font-semibold text-green-600">Services:</p>
                <p class="text-xs text-gray-500">${location.services.join(', ')}</p>
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          setSelectedLocation(location);
        });
      });
    };

    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Find Us Near You
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convenient drop-off locations and pickup services across Johannesburg
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Locations List */}
          <div className="lg:col-span-1 space-y-4">
            {locations.map((location) => (
              <motion.div
                key={location.id}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedLocation(location)}
              >
                <h3 className="font-bold text-green-800 mb-2">{location.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-green-600" />
                    <span>{location.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>{location.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>{location.phone}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-semibold text-green-600 mb-1">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {location.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div ref={mapRef} className="w-full h-96"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsIntegration;
