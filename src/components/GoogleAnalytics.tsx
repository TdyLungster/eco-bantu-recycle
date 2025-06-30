
import { useEffect } from 'react';

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
      if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: window.location.pathname,
        });
      }
    };

    // Track custom events
    window.trackEvent = (eventName: string, parameters: any) => {
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
      }
    };

    trackPageView();

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return null;
};

export default GoogleAnalytics;
