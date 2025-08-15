
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Card } from './card';
import { supabase } from '@/integrations/supabase/client';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'login' 
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              phone: formData.phone
            }
          }
        });
        
        if (error) throw error;
        toast.success('Check your email to confirm your account!');
        onClose();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        
        if (error) throw error;
        toast.success('Welcome back!');
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', duration: 0.3, bounce: 0.25 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const formVariants = {
    hidden: { x: mode === 'login' ? -20 : 20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-md mx-4"
        >
          <Card className="bg-gray-900/95 border-gray-700/50 shadow-2xl backdrop-blur-md">
            <div className="relative p-8">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {mode === 'login' ? 'Welcome Back' : 'Join Us'}
                  </h2>
                  <p className="text-gray-400">
                    {mode === 'login' 
                      ? 'Sign in to your account to continue'
                      : 'Create an account to get started'
                    }
                  </p>
                </motion.div>
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={mode}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="text"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 transition-colors"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 transition-colors"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-12 pr-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 transition-colors"
                      required
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                      </div>
                    ) : (
                      mode === 'login' ? 'Sign In' : 'Create Account'
                    )}
                  </Button>
                </motion.form>
              </AnimatePresence>

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <Button
                    variant="link"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="text-green-400 hover:text-green-300 ml-1 p-0 h-auto font-medium"
                  >
                    {mode === 'login' ? 'Sign Up' : 'Sign In'}
                  </Button>
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
