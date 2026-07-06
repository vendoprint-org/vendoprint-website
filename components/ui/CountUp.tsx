'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { parseCountTarget, formatCountValue } from '@/lib/countUp';

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export function CountUp({ value, duration = 1.2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const target = parseCountTarget(value);
  const [display, setDisplay] = useState(
    target.prefix + formatCountValue(0, target.hasComma) + target.suffix
  );

  useEffect(() => {
    if (!inView) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || target.value === 0) {
      setDisplay(target.prefix + formatCountValue(target.value, target.hasComma) + target.suffix);
      return;
    }

    const start = performance.now();
    const durationMs = duration * 1000;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target.value * eased;
      setDisplay(target.prefix + formatCountValue(current, target.hasComma) + target.suffix);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
