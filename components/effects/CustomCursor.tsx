'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const matchFine = window.matchMedia('(pointer: fine)');
    setIsFinePointer(matchFine.matches);
    if (!matchFine.matches) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

    const addHoverListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach(el => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      observer.disconnect();
      document.querySelectorAll(interactiveSelector).forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  if (!isFinePointer) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: isHovering ? 48 : 12,
          height: isHovering ? 48 : 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: 'spring', stiffness: 400, damping: 30 },
          height: { type: 'spring', stiffness: 400, damping: 30 },
          opacity: { duration: 0.15 },
        }}
      />
    </motion.div>
  );
}
