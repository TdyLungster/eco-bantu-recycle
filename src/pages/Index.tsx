
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import DonationForm from '@/components/DonationForm';
import Impact from '@/components/Impact';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';
import EWasteCalculator from '@/components/EWasteCalculator';
import { Toaster } from 'react-hot-toast';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <EWasteCalculator />
      <Services />
      <Impact />
      <DonationForm />
      <Footer />
      <AIChat />
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
