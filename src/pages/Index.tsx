
import Navigation from '@/components/Navigation';
import ImmersiveHero from '@/components/ImmersiveHero';
import Services from '@/components/Services';
import EWasteCalculator from '@/components/EWasteCalculator';
import EnhancedGoogleMaps from '@/components/EnhancedGoogleMaps';
import PayFastPricingPlans from '@/components/PayFastPricingPlans';
import ImageShowcase from '@/components/ImageShowcase';
import DonationForm from '@/components/DonationForm';
import ImpactStory from '@/components/ImpactStory';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import EnhancedAnimations from '@/components/EnhancedAnimations';
import TeamSection from '@/components/TeamSection';
import RealTimeCounter from '@/components/RealTimeCounter';
import { Toaster } from 'react-hot-toast';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
        <section id="calculator" className="relative bg-muted/30 py-16 lg:py-24">
          <EWasteCalculator />
        </section>
        
        {/* Services Section */}
        <section id="services" className="relative bg-white py-16 lg:py-24">
          <Services />
        </section>
        
        {/* Real-Time Impact Counter */}
        <section className="relative">
          <RealTimeCounter />
        </section>
        
        {/* New Impact Story Section */}
        <section id="impact" className="relative">
          <ImpactStory />
        </section>
        
        {/* Team Section */}
        <section className="relative bg-white">
          <TeamSection />
        </section>
        
        {/* Enhanced Maps Integration */}
        <section className="relative">
          <EnhancedGoogleMaps />
        </section>
        
        {/* Pricing Plans */}
        <section className="relative bg-muted/30 py-16 lg:py-24">
          <PayFastPricingPlans />
        </section>
        
        {/* Contact Form */}
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
            fontWeight: '600',
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
