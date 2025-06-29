
import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        const progress = (currentProgress / scrollHeight) * 100;
        setScrollProgress(progress);
        setIsVisible(currentProgress > 50); // Show after scrolling 50px
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 w-full h-1 bg-white/5 z-40 backdrop-blur-sm">
      <div 
        className="h-full bg-gradient-to-r from-white via-gray-300 to-white relative overflow-hidden transition-all duration-300 ease-out shadow-lg"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Shiny animation overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
        {/* Glowing effect */}
        <div className="absolute inset-0 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </div>
    </div>
  );
};

export default ScrollProgress;
