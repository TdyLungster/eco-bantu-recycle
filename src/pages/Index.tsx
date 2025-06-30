
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
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
import { Toaster } from 'react-hot-toast';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section id="home">
        <Hero />
      </section>
      <ImageShowcase />
      <section id="calculator">
        <EWasteCalculator />
      </section>
      <section id="services">
        <Services />
      </section>
      <GoogleMapsIntegration />
      <PayFastPricingPlans />
      <section id="impact">
        <Impact />
      </section>
      <DonationForm />
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
