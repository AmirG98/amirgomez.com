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

    const count = Math.min(80, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() * 40 + 15,
      });
    }

    let time = 0;

    const draw = () => {
      time += 0.003;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Dark base
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, W, H);

      // Aurora waves
      for (let i = 0; i < 3; i++) {
        const gradient = ctx.createLinearGradient(0, 0, W, H);
        const shift = time * (0.5 + i * 0.3);
        gradient.addColorStop(0, `hsla(${25 + Math.sin(shift) * 15}, 95%, 55%, ${0.03 - i * 0.008})`);
        gradient.addColorStop(0.3 + Math.sin(shift + 1) * 0.2, `hsla(${35 + Math.cos(shift) * 20}, 90%, 50%, ${0.06 - i * 0.015})`);
        gradient.addColorStop(0.6 + Math.cos(shift + 2) * 0.15, `hsla(${15 + Math.sin(shift + 3) * 10}, 95%, 45%, ${0.04 - i * 0.01})`);
        gradient.addColorStop(1, `hsla(${30 + Math.cos(shift + 1) * 15}, 85%, 60%, 0.02)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (let x = 0; x <= W; x += 4) {
          const y = H * (0.3 + i * 0.15) +
            Math.sin(x * 0.002 + shift + i) * 120 +
            Math.cos(x * 0.001 + shift * 1.5 + i * 2) * 80 +
            Math.sin(x * 0.003 + shift * 0.7) * 40;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();
      }

      // Particles + connections
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const pulse = Math.sin(time * 2 + idx) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.opacity * pulse})`;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const o = particles[j];
          const dist = Math.hypot(p.x - o.x, p.y - o.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `hsla(25, 90%, 55%, ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      // Glowing orbs
      [
        { cx: W * (0.2 + Math.sin(time * 0.5) * 0.1), cy: H * (0.3 + Math.cos(time * 0.3) * 0.1), r: 250, hue: 25 },
        { cx: W * (0.8 + Math.cos(time * 0.4) * 0.08), cy: H * (0.6 + Math.sin(time * 0.6) * 0.1), r: 200, hue: 35 },
        { cx: W * (0.5 + Math.sin(time * 0.7) * 0.15), cy: H * (0.5 + Math.cos(time * 0.5) * 0.15), r: 300, hue: 20 },
      ].forEach(({ cx, cy, r, hue }) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `hsla(${hue}, 95%, 55%, 0.06)`);
        g.addColorStop(0.5, `hsla(${hue}, 90%, 50%, 0.02)`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      });

      animationId = requestAnimationFrame(draw);
    };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      draw();
    } else {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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
      style={{
        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
      }}
      aria-hidden="true"
    />
  );
}
