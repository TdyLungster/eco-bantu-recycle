
import { useEffect, useCallback, useRef } from 'react';

export const usePerformanceOptimization = () => {
  const rafId = useRef<number | null>(null);
  const timeoutIds = useRef<Set<number>>(new Set());

  // Optimized RAF for animations
  const requestFrame = useCallback((callback: () => void) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame(callback);
  }, []);

  // Debounced function creator
  const createDebounced = useCallback(<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): T => {
    let timeoutId: number;
    
    return ((...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => func(...args), delay);
      timeoutIds.current.add(timeoutId);
    }) as T;
  }, []);

  // Throttled function creator
  const createThrottled = useCallback(<T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): T => {
    let inThrottle: boolean;
    
    return ((...args: any[]) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  }, []);

  // Memory cleanup
  const cleanup = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    
    timeoutIds.current.forEach(id => clearTimeout(id));
    timeoutIds.current.clear();
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    requestFrame,
    createDebounced,
    createThrottled,
    cleanup
  };
};

// Performance monitoring hook
export const useWebVitals = () => {
  useEffect(() => {
    // Track page load performance
    const trackPageLoad = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart);
        console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.fetchStart);
      }
    };

    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad);
      return () => window.removeEventListener('load', trackPageLoad);
    }
  }, []);
};
