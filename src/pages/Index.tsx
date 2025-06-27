
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import DonationForm from '@/components/DonationForm';
import Impact from '@/components/Impact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Impact />
      <DonationForm />
      <Footer />
    </div>
  );
};

export default Index;
