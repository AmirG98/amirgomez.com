'use client';

import { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
      hue: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const count = Math.min(80, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() * 40 + 15, // orange-amber range
      });
    }

    let time = 0;

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw aurora-like gradient waves
      for (let i = 0; i < 3; i++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        const shift = time * (0.5 + i * 0.3);

        gradient.addColorStop(0, `hsla(${25 + Math.sin(shift) * 15}, 95%, 55%, ${0.03 - i * 0.008})`);
        gradient.addColorStop(0.3 + Math.sin(shift + 1) * 0.2, `hsla(${35 + Math.cos(shift) * 20}, 90%, 50%, ${0.06 - i * 0.015})`);
        gradient.addColorStop(0.6 + Math.cos(shift + 2) * 0.15, `hsla(${15 + Math.sin(shift + 3) * 10}, 95%, 45%, ${0.04 - i * 0.01})`);
        gradient.addColorStop(1, `hsla(${30 + Math.cos(shift + 1) * 15}, 85%, 60%, ${0.02})`);

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (let x = 0; x <= canvas.width; x += 4) {
          const wave1 = Math.sin(x * 0.002 + shift + i) * 120;
          const wave2 = Math.cos(x * 0.001 + shift * 1.5 + i * 2) * 80;
          const wave3 = Math.sin(x * 0.003 + shift * 0.7) * 40;
          const y = canvas.height * (0.3 + i * 0.15) + wave1 + wave2 + wave3;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      // Draw and connect particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        const pulse = Math.sin(time * 2 + idx) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.opacity * pulse})`;
        ctx.fill();

        // Draw connections
        for (let j = idx + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(25, 90%, 55%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      // Large glowing orbs
      const orbs = [
        { cx: canvas.width * (0.2 + Math.sin(time * 0.5) * 0.1), cy: canvas.height * (0.3 + Math.cos(time * 0.3) * 0.1), r: 250, hue: 25 },
        { cx: canvas.width * (0.8 + Math.cos(time * 0.4) * 0.08), cy: canvas.height * (0.6 + Math.sin(time * 0.6) * 0.1), r: 200, hue: 35 },
        { cx: canvas.width * (0.5 + Math.sin(time * 0.7) * 0.15), cy: canvas.height * (0.5 + Math.cos(time * 0.5) * 0.15), r: 300, hue: 20 },
      ];

      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(orb.cx, orb.cy, 0, orb.cx, orb.cy, orb.r);
        gradient.addColorStop(0, `hsla(${orb.hue}, 95%, 55%, 0.06)`);
        gradient.addColorStop(0.5, `hsla(${orb.hue}, 90%, 50%, 0.02)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(orb.cx - orb.r, orb.cy - orb.r, orb.r * 2, orb.r * 2);
      });

      animationId = requestAnimationFrame(draw);
    };

    // Check for reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      draw();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}
