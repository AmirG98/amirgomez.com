'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

interface TimelineProcessProps {
  steps: ProcessStep[];
  className?: string;
}

export default function TimelineProcess({ steps, className = '' }: TimelineProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      if (containerRef.current && progressBarRef.current) {
        const container = containerRef.current;
        const progressBar = progressBarRef.current;
        const stepElements = container.querySelectorAll('.process-step');

        // Animate progress bar
        gsap.fromTo(
          progressBar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top center',
              end: 'bottom center',
              scrub: 1
            }
          }
        );

        // Animate each step
        stepElements.forEach((step, index) => {
          gsap.fromTo(
            step,
            {
              opacity: 0,
              y: 50,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          // Pulse animation for step number
          const numberElement = step.querySelector('.step-number');
          if (numberElement) {
            gsap.to(numberElement, {
              scale: 1.1,
              duration: 0.5,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play pause play pause'
              }
            });
          }
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [steps]);

  return (
    <div ref={containerRef} className={className}>
      {/* Progress Bar */}
      <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-foreground/10 mx-auto max-w-4xl">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 origin-left"
        />
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10">
        {steps.map((step, index) => (
          <div key={step.number} className="process-step text-center">
            <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 step-number">
              <span className="text-2xl font-bold text-orange-600">{step.number}</span>
            </div>
            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
            <p className="text-foreground/80">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
