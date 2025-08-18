
import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import DarkNavigation from "@/components/DarkNavigation";
import DarkFooter from "@/components/DarkFooter";
import EnhancedAnimations from "@/components/EnhancedAnimations";
import { Toaster } from "react-hot-toast";

// Lazy load components for better performance
const ImmersiveHero = lazy(() => import("@/components/ImmersiveHero"));
const OptimizedImageShowcase = lazy(() => import("@/components/OptimizedImageShowcase"));
const PayFastPricingPlans = lazy(() => import("@/components/PayFastPricingPlans"));
const Services = lazy(() => import("@/components/Services"));
const Impact = lazy(() => import("@/components/Impact"));
const TeamSection = lazy(() => import("@/components/TeamSection"));
const WhatsAppWidget = lazy(() => import("@/components/WhatsAppWidget"));

// Loading component
const SectionLoader = () => (
  <div className="min-h-[200px] bg-gray-100 animate-pulse flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const OptimizedIndex = () => {
  return (
    <>
      <Helmet>
        <title>BANTU THE PEOPLE - Professional E-Waste Recycling in South Africa</title>
        <meta name="description" content="Transform your old electronics into environmental impact. Professional e-waste recycling services in Johannesburg. Free pickup, data destruction, and compliance reporting." />
        <meta name="keywords" content="e-waste recycling, electronic waste, Johannesburg, South Africa, data destruction, environmental impact, electronic recycling" />
        <meta property="og:title" content="BANTU THE PEOPLE - E-Waste Recycling Solutions" />
        <meta property="og:description" content="Professional e-waste recycling services in South Africa. Free pickup and secure data destruction." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://bantuthepeople.com" />
      </Helmet>

      <div className="min-h-screen bg-gray-900">
        <EnhancedAnimations />
        <DarkNavigation />
        
        <main>
          <Suspense fallback={<SectionLoader />}>
            <section className="animate-stagger">
              <ImmersiveHero />
            </section>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <section className="animate-slide-left">
              <OptimizedImageShowcase />
            </section>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <section className="animate-reveal">
              <PayFastPricingPlans />
            </section>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <section className="animate-slide-right">
              <Services />
            </section>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <section className="animate-stagger">
              <Impact />
            </section>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <section className="animate-float">
              <TeamSection />
            </section>
          </Suspense>
        </main>

        <DarkFooter />
        
        <Suspense fallback={null}>
          <WhatsAppWidget />
        </Suspense>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#fff',
              borderRadius: '8px',
            },
          }}
        />
      </div>
    </>
  );
};

export default OptimizedIndex;
