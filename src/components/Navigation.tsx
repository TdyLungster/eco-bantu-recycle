import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin, Recycle, Zap, Calculator, BookOpen, Wrench, User, LogIn, UserPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItems = [{
    name: 'Home',
    href: '/',
    icon: Recycle
  }, {
    name: 'Services',
    href: '#services',
    icon: Zap
  }, {
    name: 'Calculator',
    href: '#calculator',
    icon: Calculator
  }, {
    name: 'Impact',
    href: '#impact',
    icon: Recycle
  }, {
    name: 'Tools',
    href: '/tools',
    icon: Wrench
  }, {
    name: 'Blog',
    href: '/blog',
    icon: BookOpen
  }, {
    name: 'Contact',
    href: '#contact',
    icon: Phone
  }];
  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('#')) return false;
    return location.pathname === href;
  };
  const handleServiceClick = (href: string) => {
    if (href === '#services') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      } else {
        window.location.href = '/#contact';
      }
    } else if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    } else {
      window.location.href = href;
    }
  };
  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add logout logic here
  };
  return <>
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+27 11 234 5678</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@bantuthepeople.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Johannesburg, South Africa</span>
            </div>
          </div>
            <div className="flex items-center space-x-4">
            <span className="text-primary-foreground/80">🏆 ISO 14001 Certified</span>
            <span className="text-primary-foreground/80">♻️ 2,847+ Tonnes Recycled</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' : 'bg-white shadow-md'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img src="/lovable-uploads/5669cbba-ee2f-4fbb-9d50-e0722c45e5bd.png" alt="Bantu The People Logo" className="h-10 w-10 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">BANTU THE PEOPLE</h1>
                <p className="text-xs text-accent font-medium">E-WASTE RECYCLING EXPERTS</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map(item => <button key={item.name} onClick={() => handleServiceClick(item.href)} className={`group flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${isActive(item.href) ? 'text-primary bg-primary/10 font-semibold' : 'text-gray-700 hover:text-primary hover:bg-primary/5'}`}>
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                  <div className={`h-0.5 w-0 bg-primary transition-all group-hover:w-full ${isActive(item.href) ? 'w-full' : ''}`}></div>
                </button>)}
              
              {/* Auth Buttons */}
              <div className="flex items-center space-x-3">
                {isLoggedIn ? <div className="flex items-center space-x-3">
                    <motion.button className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors" whileHover={{
                  scale: 1.05
                }}>
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </motion.button>
                    <motion.button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors" whileHover={{
                  scale: 1.05
                }}>
                      Logout
                    </motion.button>
                  </div> : <>
                    <motion.button onClick={() => handleAuthClick('login')} className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors" whileHover={{
                  scale: 1.05
                }}>
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </motion.button>
                    <motion.button onClick={() => handleAuthClick('signup')} className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors" whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                      <UserPlus className="w-4 h-4" />
                      <span>Sign Up</span>
                    </motion.button>
                  </>}
              </div>
              
              <motion.button onClick={() => handleServiceClick('#contact')} className="btn-eco px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <div className="flex items-center space-x-2">
                  <Recycle className="w-4 h-4" />
                  <span>Book Pickup</span>
                </div>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-700 hover:text-primary transition-colors" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} className="lg:hidden py-4 border-t bg-white">
              <div className="space-y-2">
                {navItems.map(item => <button key={item.name} onClick={() => {
              handleServiceClick(item.href);
              setIsOpen(false);
            }} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all w-full text-left ${isActive(item.href) ? 'text-primary bg-primary/10 font-semibold' : 'text-gray-700 hover:text-primary hover:bg-primary/5'}`}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>)}
                
                <div className="px-4 pt-4 space-y-3">
                  {!isLoggedIn && <>
                      <button onClick={() => {
                  handleAuthClick('login');
                  setIsOpen(false);
                }} className="w-full flex items-center justify-center space-x-2 border border-primary text-primary py-3 rounded-full font-semibold">
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </button>
                      <button onClick={() => {
                  handleAuthClick('signup');
                  setIsOpen(false);
                }} className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-3 rounded-full font-semibold">
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </button>
                    </>}
                  <button onClick={() => {
                handleServiceClick('#contact');
                setIsOpen(false);
              }} className="w-full btn-eco py-3 rounded-full font-semibold shadow-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <Recycle className="w-4 h-4" />
                      <span>Book Pickup</span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>}
        </div>
      </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
    </>;
};
export default Navigation;