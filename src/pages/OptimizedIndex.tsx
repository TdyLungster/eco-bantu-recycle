import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import DarkNavigation from '@/components/DarkNavigation';
import ImmersiveHero from '@/components/ImmersiveHero';
import OptimizedImageShowcase from '@/components/OptimizedImageShowcase';
import DarkFooter from '@/components/DarkFooter';
import AIChat from '@/components/AIChat';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import RealTimeCounter from '@/components/RealTimeCounter';
import { Toaster } from 'react-hot-toast';

// Lazy load heavy components for better performance
const Services = lazy(() => import('@/components/Services'));
const EWasteCalculator = lazy(() => import('@/components/EWasteCalculator'));
const EnhancedGoogleMaps = lazy(() => import('@/components/EnhancedGoogleMaps'));
const PayFastPricingPlans = lazy(() => import('@/components/PayFastPricingPlans'));
const DonationForm = lazy(() => import('@/components/DonationForm'));
const ImpactStory = lazy(() => import('@/components/ImpactStory'));
const TeamSection = lazy(() => import('@/components/TeamSection'));
const EnhancedAnimations = lazy(() => import('@/components/EnhancedAnimations'));

// Loading component for suspense
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const OptimizedIndex = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<div />}>
        <EnhancedAnimations />
      </Suspense>
      
      <DarkNavigation />
      
      {/* Hero Section */}
      <section id="home" className="relative">
        <ImmersiveHero />
      </section>
      
      {/* Main Content Sections */}
      <div className="space-y-0">
        {/* Showcase Section - Keep light background for images */}
        <section className="relative bg-white">
          <OptimizedImageShowcase />
        </section>
        
        {/* Calculator Section */}
        <section id="calculator" className="relative bg-gray-800 py-16 lg:py-24">
          <Suspense fallback={<SectionLoader />}>
            <EWasteCalculator />
          </Suspense>
        </section>
        
        {/* Services Section */}
        <section id="services" className="relative bg-gray-900 py-16 lg:py-24">
          <Suspense fallback={<SectionLoader />}>
            <Services />
          </Suspense>
        </section>
        
        {/* Real-Time Impact Counter */}
        <section className="relative bg-gray-800">
          <RealTimeCounter />
        </section>
        
        {/* Impact Story Section */}
        <section id="impact" className="relative bg-gray-900">
          <Suspense fallback={<SectionLoader />}>
            <ImpactStory />
          </Suspense>
        </section>
        
        {/* Team Section */}
        <section className="relative bg-gray-800">
          <Suspense fallback={<SectionLoader />}>
            <TeamSection />
          </Suspense>
        </section>
        
        {/* Enhanced Maps Integration */}
        <section className="relative bg-gray-900">
          <Suspense fallback={<SectionLoader />}>
            <EnhancedGoogleMaps />
          </Suspense>
        </section>
        
        {/* Pricing Plans */}
        <section className="relative bg-gray-800 py-16 lg:py-24">
          <Suspense fallback={<SectionLoader />}>
            <PayFastPricingPlans />
          </Suspense>
        </section>
        
        {/* Contact Form */}
        <section id="contact" className="relative bg-gray-900 py-16 lg:py-24">
          <Suspense fallback={<SectionLoader />}>
            <DonationForm />
          </Suspense>
        </section>
      </div>
      
      <DarkFooter />
      <AIChat />
      <WhatsAppWidget />
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgb(17 24 39)', // gray-900
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '600',
            border: '1px solid rgb(75 85 99)', // gray-600
          },
          success: {
            style: {
              background: 'rgb(5 46 22)', // green-900
              border: '1px solid rgb(34 197 94)', // green-500
            },
            iconTheme: {
              primary: '#22c55e', // green-500
              secondary: '#fff',
            },
          },
          error: {
            style: {
              background: 'rgb(127 29 29)', // red-900
              border: '1px solid rgb(239 68 68)', // red-500
            },
          },
        }}
      />
    </div>
  );
};

export default OptimizedIndex;
