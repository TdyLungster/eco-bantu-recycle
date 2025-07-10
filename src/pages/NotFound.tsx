import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* 404 Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* 404 Illustration */}
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="text-8xl lg:text-9xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  404
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-32 h-32 border-4 border-primary/20 rounded-full border-dashed"></div>
                </motion.div>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl lg:text-5xl font-bold text-foreground mb-6"
            >
              Page Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              Oops! It seems like this page has been recycled. 
              <br />
              Don't worry, we can help you find what you're looking for.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                to="/"
                className="inline-flex items-center space-x-2 bg-eco-gradient text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center space-x-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
            >
              <Link
                to="/#services"
                className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Our Services</h3>
                <p className="text-sm text-muted-foreground">Explore our e-waste recycling solutions</p>
              </Link>

              <Link
                to="/tools"
                className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Tools</h3>
                <p className="text-sm text-muted-foreground">Access our professional tools</p>
              </Link>

              <Link
                to="/blog"
                className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Blog</h3>
                <p className="text-sm text-muted-foreground">Read our latest insights</p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFound;