'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button'
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "relative overflow-hidden font-semibold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 cursor-pointer";

  const variantClasses = {
    primary: "text-white shimmer-on-hover",
    secondary: "border-2 border-foreground/20 hover:bg-foreground/5 hover:border-brand-500/30",
    ghost: "hover:bg-foreground/5"
  };

  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4.5 text-lg"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <motion.button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || loading}
      style={variant === 'primary' ? {
        background: 'linear-gradient(135deg, var(--brand-500), var(--brand-600))',
      } : undefined}
      whileHover={{
        scale: disabled ? 1 : 1.05,
        boxShadow: variant === 'primary' ? 'var(--shadow-brand)' : undefined,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: disabled ? 1 : 0.97,
        transition: { duration: 0.1 }
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {/* Ripple effect background */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        animate={{
          scale: isPressed ? 1 : 0,
          opacity: isPressed ? 0.2 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Button content */}
      <motion.span
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
