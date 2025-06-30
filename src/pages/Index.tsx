
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
    <div className="min-h-screen bg-gray-900">
      <EnhancedAnimations />
      <Navigation />
      
      {/* Immersive Hero Section */}
      <section id="home">
        <ImmersiveHero />
      </section>
      
      <div className="animate-stagger">
        <ImageShowcase />
        <section id="calculator" className="animate-reveal">
          <EWasteCalculator />
        </section>
        <section id="services" className="animate-slide-left">
          <Services />
        </section>
        <div className="animate-slide-right">
          <GoogleMapsIntegration />
        </div>
        <div className="animate-reveal">
          <PayFastPricingPlans />
        </div>
        <section id="impact" className="animate-slide-left">
          <Impact />
        </section>
        <div className="animate-slide-right">
          <DonationForm />
        </div>
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
          },
        }}
      />
    </div>
  );
};

export default Index;
