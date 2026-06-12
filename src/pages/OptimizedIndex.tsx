
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
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const PartnersBar = lazy(() => import("@/components/PartnersBar"));
const InlineEmailCapture = lazy(() => import("@/components/InlineEmailCapture"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));
const BackToTop = lazy(() => import("@/components/BackToTop"));

const SectionLoader = () => (
  <div className="min-h-[200px] bg-gray-900 animate-pulse flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const OptimizedIndex = () => {
  return (
    <>
      <Helmet>
        <title>BANTU THE PEOPLE - South Africa's #1 E-Waste Recyclers</title>
        <meta name="description" content="Free pickup. POPIA-certified data destruction. NEMWA-compliant certificates. 2,000+ companies served. GreenCert Pro compliance software now available." />
        <meta name="keywords" content="e-waste recycling, electronic waste, Johannesburg, South Africa, data destruction, POPIA compliance, NEMWA, GreenCert Pro" />
        <meta property="og:title" content="BANTU THE PEOPLE - South Africa's #1 E-Waste Recyclers" />
        <meta property="og:description" content="Free pickup. POPIA-certified data destruction. NEMWA-compliant certificates. 2,000+ companies served." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bantuthepeople.co.za" />
        <meta property="og:image" content="https://bantuthepeople.co.za/lovable-uploads/1d597c1b-c8b7-4bea-a6c4-25070f1172ab.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://bantuthepeople.co.za" />
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

          <Suspense fallback={null}>
            <PartnersBar />
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
            <InlineEmailCapture />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <section className="animate-stagger">
              <Impact />
            </section>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ReviewsSection />
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

        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>

        <Suspense fallback={null}>
          <ExitIntentPopup />
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
