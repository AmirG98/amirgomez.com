'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border border-border-default bg-surface-elevated transition-shadow duration-500 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -4,
        boxShadow: 'var(--shadow-lg)',
        borderColor: 'var(--border-hover)',
        transition: { duration: 0.3 },
      }}
    >
      {/* Spotlight gradient that follows cursor */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249,115,22,0.08), transparent 60%)`,
        }}
      />

      {/* Top gradient line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: 'linear-gradient(90deg, transparent, var(--brand-500), var(--accent), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-[1]">
        {children}
      </div>
    </motion.div>
  );
}
