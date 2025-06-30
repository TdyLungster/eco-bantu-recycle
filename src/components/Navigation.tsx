
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-800 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>+27 XX XXX XXXX</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>info@bantuthepeople.co.za</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://wa.me/27XXXXXXXXX" target="_blank" rel="noopener noreferrer" 
               className="hover:text-green-300 transition-colors">
              📱 WhatsApp
            </a>
            <a href="#" className="hover:text-green-300 transition-colors">📘 Facebook</a>
            <a href="#" className="hover:text-green-300 transition-colors">📸 Instagram</a>
            <a href="#" className="hover:text-green-300 transition-colors">🐦 Twitter</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/5669cbba-ee2f-4fbb-9d50-e0722c45e5bd.png" 
                alt="Bantu The People Logo" 
                className="h-12 w-12"
              />
              <div>
                <h1 className="text-2xl font-bold text-green-800">BANTU THE PEOPLE</h1>
                <p className="text-sm text-blue-600">E-WASTE RECYCLING</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <motion.button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Pickup
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-full font-semibold">
                Book Pickup
              </button>
            </motion.div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
