
import { useEffect } from 'react';

// Extend Window interface to include gtag and trackEvent
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: any
    ) => void;
    dataLayer: any[];
    trackEvent: (eventName: string, parameters: any) => void;
  }
}

const GoogleAnalytics = () => {
  useEffect(() => {
    // Google Analytics 4 tracking
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `;
    document.head.appendChild(script2);

    // Track page views
    const trackPageView = () => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: window.location.pathname,
        });
      }
    };

    // Track custom events
    window.trackEvent = (eventName: string, parameters: any) => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', eventName, parameters);
      }
    };

    trackPageView();

    return () => {
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
      if (document.head.contains(script2)) {
        document.head.removeChild(script2);
      }
    };
  }, []);

  return null;
};

export default GoogleAnalytics;
