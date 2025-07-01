
import Navigation from '@/components/Navigation';
import ImmersiveHero from '@/components/ImmersiveHero';
import Services from '@/components/Services';
import EWasteCalculator from '@/components/EWasteCalculator';
import GoogleMapsIntegration from '@/components/GoogleMapsIntegration';
import PayFastPricingPlans from '@/components/PayFastPricingPlans';
import ImageShowcase from '@/components/ImageShowcase';
import DonationForm from '@/components/DonationForm';
import Impact from '@/components/Impact';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import EnhancedAnimations from '@/components/EnhancedAnimations';
import { Toaster } from 'react-hot-toast';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedAnimations />
      <Navigation />
      
      {/* Immersive Hero Section */}
      <section id="home" className="relative">
        <ImmersiveHero />
      </section>
      
      {/* Main Content Sections */}
      <div className="space-y-0">
        {/* Showcase Section */}
        <section className="relative bg-white">
          <ImageShowcase />
        </section>
        
        {/* Calculator Section */}
        <section id="calculator" className="relative bg-gray-50 py-16 lg:py-24">
          <EWasteCalculator />
        </section>
        
        {/* Services Section */}
        <section id="services" className="relative bg-white py-16 lg:py-24">
          <Services />
        </section>
        
        {/* Impact Section */}
        <section id="impact" className="relative bg-gray-50 py-16 lg:py-24">
          <Impact />
        </section>
        
        {/* Maps Integration */}
        <section className="relative bg-white">
          <GoogleMapsIntegration />
        </section>
        
        {/* Pricing Plans */}
        <section className="relative bg-gray-50 py-16 lg:py-24">
          <PayFastPricingPlans />
        </section>
        
        {/* Donation Form */}
        <section id="contact" className="relative bg-white py-16 lg:py-24">
          <DonationForm />
        </section>
      </div>
      
      <Footer />
      <AIChat />
      <WhatsAppWidget />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1B7A3E',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#1B7A3E',
            },
          },
          error: {
            style: {
              background: '#EF4444',
            },
          },
        }}
      />
    </div>
  );
};

export default Index;
