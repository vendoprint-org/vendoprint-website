'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { registerGsap, gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Global smooth-scroll provider.
 * - Drives GSAP ScrollTrigger from Lenis' RAF loop so pinned/scroll animations stay in sync.
 * - Fully disabled when the user prefers reduced motion (native scroll only).
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    registerGsap();

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Sync Lenis scroll → ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
