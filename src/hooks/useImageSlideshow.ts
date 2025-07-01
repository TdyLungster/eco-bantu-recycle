
import { useEffect, useState } from 'react';

export const useImageSlideshow = (images: string[], interval: number = 4000) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(slideInterval);
  }, [images.length, interval]);

  return currentImageIndex;
};
