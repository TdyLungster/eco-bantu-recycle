
import { MapPin, Calendar, User, Settings } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-eco-primary to-eco-blue text-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              BANTU THE PEOPLE
            </h3>
            <p className="text-eco-light text-lg mb-6 max-w-md">
              Leading South Africa's sustainable e-waste recycling revolution. 
              Together, we're building a cleaner, greener future for our communities.
            </p>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-xl">📧</span>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-xl">📱</span>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-xl">🌐</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-eco-light hover:text-white transition-colors">Corporate Collection</a></li>
              <li><a href="#" className="text-eco-light hover:text-white transition-colors">Individual Donations</a></li>
              <li><a href="#" className="text-eco-light hover:text-white transition-colors">Data Destruction</a></li>
              <li><a href="#" className="text-eco-light hover:text-white transition-colors">Material Recovery</a></li>
              <li><a href="#" className="text-eco-light hover:text-white transition-colors">Impact Reporting</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-eco-light mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-eco-light">Johannesburg</p>
                  <p className="text-eco-light">South Africa</p>
                </div>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 text-eco-light mr-3" />
                <p className="text-eco-light">+27 XX XXX XXXX</p>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-eco-light mr-3" />
                <p className="text-eco-light">Mon-Fri: 8AM-5PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-eco-light text-sm mb-4 md:mb-0">
              © {currentYear} Bantu The People. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-eco-light hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-eco-light hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-eco-light hover:text-white transition-colors">Environmental Impact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
