
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, User, Mail, Phone, Globe, Recycle, Leaf, Shield } from 'lucide-react';

const DarkFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: Mail, href: 'mailto:info@bantuthepeople.co.za', label: 'Email' },
    { icon: Phone, href: 'tel:+27123456789', label: 'Phone' },
    { icon: Globe, href: '#', label: 'Website' }
  ];

  const services = [
    'Corporate E-Waste Collection',
    'Individual Device Donations',
    'Secure Data Destruction',
    'Material Recovery & Recycling',
    'Environmental Impact Reporting',
    'CSR Partnership Programs'
  ];

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Impact Calculator', href: '#calculator' },
    { label: 'Environmental Impact', href: '#impact' },
    { label: 'Get Started', href: '#contact' }
  ];

  const certifications = [
    { icon: Shield, text: 'ISO 14001 Certified' },
    { icon: Leaf, text: 'Carbon Neutral Operations' },
    { icon: Recycle, text: 'Zero Landfill Policy' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Recycle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    BANTU THE PEOPLE
                  </h3>
                  <p className="text-green-400 text-sm font-medium">
                    Eco Recycle Solutions
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Leading South Africa's sustainable e-waste recycling revolution. 
                Together, we're building a cleaner, greener future for our communities 
                through innovative recycling solutions.
              </p>

              {/* Certifications */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
                  Our Commitments
                </h4>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2 text-gray-400"
                    >
                      <cert.icon className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{cert.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 bg-gray-800/50 hover:bg-gradient-to-br hover:from-green-500 hover:to-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-green-400/50"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a 
                    href="#services" 
                    className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-sm leading-relaxed hover:translate-x-1 transform transition-transform"
                  >
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200 text-sm hover:translate-x-1 transform transition-transform"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-400 text-sm">
                    <p>Johannesburg</p>
                    <p>South Africa</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">+27 XX XXX XXXX</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">Mon-Fri: 8AM-5PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-700/50 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Bantu The People. All rights reserved. • Built with 💚 for the planet
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Environmental Impact</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default DarkFooter;
