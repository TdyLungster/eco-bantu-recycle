
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Enhanced animation utilities
export const createStaggerAnimation = (selector: string, options = {}) => {
  return gsap.fromTo(
    selector,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      ...options,
    }
  );
};

export const createCounterAnimation = (selector: string, endValue: number) => {
  const obj = { count: 0 };
  return gsap.to(obj, {
    count: endValue,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = Math.round(obj.count).toLocaleString();
      }
    },
    scrollTrigger: {
      trigger: selector,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
};

export const createMorphAnimation = (selector: string) => {
  return gsap.timeline({ repeat: -1, yoyo: true })
    .to(selector, {
      scale: 1.1,
      rotation: 5,
      duration: 2,
      ease: "power2.inOut",
    })
    .to(selector, {
      scale: 0.9,
      rotation: -5,
      duration: 2,
      ease: "power2.inOut",
    });
};

export const createParallaxEffect = (selector: string, speed = 0.5) => {
  return gsap.to(selector, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: selector,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

export const createPulseAnimation = (selector: string) => {
  return gsap.timeline({ repeat: -1 })
    .to(selector, {
      scale: 1.05,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(selector, {
      scale: 1,
      duration: 1,
      ease: "power2.inOut",
    });
};

export const createSlideInAnimation = (selector: string, direction = 'left') => {
  const xValue = direction === 'left' ? -100 : 100;
  return gsap.fromTo(
    selector,
    { opacity: 0, x: xValue },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const createRevealAnimation = (selector: string) => {
  return gsap.fromTo(
    selector,
    { 
      clipPath: "inset(0 100% 0 0)",
      opacity: 0 
    },
    {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const createFloatingAnimation = (selector: string) => {
  return gsap.timeline({ repeat: -1 })
    .to(selector, {
      y: -20,
      rotation: 2,
      duration: 3,
      ease: "power1.inOut",
    })
    .to(selector, {
      y: 0,
      rotation: 0,
      duration: 3,
      ease: "power1.inOut",
    });
};

// Hook for initializing all animations
export const useEnhancedAnimations = () => {
  useEffect(() => {
    // Only animate elements that exist
    const checkAndAnimate = (selector: string, animationFn: Function, ...args: any[]) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        animationFn(selector, ...args);
      }
    };

    // Initialize common animations only if elements exist
    checkAndAnimate('.animate-stagger', createStaggerAnimation);
    checkAndAnimate('.animate-slide-left', createSlideInAnimation, 'left');
    checkAndAnimate('.animate-slide-right', createSlideInAnimation, 'right');
    checkAndAnimate('.animate-reveal', createRevealAnimation);
    checkAndAnimate('.animate-float', createFloatingAnimation);
    checkAndAnimate('.animate-pulse-custom', createPulseAnimation);

    // Initialize counter animations
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach((counter) => {
      const endValue = parseInt(counter.getAttribute('data-counter') || '0');
      if (counter.id) {
        createCounterAnimation(`#${counter.id}`, endValue);
      }
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

const EnhancedAnimations = () => {
  useEnhancedAnimations();
  return null;
};

export default EnhancedAnimations;
