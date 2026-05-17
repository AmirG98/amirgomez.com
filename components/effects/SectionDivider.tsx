interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'angle';
  flip?: boolean;
  className?: string;
  fill?: string;
}

export default function SectionDivider({
  variant = 'wave',
  flip = false,
  className = '',
  fill = 'var(--background)'
}: SectionDividerProps) {
  const paths = {
    wave: 'M0,64 C320,120 640,0 960,64 C1280,128 1440,32 1440,32 L1440,0 L0,0 Z',
    curve: 'M0,96 Q720,0 1440,96 L1440,0 L0,0 Z',
    angle: 'M0,64 L1440,0 L1440,0 L0,0 Z',
  };

  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
        fill={fill}
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  );
}
