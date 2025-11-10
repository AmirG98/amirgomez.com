'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function HeroTextReveal({ children, className = '', delay = 0 }: HeroTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      const text = containerRef.current.textContent || '';
      const words = text.split(' ');

      // Clear the container
      containerRef.current.innerHTML = '';

      // Create spans for each word
      words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.overflow = 'hidden';
        wordSpan.style.marginRight = '0.3em';

        const innerSpan = document.createElement('span');
        innerSpan.textContent = word;
        innerSpan.style.display = 'inline-block';
        innerSpan.className = 'word-inner';

        wordSpan.appendChild(innerSpan);
        containerRef.current?.appendChild(wordSpan);
      });

      // Animate words
      const wordInners = containerRef.current.querySelectorAll('.word-inner');

      gsap.set(wordInners, {
        y: 100,
        opacity: 0,
        rotationX: -90
      });

      gsap.to(wordInners, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
        delay: delay
      });
    }
  }, [delay]);

  return (
    <div ref={containerRef} className={className} style={{ perspective: '1000px' }}>
      {children}
    </div>
  );
}
