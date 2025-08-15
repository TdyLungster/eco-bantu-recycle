
import { memo, useEffect, useCallback } from 'react';
import { trackPerformance } from '@/lib/monitoring';

// Performance monitoring component
const PerformanceOptimizer = memo(() => {
  const measurePerformance = useCallback(() => {
    // Track Core Web Vitals
    if ('web-vital' in window) return;
    
    // Measure First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          trackPerformance('FCP', () => {
            console.log('FCP:', entry.startTime);
          });
        }
      }
    });
    
    observer.observe({ entryTypes: ['paint'] });

    // Measure Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      trackPerformance('LCP', () => {
        console.log('LCP:', lastEntry.startTime);
      });
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Cleanup observers
    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const cleanup = measurePerformance();
    return cleanup;
  }, [measurePerformance]);

  return null;
});

PerformanceOptimizer.displayName = 'PerformanceOptimizer';

export default PerformanceOptimizer;
