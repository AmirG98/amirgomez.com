'use client';

import { useEffect, useRef } from 'react';
import './../app/agrowth/agrowth-home.css';
// Raw <body> markup from the A+ Growth static build (includes inline <script> tags).
import bodyHtml from './../app/agrowth/body-html';

/**
 * Mounts the original A+ Growth WebGL landing (Three.js + shaders, scroll-driven).
 * The static build ships as one self-contained HTML document; rather than porting
 * ~700 lines of shader/scroll logic to React, we inject the original markup and
 * re-create its inline scripts so the browser executes them (innerHTML does not
 * run injected <script> nodes on its own).
 */
export default function AGrowthHome() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Parse the raw body into a detached document so we can separate markup
    // from scripts and control execution order (importmap must precede modules).
    const parsed = new DOMParser().parseFromString(bodyHtml, 'text/html');
    const scripts = Array.from(parsed.querySelectorAll('script'));
    scripts.forEach((s) => s.remove());

    // Insert the non-script markup.
    mount.innerHTML = parsed.body.innerHTML;

    // Re-create scripts as executable nodes, in original order.
    const created: HTMLScriptElement[] = [];
    for (const original of scripts) {
      const script = document.createElement('script');
      for (const attr of Array.from(original.attributes)) {
        script.setAttribute(attr.name, attr.value);
      }
      script.textContent = original.textContent;
      document.body.appendChild(script);
      created.push(script);
    }

    // Gate the design's stylesheet (which targets html/body and generic class
    // names) to this page only. All rules in agrowth-home.css are scoped under
    // `html.agrowth-scope`, so adding it here activates them without leaking to
    // other routes.
    const html = document.documentElement;
    html.classList.add('agrowth-scope');
    html.classList.remove('webgl-ready');

    // Tipografías de la landing (Bricolage Grotesque + Martian Mono), scoped a
    // esta página: se agregan al montar y se retiran al desmontar.
    const fontSpecs: { rel: string; href: string; crossOrigin?: string }[] = [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Martian+Mono:wght@400;600&display=swap',
      },
    ];
    const fontLinks: HTMLLinkElement[] = fontSpecs.map((spec) => {
      const link = document.createElement('link');
      link.rel = spec.rel;
      link.href = spec.href;
      if (spec.crossOrigin !== undefined) link.crossOrigin = spec.crossOrigin;
      document.head.appendChild(link);
      return link;
    });

    return () => {
      created.forEach((s) => s.remove());
      fontLinks.forEach((l) => l.remove());
      if (mount) mount.innerHTML = '';
      html.classList.remove('agrowth-scope', 'webgl-failed', 'webgl-ready');
      document.body.classList.remove(
        'tail-active',
        'journey-active',
        'pairs-stack',
      );
    };
  }, []);

  return <div ref={mountRef} />;
}
