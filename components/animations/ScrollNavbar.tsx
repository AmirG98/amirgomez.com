'use client';

import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
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
  const { scrollY, scrollYProgress } = useScroll();

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > threshold) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`${className} transition-colors duration-500`}
      animate={{
        y: isHidden ? -100 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? 'var(--surface-glass)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px) saturate(1.5)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(1.5)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] z-50"
        style={{
          width: progressWidth,
          background: 'linear-gradient(90deg, var(--brand-500), var(--accent), var(--brand-400))',
        }}
      />

      <motion.div
        animate={{
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
