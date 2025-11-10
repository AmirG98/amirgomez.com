'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface GSAPParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  rotate?: boolean;
  scale?: boolean;
}

export default function GSAPParallax({
  children,
  className = '',
  speed = 0.5,
  rotate = false,
  scale = false
}: GSAPParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      if (elementRef.current) {
        const element = elementRef.current;

        // Parallax animation
        const animation: any = {
          y: -100 * speed,
          ease: 'none'
        };

        if (rotate) {
          animation.rotation = 15;
        }

        if (scale) {
          animation.scale = 1.1;
        }

        gsap.to(element, {
          ...animation,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });

        // Floating animation
        gsap.to(element, {
          y: '+=20',
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed, rotate, scale]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
