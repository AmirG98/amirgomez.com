'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

interface ScrollNavbarProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export default function ScrollNavbar({ 
  children, 
  className = '',
  threshold = 100
}: ScrollNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Show/hide navbar based on scroll direction
    if (latest > previous && latest > threshold) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    // Background opacity based on scroll position
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={className}
      animate={{
        y: isHidden ? -100 : 0,
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)'
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut" 
      }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      <motion.div
        animate={{
          scale: isScrolled ? 0.98 : 1,
          paddingTop: isScrolled ? '0.5rem' : '0.75rem',
          paddingBottom: isScrolled ? '0.5rem' : '0.75rem'
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.nav>
  );
}