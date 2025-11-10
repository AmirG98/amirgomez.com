'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface CountUpNumberProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export default function CountUpNumber({ 
  from = 0,
  to,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  threshold = 0.1,
  once = true
}: CountUpNumberProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (value) => {
    // Handle different number formats
    if (to >= 1000000) {
      return `${prefix}${(value / 1000000).toFixed(1)}M${suffix}`;
    } else if (to >= 1000) {
      return `${prefix}${(value / 1000).toFixed(0)}K${suffix}`;
    } else if (to >= 100) {
      return `${prefix}${Math.round(value)}${suffix}`;
    } else {
      return `${prefix}${Math.round(value)}${suffix}`;
    }
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      });
      return controls.stop;
    }
  }, [isInView, count, to, duration, delay]);

  return (
    <motion.span
      ref={ref}
      className={className}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  );
}