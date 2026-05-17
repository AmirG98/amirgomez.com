'use client';

interface MeshGradientProps {
  className?: string;
}

export default function MeshGradient({ className = '' }: MeshGradientProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Animated mesh gradient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, var(--brand-400), transparent 70%)',
          top: '-10%',
          right: '-5%',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, var(--accent), transparent 70%)',
          bottom: '-15%',
          left: '-10%',
          animation: 'float 10s ease-in-out infinite 2s',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, var(--brand-500), transparent 70%)',
          top: '40%',
          left: '30%',
          animation: 'float 12s ease-in-out infinite 4s',
        }}
      />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40" />
    </div>
  );
}
