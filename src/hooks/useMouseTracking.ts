
import { useEffect } from 'react';
import { MotionValue } from 'framer-motion';

export const useMouseTracking = (
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>,
  isMobile: boolean,
  setMousePosition: (position: { x: number; y: number }) => void
) => {
  useEffect(() => {
    if (isMobile) return; // Disable mouse tracking on mobile for performance
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight,
      });
      mouseX.set((clientX - innerWidth / 2) / 25);
      mouseY.set((clientY - innerHeight / 2) / 25);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile, setMousePosition]);
};
