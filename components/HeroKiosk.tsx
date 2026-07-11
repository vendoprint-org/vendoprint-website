'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Cloud, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

interface FloatCard {
  icon: LucideIcon;
  label: string;
  sub: string;
  pos: string;
  delay: number;
  hideOnMobile?: boolean;
}

const CARDS: FloatCard[] = [
  { icon: Cloud, label: 'Cloud Connected', sub: 'Live sync', pos: 'top-6 -left-4 md:-left-10', delay: 0 },
  { icon: Clock, label: '24×7 Access', sub: 'Always on', pos: 'top-24 -right-2 md:-right-8', delay: 0.6, hideOnMobile: true },
  { icon: ShieldCheck, label: 'Secure Payment', sub: 'UPI · Cards', pos: 'bottom-28 -left-3 md:-left-12', delay: 1.2, hideOnMobile: true },
  { icon: CheckCircle2, label: 'Print Successful', sub: 'Ready to collect', pos: 'bottom-8 -right-2 md:-right-10', delay: 0.3 },
];

export function HeroKiosk() {
  const reduce = useReducedMotion();

  const float = reduce
    ? {}
    : { y: [0, -12, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
      {/* ── Copy ── */}
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
        className="max-w-xl"
      >
        <motion.p
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-caption uppercase tracking-widest text-slate mb-6 shadow-ds-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          India&apos;s most trusted smart printing network
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold text-display md:text-display-lg lg:text-display-xl text-ink leading-[1.05] tracking-tight mb-6"
        >
          Print. Anytime.
          <br />
          <span className="text-primary">Anywhere.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-body-lg text-slate mb-8 max-w-lg">
          India&apos;s first patented self-service printing kiosk. Walk up, scan, print,
          collect&nbsp;&mdash; no queues, no shopkeepers, no fixed hours.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <Link href="/partner" className="btn-primary">
            Partner With Us
            <ArrowRight size={18} />
          </Link>
          <Link href="/how-it-works" className="btn-secondary">
            See How It Works
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Visual ── */}
      <div className="relative flex justify-center lg:justify-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-[380px] lg:max-w-[440px]"
        >
          {/* orange glow */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px]"
          />

          <motion.div animate={float} className="relative">
            <Image
              src="/assets/vendoprint/3d-assets/kiosk-front-light.webp"
              alt="Vend-O-Print self-service smart printing kiosk"
              width={1122}
              height={1402}
              priority
              className="w-full h-auto select-none"
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 88% 92% at 50% 48%, #000 78%, transparent 100%)',
                maskImage:
                  'radial-gradient(ellipse 88% 92% at 50% 48%, #000 78%, transparent 100%)',
              }}
            />
          </motion.div>

          {/* floating cards */}
          {CARDS.map((c) => (
            <motion.div
              key={c.label}
              aria-hidden
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + c.delay * 0.3 }}
              className={`absolute ${c.pos} ${c.hideOnMobile ? 'hidden md:flex' : 'flex'} items-center gap-2.5 rounded-md border border-gray-200 bg-white px-3.5 py-2.5 backdrop-blur-md shadow-ds-lg`}
            >
              <motion.span
                animate={reduce ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 4 + c.delay, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary"
              >
                <c.icon size={16} />
              </motion.span>
              <div className="pr-1">
                <p className="text-[13px] font-semibold leading-none text-ink">{c.label}</p>
                <p className="mt-1 text-[11px] leading-none text-slate">{c.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
