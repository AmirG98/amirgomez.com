'use client';

import { motion } from 'framer-motion';

interface HoverLiftProps {
  children: React.ReactNode;
  scale?: number;
  lift?: number;
  className?: string;
  disabled?: boolean;
}

export default function HoverLift({ 
  children, 
  scale = 1.02,
  lift = -5,
  className = '',
  disabled = false
}: HoverLiftProps) {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale,
        y: lift,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: scale * 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.div>
  );
}