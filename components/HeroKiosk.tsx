'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { calcTilt } from '@/lib/tilt';
import { calcParallaxOffset } from '@/lib/parallax';
import { registerGsap, gsap } from '@/lib/gsap';

const MAX_TILT_DEG = 8;

function usePointerCapable() {
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const narrow = window.innerWidth < 1024;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCapable(!coarse && !narrow && !reduceMotion);
  }, []);
  return capable;
}

export function HeroKiosk() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const tiltCapable = usePointerCapable();
  const [scrollY, setScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 20 });

  const rawLift = useMotionValue(0);
  const lift = useSpring(rawLift, { stiffness: 160, damping: 18 });

  const shadowOffsetX = useTransform(rotateY, [-MAX_TILT_DEG, MAX_TILT_DEG], [18, -18]);
  const shadowOffsetY = useTransform(rotateX, [-MAX_TILT_DEG, MAX_TILT_DEG], [-14, 26]);
  const dropShadow = useTransform(
    [shadowOffsetX, shadowOffsetY],
    ([x, y]: number[]) => `drop-shadow(${x}px ${y + 24}px 24px rgba(20, 16, 12, 0.28))`
  );

  const groundScaleX = useTransform(rotateY, [-MAX_TILT_DEG, MAX_TILT_DEG], [0.82, 1.18]);
  const groundSkew = useTransform(rotateY, [-MAX_TILT_DEG, MAX_TILT_DEG], [8, -8]);
  const groundOpacity = useTransform(rotateX, [-MAX_TILT_DEG, MAX_TILT_DEG], [0.3, 0.14]);

  const glowOffset = calcParallaxOffset(scrollY, 0.6) * -1;
  const badgeOffset = calcParallaxOffset(scrollY, 0.85) * -1;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!tiltCapable) return;
    const el = imageWrapRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const { rotateX: rx, rotateY: ry } = calcTilt(
        e.clientX - rect.left,
        e.clientY - rect.top,
        { width: rect.width, height: rect.height },
        MAX_TILT_DEG
      );
      rawRotateX.set(rx);
      rawRotateY.set(ry);
    };
    const onMouseEnter = () => {
      setIsHovering(true);
      rawLift.set(-14);
    };
    const onMouseLeave = () => {
      rawRotateX.set(0);
      rawRotateY.set(0);
      rawLift.set(0);
      setIsHovering(false);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [tiltCapable, rawRotateX, rawRotateY, rawLift]);

  useEffect(() => {
    registerGsap();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = [eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current];
    if (els.some((el) => !el) || !imageWrapRef.current) return;

    if (reduceMotion) {
      gsap.set([...els, imageWrapRef.current], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
      .fromTo(
        imageWrapRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.9 },
        '-=0.6'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
      <div className="max-w-xl">
        <p ref={eyebrowRef} className="eyebrow mb-4">
          Patented Technology
        </p>
        <h1 ref={headlineRef} className="heading-display mb-6">
          India&apos;s First Patented Smart Printing Kiosk
        </h1>
        <p ref={subRef} className="body-text mb-8 max-w-lg">
          Walk up. Scan. Print. Collect. No queues, no shopkeepers, no
          hours&nbsp;&mdash; just your documents, ready when you are.
        </p>
        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <Link href="/partner" className="btn-primary">
            Partner With Us
            <ArrowRight size={18} />
          </Link>
          <Link href="/how-it-works" className="btn-secondary">
            See How It Works
          </Link>
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end lg:pr-10 xl:pr-16">
        <div ref={imageWrapRef} className="relative w-full max-w-xs lg:max-w-sm" style={{ perspective: 1200 }}>
          <div
            aria-hidden
            className="absolute -inset-12 rounded-full bg-brand-orange/10 blur-[80px] -z-10 transition-transform duration-300"
            style={{
              transform: `translateY(${glowOffset}px) scale(${isHovering ? 1.15 : 1})`,
            }}
          />
          <motion.div
            style={{
              rotateX,
              rotateY,
              y: lift,
              filter: dropShadow,
              transformStyle: 'preserve-3d',
            }}
            className="relative"
          >
            <Image
              src="/images/kiosk-machine.png"
              alt="Vendoprint smart printing kiosk machine"
              width={480}
              height={932}
              priority
              className="w-full h-auto select-none"
            />
          </motion.div>
          <motion.div
            aria-hidden
            className="absolute left-1/2 bottom-2 h-6 w-4/5 -translate-x-1/2 rounded-full bg-brand-black/40 blur-xl -z-10"
            style={{
              scaleX: groundScaleX,
              skewX: groundSkew,
              opacity: groundOpacity,
            }}
          />
          <div
            className="absolute -bottom-4 -left-4 md:bottom-4 md:-left-8 bg-white rounded-brand px-5 py-3 shadow-lg border border-brand-border"
            style={{ transform: `translateY(${badgeOffset}px)` }}
          >
            <p className="text-caption uppercase text-brand-orange font-semibold">
              Patent Granted
            </p>
            <p className="text-xs text-brand-muted mt-0.5">Smart Slot-Sorting System</p>
          </div>
        </div>
      </div>
    </div>
  );
}
