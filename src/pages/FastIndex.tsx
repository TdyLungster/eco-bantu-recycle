
import React, { Suspense, lazy } from 'react';
import DarkNavigation from '@/components/DarkNavigation';
import FastHero from '@/components/FastHero';
import FastImageShowcase from '@/components/FastImageShowcase';
import DarkFooter from '@/components/DarkFooter';
import AIChat from '@/components/AIChat';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import RealTimeCounter from '@/components/RealTimeCounter';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';
import { Toaster } from 'react-hot-toast';

// Aggressive lazy loading with better error boundaries
const Services = lazy(() => 
  import('@/components/Services').catch(() => ({
    default: () => <div className="py-20 text-center text-white">Service temporarily unavailable</div>
  }))
);

const EWasteCalculator = lazy(() => 
  import('@/components/EWasteCalculator').catch(() => ({
    default: () => <div className="py-20 text-center text-white">Calculator temporarily unavailable</div>
  }))
);

const EnhancedGoogleMaps = lazy(() => 
  import('@/components/EnhancedGoogleMaps').catch(() => ({
    default: () => <div className="py-20 text-center text-white">Map temporarily unavailable</div>
  }))
);

const PayFastPricingPlans = lazy(() => 
  import('@/components/PayFastPricingPlans').catch(() => ({
    default: () => <div className="py-20 text-center text-white">Pricing temporarily unavailable</div>
  }))
);

const DonationForm = lazy(() => 
  import('@/components/DonationForm').catch(() => ({
    default: () => <div className="py-20 text-center text-white">Contact form temporarily unavailable</div>
  }))
);

const ImpactStory = lazy(() => 
  import('@/components/ImpactStory').catch(() => ({
    default: () => <div className="py-20 text-center text-white">Impact story temporarily unavailable</div>
  }))
);

const TeamSection = lazy(() => 
  import('@/components/TeamSection').catch(() => ({
    default: () => <div className="py-20 text-center text-white">Team section temporarily unavailable</div>
  }))
);

// Optimized loading component
const FastLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const FastIndex = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <PerformanceOptimizer />
      <DarkNavigation />
      
      {/* Hero Section */}
      <section id="home" className="relative">
        <FastHero />
      </section>
      
      {/* Main Content - Optimized loading strategy */}
      <div className="space-y-0">
        {/* Showcase Section - Load immediately */}
        <section className="relative bg-white">
          <FastImageShowcase />
        </section>
        
        {/* Calculator Section - Load on demand */}
        <section id="calculator" className="relative bg-gray-800 py-16 lg:py-24">
          <Suspense fallback={<FastLoader />}>
            <EWasteCalculator />
          </Suspense>
        </section>
        
        {/* Services Section - Critical, load on demand */}
        <section id="services" className="relative bg-gray-900 py-16 lg:py-24">
          <Suspense fallback={<FastLoader />}>
            <Services />
          </Suspense>
        </section>
        
        {/* Real-Time Counter - Load immediately for engagement */}
        <section className="relative bg-gray-800">
          <RealTimeCounter />
        </section>
        
        {/* Impact Story - Load on demand */}
        <section id="impact" className="relative bg-gray-900">
          <Suspense fallback={<FastLoader />}>
            <ImpactStory />
          </Suspense>
        </section>
        
        {/* Team Section - Load on demand */}
        <section className="relative bg-gray-800">
          <Suspense fallback={<FastLoader />}>
            <TeamSection />
          </Suspense>
        </section>
        
        {/* Maps - Load on demand */}
        <section className="relative bg-gray-900">
          <Suspense fallback={<FastLoader />}>
            <EnhancedGoogleMaps />
          </Suspense>
        </section>
        
        {/* Pricing - Load on demand */}
        <section className="relative bg-gray-800 py-16 lg:py-24">
          <Suspense fallback={<FastLoader />}>
            <PayFastPricingPlans />
          </Suspense>
        </section>
        
        {/* Contact Form - Load on demand */}
        <section id="contact" className="relative bg-gray-900 py-16 lg:py-24">
          <Suspense fallback={<FastLoader />}>
            <DonationForm />
          </Suspense>
        </section>
      </div>
      
      <DarkFooter />
      <AIChat />
      <WhatsAppWidget />
      
      {/* Optimized Toast Configuration */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000, // Reduced duration
          style: {
            background: 'rgb(17 24 39)',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: '500',
            border: '1px solid rgb(75 85 99)',
          },
          success: {
            style: {
              background: 'rgb(5 46 22)',
              border: '1px solid rgb(34 197 94)',
            },
          },
          error: {
            style: {
              background: 'rgb(127 29 29)',
              border: '1px solid rgb(239 68 68)',
            },
          },
        }}
      />
    </div>
  );
};

export default FastIndex;
