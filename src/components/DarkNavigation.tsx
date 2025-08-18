
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Settings, Recycle, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import AuthModal from './ui/auth-modal';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const DarkNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_IN') {
        setIsAuthModalOpen(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Error signing out');
    }
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#calculator', label: 'Calculator' },
    { href: '#impact', label: 'Impact' },
    { href: '#contact', label: 'Contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        {/* Contact Info Bar */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>0100654785</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>rich@bantuthepeople.com</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <span className="text-green-100">🌍 Making South Africa Greener</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-6"
              whileHover={{ scale: 1.02 }}
            >
              {/* Main Company Logo */}
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/21466dcd-3bd2-480d-b01f-58a45152a7ba.png"
                  alt="Bantu The People - E-Waste Recycling"
                  className="w-12 h-12 object-contain"
                />
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-white">BANTU THE PEOPLE</h1>
                  <p className="text-xs text-green-400 -mt-1">Eco Recycle Solutions</p>
                </div>
              </div>

              {/* Partnership Logo */}
              <div className="hidden lg:flex items-center space-x-2">
                <span className="text-gray-400 text-sm">In partnership with</span>
                <img 
                  src="/lovable-uploads/de42c2f4-02a9-4424-b145-bafa3f71534e.png"
                  alt="eWASA - EPR Waste Association of South Africa"
                  className="w-20 h-10 object-contain bg-white rounded px-2"
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => openAuthModal('login')}
                    className="text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => openAuthModal('signup')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Partnership Logo Mobile */}
                <div className="flex items-center justify-center space-x-2 pb-4 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">In partnership with</span>
                  <img 
                    src="/lovable-uploads/de42c2f4-02a9-4424-b145-bafa3f71534e.png"
                    alt="eWASA - EPR Waste Association of South Africa"
                    className="w-16 h-8 object-contain bg-white rounded px-1"
                  />
                </div>

                {/* Navigation Links */}
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2 font-medium"
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Auth Buttons */}
                <div className="pt-4 border-t border-gray-700/50 space-y-3">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-300 py-2">
                        <User className="w-5 h-5" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        onClick={() => openAuthModal('login')}
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => openAuthModal('signup')}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default DarkNavigation;
