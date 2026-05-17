'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AmbientOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const orbs = containerRef.current.querySelectorAll('.ambient-orb');

    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: `random(-100, 100)`,
        y: `random(-80, 80)`,
        duration: 15 + i * 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 2,
      });
    });

    return () => {
      gsap.killTweensOf(orbs);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div
        className="ambient-orb absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.06), transparent 70%)',
          top: '10%',
          right: '-5%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="ambient-orb absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%)',
          bottom: '20%',
          left: '-5%',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="ambient-orb absolute w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.04), transparent 70%)',
          top: '50%',
          left: '40%',
          filter: 'blur(70px)',
        }}
      />
    </div>
  );
}
