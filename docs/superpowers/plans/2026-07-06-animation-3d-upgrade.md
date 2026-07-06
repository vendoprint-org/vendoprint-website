# Vendoprint Animation & Pseudo-3D Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the Vendoprint marketing site (currently plain framer-motion fades on a light cream/orange theme) into a premium, motion-rich experience — parallax/tilt hero, a GSAP pinned scroll-story for "How It Works", glass cards, count-up stats, and consistent polish across all 6 pages — without changing the brand's light color theme or adding true 3D.

**Architecture:** Add GSAP + `@gsap/react` alongside the existing framer-motion (framer-motion is not removed). Pure calculation logic (tilt angle, parallax offset, scroll progress %, step-from-scroll-progress, count-target parsing) is extracted into small testable `lib/*.ts` functions with vitest unit tests. The DOM/animation wiring around those functions (GSAP timelines, ScrollTrigger, framer motion values) is verified manually in a browser per task — it is not meaningfully unit-testable and this plan does not pretend otherwise.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, framer-motion (existing), GSAP + ScrollTrigger + `@gsap/react` (new), vitest (new, for pure-function unit tests), npm (existing package manager, existing `package-lock.json`).

## Global Constraints

- Keep the existing light cream/orange theme (`brand-cream`, `brand-orange`, `brand-black` etc. in `tailwind.config.js`). Do not introduce a dark mode or teal accent.
- No true 3D — no `three`, `@react-three/fiber`, `@react-three/drei`, no GLB/GLTF model. "3D" is simulated via parallax depth layers + mouse-tilt only.
- Reuse the existing `/public/images/kiosk-hero.png` as-is. Do not add new photography or generated imagery.
- framer-motion is not removed. GSAP is added only for what framer-motion does clumsily: pinned/scrubbed scroll storytelling.
- All heavy motion (mouse-tilt, parallax, ScrollTrigger pin+scrub) must respect `prefers-reduced-motion: reduce` and must be disabled below `1024px` viewport width / on coarse pointers (touch), falling back to simple fade/stagger reveals.
- Package manager is npm (existing `package-lock.json`). Do not switch to bun/yarn/pnpm for this project.
- No backend, API, auth, or database work — site stays fully static.
- All 6 pages (`/`, `/about`, `/how-it-works`, `/partner`, `/contact`, `/blog`) get the same depth of visual/motion treatment; nav and footer included.

---

### Task 1: Project setup — dependencies, test runner, cleanup

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Delete: `./{app` (stray junk directory at repo root, and everything under it)

**Interfaces:**
- Produces: `npm test` script running vitest once; `gsap` and `@gsap/react` available as imports; vitest available for all later tasks' unit tests.

- [ ] **Step 1: Delete the stray junk directory**

```bash
rm -rf "./{app"
```

Verify it's gone:

```bash
find . -maxdepth 1 -name '{app*'
```

Expected: no output.

- [ ] **Step 2: Install GSAP and vitest**

```bash
npm install gsap @gsap/react
npm install -D vitest
```

- [ ] **Step 3: Add `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
  },
});
```

- [ ] **Step 4: Add `test` script to `package.json`**

Modify the `scripts` block in `package.json` to:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "postbuild": "next-sitemap"
  }
}
```

- [ ] **Step 5: Verify installs and build still work**

```bash
npm run build
```

Expected: build succeeds with zero errors (same as before this task — no code changed yet, only deps/scripts).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add gsap and vitest, remove stray junk directory"
```

---

### Task 2: GSAP registration + reduced-motion CSS + glass card style

**Files:**
- Create: `lib/gsap.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `registerGsap()` from `lib/gsap.ts` — idempotent, client-only GSAP+ScrollTrigger registration, safe to call from any `'use client'` component's effect.
- Produces: `.card-glass` CSS class in `globals.css` for later tasks to apply to feature/content cards.
- Produces: a `prefers-reduced-motion` media query block later tasks' GSAP code must not fight against for opacity/transform end-states (see Step 3).

- [ ] **Step 1: Create `lib/gsap.ts`**

```typescript
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function registerGsap() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Add `.card-glass` to `app/globals.css`**

In the `@layer components` block (after the existing `.card` rule, `app/globals.css:60-62`), add:

```css
  .card-glass {
    @apply bg-white/60 backdrop-blur-sm border border-brand-border/70 rounded-brand p-8
           shadow-[0_1px_2px_rgba(22,19,15,0.04)]
           transition-all duration-300 ease-out
           hover:border-brand-orange/40 hover:shadow-[0_8px_24px_rgba(255,130,0,0.12)]
           hover:-translate-y-1;
  }
```

- [ ] **Step 3: Add reduced-motion guard to `app/globals.css`**

At the end of the file (after the scrollbar rules, `app/globals.css:84`), add:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors.

- [ ] **Step 5: Commit**

```bash
git add lib/gsap.ts app/globals.css
git commit -m "feat: add gsap registration helper and glass card / reduced-motion styles"
```

---

### Task 3: Scroll progress bar

**Files:**
- Create: `lib/scrollProgress.ts`
- Create: `lib/scrollProgress.test.ts`
- Create: `components/ui/ScrollProgress.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `calcScrollProgress(scrollY: number, docHeight: number, viewportHeight: number): number` (0–100, clamped) — used only inside `ScrollProgress.tsx` but exported for the test.
- Produces: `<ScrollProgress />` component, mounted once in `app/layout.tsx`.

- [ ] **Step 1: Write the failing test**

Create `lib/scrollProgress.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { calcScrollProgress } from './scrollProgress';

describe('calcScrollProgress', () => {
  it('returns 0 at the top of the page', () => {
    expect(calcScrollProgress(0, 3000, 800)).toBe(0);
  });

  it('returns 100 at the bottom of the page', () => {
    expect(calcScrollProgress(2200, 3000, 800)).toBe(100);
  });

  it('returns a proportional value in between', () => {
    expect(calcScrollProgress(1100, 3000, 800)).toBe(50);
  });

  it('clamps to 0 when scrollY is negative', () => {
    expect(calcScrollProgress(-50, 3000, 800)).toBe(0);
  });

  it('clamps to 100 when scrollY overshoots', () => {
    expect(calcScrollProgress(9999, 3000, 800)).toBe(100);
  });

  it('returns 0 when the page is shorter than the viewport', () => {
    expect(calcScrollProgress(0, 400, 800)).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run lib/scrollProgress.test.ts
```

Expected: FAIL — `Cannot find module './scrollProgress'`.

- [ ] **Step 3: Write `lib/scrollProgress.ts`**

```typescript
export function calcScrollProgress(
  scrollY: number,
  docHeight: number,
  viewportHeight: number
): number {
  const scrollable = docHeight - viewportHeight;
  if (scrollable <= 0) return 0;
  const pct = (scrollY / scrollable) * 100;
  return Math.min(100, Math.max(0, pct));
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run lib/scrollProgress.test.ts
```

Expected: PASS (6 tests).

- [ ] **Step 5: Create `components/ui/ScrollProgress.tsx`**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { calcScrollProgress } from '@/lib/scrollProgress';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      setProgress(calcScrollProgress(window.scrollY, docHeight, viewportHeight));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent pointer-events-none">
      <div
        className="h-full bg-brand-orange transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

- [ ] **Step 6: Mount in `app/layout.tsx`**

In `app/layout.tsx`, add the import near the other component imports (`app/layout.tsx:4-5`):

```typescript
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
```

Then update the `<body>` block (`app/layout.tsx:93-97`) to:

```typescript
      <body className="font-archivo antialiased">
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors.

- [ ] **Step 8: Manual verification**

```bash
npm run dev
```

Open `http://localhost:3000`, scroll the page, confirm a thin orange bar at the very top fills left-to-right as you scroll, reaching full width at the bottom of the page.

- [ ] **Step 9: Commit**

```bash
git add lib/scrollProgress.ts lib/scrollProgress.test.ts components/ui/ScrollProgress.tsx app/layout.tsx
git commit -m "feat: add scroll progress bar"
```

---

### Task 4: Count-up numbers

**Files:**
- Create: `lib/countUp.ts`
- Create: `lib/countUp.test.ts`
- Create: `components/ui/CountUp.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `parseCountTarget(raw: string): { prefix: string; value: number; suffix: string; hasComma: boolean }` and `formatCountValue(current: number, hasComma: boolean): string`, both exported from `lib/countUp.ts`.
- Produces: `<CountUp value="10,000+" />` component (props: `value: string`, optional `duration?: number` seconds, default `1.2`), used by Task 8 (homepage stats/vision numbers).

- [ ] **Step 1: Write the failing tests**

Create `lib/countUp.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { parseCountTarget, formatCountValue } from './countUp';

describe('parseCountTarget', () => {
  it('parses a plain integer', () => {
    expect(parseCountTarget('0')).toEqual({ prefix: '', value: 0, suffix: '', hasComma: false });
  });

  it('parses a comma-separated number with a plus suffix', () => {
    expect(parseCountTarget('10,000+')).toEqual({
      prefix: '',
      value: 10000,
      suffix: '+',
      hasComma: true,
    });
  });

  it('parses a ratio-style value, treating everything after the number as suffix', () => {
    expect(parseCountTarget('24/7')).toEqual({
      prefix: '',
      value: 24,
      suffix: '/7',
      hasComma: false,
    });
  });

  it('parses a less-than prefix with a unit suffix', () => {
    expect(parseCountTarget('<60s')).toEqual({
      prefix: '<',
      value: 60,
      suffix: 's',
      hasComma: false,
    });
  });

  it('parses a percentage', () => {
    expect(parseCountTarget('100%')).toEqual({
      prefix: '',
      value: 100,
      suffix: '%',
      hasComma: false,
    });
  });
});

describe('formatCountValue', () => {
  it('formats without commas when hasComma is false', () => {
    expect(formatCountValue(60, false)).toBe('60');
  });

  it('formats with commas when hasComma is true', () => {
    expect(formatCountValue(10000, true)).toBe('10,000');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run lib/countUp.test.ts
```

Expected: FAIL — `Cannot find module './countUp'`.

- [ ] **Step 3: Write `lib/countUp.ts`**

```typescript
export interface CountTarget {
  prefix: string;
  value: number;
  suffix: string;
  hasComma: boolean;
}

export function parseCountTarget(raw: string): CountTarget {
  const match = raw.match(/^([^\d]*)([\d,]+)(.*)$/s);
  if (!match) {
    return { prefix: '', value: 0, suffix: raw, hasComma: false };
  }
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    value: parseInt(digits.replace(/,/g, ''), 10),
    suffix,
    hasComma: digits.includes(','),
  };
}

export function formatCountValue(current: number, hasComma: boolean): string {
  return hasComma ? Math.round(current).toLocaleString('en-US') : String(Math.round(current));
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run lib/countUp.test.ts
```

Expected: PASS (7 tests).

- [ ] **Step 5: Create `components/ui/CountUp.tsx`**

```typescript
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
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors. (Not wired into any page yet — that happens in Task 8.)

- [ ] **Step 7: Commit**

```bash
git add lib/countUp.ts lib/countUp.test.ts components/ui/CountUp.tsx
git commit -m "feat: add CountUp component for animated stat numbers"
```

---

### Task 5: Hero parallax/tilt — pure functions

**Files:**
- Create: `lib/tilt.ts`
- Create: `lib/tilt.test.ts`
- Create: `lib/parallax.ts`
- Create: `lib/parallax.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `calcTilt(mouseX: number, mouseY: number, rect: { width: number; height: number }, maxDeg: number): { rotateX: number; rotateY: number }`, used by `HeroKiosk.tsx` in Task 6.
- Produces: `calcParallaxOffset(scrollY: number, speed: number): number`, used by `HeroKiosk.tsx` in Task 6.

- [ ] **Step 1: Write the failing tilt test**

Create `lib/tilt.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { calcTilt } from './tilt';

describe('calcTilt', () => {
  const rect = { width: 400, height: 300 };

  it('returns zero rotation when the mouse is at the center', () => {
    expect(calcTilt(200, 150, rect, 3)).toEqual({ rotateX: 0, rotateY: 0 });
  });

  it('tilts positively on rotateY when mouse is at the right edge', () => {
    const { rotateY } = calcTilt(400, 150, rect, 3);
    expect(rotateY).toBeCloseTo(3);
  });

  it('tilts negatively on rotateY when mouse is at the left edge', () => {
    const { rotateY } = calcTilt(0, 150, rect, 3);
    expect(rotateY).toBeCloseTo(-3);
  });

  it('tilts negatively on rotateX when mouse is at the top edge', () => {
    const { rotateX } = calcTilt(200, 0, rect, 3);
    expect(rotateX).toBeCloseTo(3);
  });

  it('tilts positively on rotateX when mouse is at the bottom edge', () => {
    const { rotateX } = calcTilt(200, 300, rect, 3);
    expect(rotateX).toBeCloseTo(-3);
  });

  it('clamps rotation to maxDeg even if mouse is outside the element bounds', () => {
    const { rotateX, rotateY } = calcTilt(1000, 1000, rect, 3);
    expect(Math.abs(rotateX)).toBeLessThanOrEqual(3);
    expect(Math.abs(rotateY)).toBeLessThanOrEqual(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run lib/tilt.test.ts
```

Expected: FAIL — `Cannot find module './tilt'`.

- [ ] **Step 3: Write `lib/tilt.ts`**

```typescript
export interface Tilt {
  rotateX: number;
  rotateY: number;
}

export function calcTilt(
  mouseX: number,
  mouseY: number,
  rect: { width: number; height: number },
  maxDeg: number
): Tilt {
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const offsetX = mouseX - centerX;
  const offsetY = mouseY - centerY;

  const rawRotateY = (offsetX / centerX) * maxDeg;
  const rawRotateX = -(offsetY / centerY) * maxDeg;

  return {
    rotateX: Math.min(maxDeg, Math.max(-maxDeg, rawRotateX)),
    rotateY: Math.min(maxDeg, Math.max(-maxDeg, rawRotateY)),
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run lib/tilt.test.ts
```

Expected: PASS (6 tests).

- [ ] **Step 5: Write the failing parallax test**

Create `lib/parallax.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { calcParallaxOffset } from './parallax';

describe('calcParallaxOffset', () => {
  it('returns 0 when scrollY is 0', () => {
    expect(calcParallaxOffset(0, 0.6)).toBe(0);
  });

  it('scales scrollY by the given speed', () => {
    expect(calcParallaxOffset(100, 0.6)).toBe(60);
  });

  it('returns the full scrollY when speed is 1', () => {
    expect(calcParallaxOffset(250, 1)).toBe(250);
  });

  it('handles negative scrollY (overscroll/bounce)', () => {
    expect(calcParallaxOffset(-50, 0.6)).toBe(-30);
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npx vitest run lib/parallax.test.ts
```

Expected: FAIL — `Cannot find module './parallax'`.

- [ ] **Step 7: Write `lib/parallax.ts`**

```typescript
export function calcParallaxOffset(scrollY: number, speed: number): number {
  return scrollY * speed;
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npx vitest run lib/parallax.test.ts
```

Expected: PASS (4 tests).

- [ ] **Step 9: Commit**

```bash
git add lib/tilt.ts lib/tilt.test.ts lib/parallax.ts lib/parallax.test.ts
git commit -m "feat: add pure tilt and parallax calculation helpers"
```

---

### Task 6: HeroKiosk component + wire into homepage hero

**Files:**
- Create: `components/HeroKiosk.tsx`
- Modify: `app/page.tsx:32-84` (hero section)

**Interfaces:**
- Consumes: `calcTilt` from `lib/tilt.ts` (Task 5), `calcParallaxOffset` from `lib/parallax.ts` (Task 5), `registerGsap`/`gsap` from `lib/gsap.ts` (Task 2).
- Produces: `<HeroKiosk />` — self-contained, renders its own eyebrow/headline/sub-headline/CTAs/image (replaces the entire two-column hero content), so `app/page.tsx`'s hero section shrinks to just mounting this component inside the existing gradient/glow wrapper.

- [ ] **Step 1: Create `components/HeroKiosk.tsx`**

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { calcTilt } from '@/lib/tilt';
import { calcParallaxOffset } from '@/lib/parallax';
import { registerGsap, gsap } from '@/lib/gsap';

const MAX_TILT_DEG = 3;

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

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 20 });

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
    const onMouseLeave = () => {
      rawRotateX.set(0);
      rawRotateY.set(0);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [tiltCapable, rawRotateX, rawRotateY]);

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

      <div className="relative flex justify-center lg:justify-end">
        <div ref={imageWrapRef} className="relative w-full max-w-md lg:max-w-lg" style={{ perspective: 1000 }}>
          <div
            aria-hidden
            className="absolute -inset-12 rounded-full bg-brand-orange/10 blur-[80px] -z-10"
            style={{ transform: `translateY(${glowOffset}px)` }}
          />
          <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
            <Image
              src="/images/kiosk-hero.png"
              alt="Vendoprint smart printing kiosk in a modern space"
              width={600}
              height={900}
              priority
              className="rounded-2xl shadow-2xl shadow-brand-black/10"
            />
          </motion.div>
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
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Replace the hero content (`app/page.tsx:32-84`, the whole `{/* ═══════════ HERO ═══════════ */}` section) with:

```typescript
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-brand-cream to-brand-surface" />
        {/* Accent glow */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[120px]" />

        <div className="relative section-padding w-full pt-28 pb-20 md:pt-32 md:pb-28">
          <HeroKiosk />
        </div>
      </section>
```

Update the import block at the top of `app/page.tsx` (`app/page.tsx:1-14`) — remove `AnimateIn` if no longer used elsewhere in the file (it still is, in the Problem/Solution/etc. sections further down, so keep it), and add:

```typescript
import { HeroKiosk } from '@/components/HeroKiosk';
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors.

- [ ] **Step 4: Manual verification**

```bash
npm run dev
```

Open `http://localhost:3000` on a desktop-width browser window:
- Confirm hero content fades/staggers in on load (eyebrow → headline → sub → CTAs → image).
- Move the mouse over the kiosk image — it should tilt gently (subtle, ~3° max) toward the cursor.
- Scroll down slightly — the background glow and "Patent Granted" badge should drift at a different rate than the image (parallax).
- Resize the browser to under 1024px width (or open dev tools device toolbar) — confirm tilt no longer responds to mouse movement.
- In macOS System Settings → Accessibility → Display, enable "Reduce motion", reload the page — confirm hero content appears immediately without the stagger animation.

- [ ] **Step 5: Commit**

```bash
git add components/HeroKiosk.tsx app/page.tsx
git commit -m "feat: add parallax/tilt hero kiosk visual"
```

---

### Task 7: HowItWorksScroll — pure step function + component

**Files:**
- Create: `lib/stepProgress.ts`
- Create: `lib/stepProgress.test.ts`
- Create: `components/sections/HowItWorksScroll.tsx`

**Interfaces:**
- Consumes: `registerGsap`/`gsap`/`ScrollTrigger` from `lib/gsap.ts` (Task 2).
- Produces: `stepFromProgress(progress: number, totalSteps: number): number`, exported from `lib/stepProgress.ts`.
- Produces: `<HowItWorksScroll variant="compact" | "full" />`, consumed by Task 8 (`app/page.tsx`) and Task 9 (`app/how-it-works/page.tsx`).

- [ ] **Step 1: Write the failing test**

Create `lib/stepProgress.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { stepFromProgress } from './stepProgress';

describe('stepFromProgress', () => {
  it('returns the first step at progress 0', () => {
    expect(stepFromProgress(0, 4)).toBe(0);
  });

  it('returns the last step at progress 1', () => {
    expect(stepFromProgress(1, 4)).toBe(3);
  });

  it('returns the second step early in the second quarter', () => {
    expect(stepFromProgress(0.26, 4)).toBe(1);
  });

  it('returns the third step in the third quarter', () => {
    expect(stepFromProgress(0.6, 4)).toBe(2);
  });

  it('never returns an index outside the valid range', () => {
    expect(stepFromProgress(-0.5, 4)).toBe(0);
    expect(stepFromProgress(1.5, 4)).toBe(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run lib/stepProgress.test.ts
```

Expected: FAIL — `Cannot find module './stepProgress'`.

- [ ] **Step 3: Write `lib/stepProgress.ts`**

```typescript
export function stepFromProgress(progress: number, totalSteps: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const index = Math.floor(clamped * totalSteps);
  return Math.min(totalSteps - 1, index);
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run lib/stepProgress.test.ts
```

Expected: PASS (5 tests, note the two assertions in the last `it` block both must pass).

- [ ] **Step 5: Create `components/sections/HowItWorksScroll.tsx`**

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { QrCode, Upload, CreditCard, PackageCheck, LucideIcon } from 'lucide-react';
import { registerGsap, gsap, ScrollTrigger } from '@/lib/gsap';
import { stepFromProgress } from '@/lib/stepProgress';
import { AnimateIn } from '@/components/AnimateIn';

interface Step {
  icon: LucideIcon;
  number: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    icon: QrCode,
    number: '01',
    title: 'Scan the Kiosk QR',
    desc: 'Walk up to any Vendoprint kiosk and scan the QR code with your phone camera. No app download required.',
  },
  {
    icon: Upload,
    number: '02',
    title: 'Upload Your Document',
    desc: 'Select your file from your phone, laptop, or cloud drive. Choose colour or black & white, copies, and paper size.',
  },
  {
    icon: CreditCard,
    number: '03',
    title: 'Pay Instantly',
    desc: 'Confirm via UPI, card, or wallet. Pricing is shown up front — no surprises before you pay.',
  },
  {
    icon: PackageCheck,
    number: '04',
    title: 'Collect Your Print',
    desc: 'Your print drops into your own secure slot. Pick it up and go — under 60 seconds, start to finish.',
  },
];

function useDesktopPinCapable() {
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const narrow = window.innerWidth < 1024;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCapable(!narrow && !reduceMotion);
  }, []);
  return capable;
}

export function HowItWorksScroll({ variant }: { variant: 'compact' | 'full' }) {
  const pinCapable = useDesktopPinCapable();
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!pinCapable) return;
    registerGsap();
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const step = stepFromProgress(self.progress, STEPS.length);
        setActiveStep(step);
      },
    });

    return () => trigger.kill();
  }, [pinCapable]);

  useEffect(() => {
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === activeStep ? 1 : 0,
        y: i === activeStep ? 0 : 20,
        duration: 0.4,
        ease: 'power2.inOut',
        pointerEvents: i === activeStep ? 'auto' : 'none',
      });
    });
  }, [activeStep]);

  const heightClass = variant === 'full' ? 'lg:h-[400vh]' : 'lg:h-[300vh]';

  return (
    <div>
      <AnimateIn>
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">How It Works</p>
          <h2 className="heading-section">Four steps. Under a minute.</h2>
        </div>
      </AnimateIn>

      {pinCapable ? (
        <div ref={containerRef} className={`relative hidden lg:block ${heightClass}`}>
          <div className="sticky top-0 h-screen flex items-center">
            <div className="section-padding w-full grid grid-cols-2 gap-16 items-center">
              <div className="relative h-[280px]">
                {STEPS.map((step, i) => (
                  <div
                    key={step.number}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <p className="font-sora font-extrabold text-7xl text-brand-orange/15 mb-4">
                      {step.number}
                    </p>
                    <h3 className="font-sora font-bold text-3xl mb-4">{step.title}</h3>
                    <p className="body-text max-w-md">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="w-56 h-96 rounded-[2rem] border-4 border-brand-black bg-gradient-to-b from-brand-surface to-white shadow-xl flex items-center justify-center">
                  {(() => {
                    const Icon = STEPS[activeStep].icon;
                    return <Icon size={48} className="text-brand-orange" />;
                  })()}
                </div>
                <div className="flex gap-3">
                  {STEPS.map((step, i) => (
                    <div
                      key={step.number}
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        i === activeStep ? 'bg-brand-orange' : 'bg-brand-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <AnimateIn key={step.number} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-orange mx-auto mb-5 flex items-center justify-center">
                  <step.icon size={28} className="text-white" />
                </div>
                <p className="text-caption text-brand-orange font-semibold mb-2">
                  Step {step.number}
                </p>
                <h3 className="font-sora font-bold text-xl mb-2">{step.title}</h3>
                <p className="body-text text-sm">{step.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors. (Not wired into any page yet — that happens in Tasks 8 and 9.)

- [ ] **Step 7: Commit**

```bash
git add lib/stepProgress.ts lib/stepProgress.test.ts components/sections/HowItWorksScroll.tsx
git commit -m "feat: add pinned scroll-story How It Works component"
```

---

### Task 8: Wire HowItWorksScroll + CountUp into homepage, upgrade cards

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `<HowItWorksScroll variant="compact" />` (Task 7), `<CountUp />` (Task 4).

- [ ] **Step 1: Replace the mini "How It Works" section**

Replace `app/page.tsx:156-208` (the whole `{/* ═══════════ HOW IT WORKS (MINI) ═══════════ */}` section) with:

```typescript
      {/* ═══════════ HOW IT WORKS (MINI) ═══════════ */}
      <section className="section-padding section-y border-t border-brand-border overflow-hidden">
        <HowItWorksScroll variant="compact" />
      </section>
```

- [ ] **Step 2: Add the stats bar to the hero section**

Immediately after the `<HeroKiosk />` line added in Task 6 (still inside the hero `<section>`), add a stats row:

```typescript
        <div className="relative section-padding w-full pt-28 pb-20 md:pt-32 md:pb-28">
          <HeroKiosk />

          <AnimateIn delay={0.4}>
            <div className="mt-16 pt-10 border-t border-brand-border flex flex-wrap gap-x-12 gap-y-6">
              {[
                { value: '24/7', label: 'Always Available' },
                { value: '<60s', label: 'Print Time' },
                { value: '100%', label: 'Contactless' },
              ].map((stat) => (
                <div key={stat.label}>
                  <CountUp value={stat.value} className="font-sora font-extrabold text-3xl text-brand-orange" />
                  <p className="text-caption uppercase tracking-widest text-brand-muted mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
```

- [ ] **Step 3: Wire CountUp into the Vision/Numbers section**

In `app/page.tsx:210-238` (the `{/* ═══════════ VISION / NUMBERS ═══════════ */}` section), replace the static number paragraph:

```typescript
                <p className="font-sora font-extrabold text-display-lg md:text-display-xl text-brand-orange">
                  {stat.number}
                </p>
```

with:

```typescript
                <CountUp
                  value={stat.number}
                  className="font-sora font-extrabold text-display-lg md:text-display-xl text-brand-orange block"
                />
```

- [ ] **Step 4: Upgrade Solution cards to glass style**

In `app/page.tsx:123-153` (the Solution 3-card grid), change the card wrapper class from `"card h-full flex flex-col"` to `"card-glass h-full flex flex-col"`.

- [ ] **Step 5: Add the imports**

At the top of `app/page.tsx` (`app/page.tsx:1-14`), add:

```typescript
import { HowItWorksScroll } from '@/components/sections/HowItWorksScroll';
import { CountUp } from '@/components/ui/CountUp';
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors.

- [ ] **Step 7: Manual verification**

```bash
npm run dev
```

On `http://localhost:3000` at desktop width:
- Scroll to the hero stats row — confirm `24/7`, `<60s`, `100%` count up from 0 once scrolled into view.
- Scroll to "How It Works" — confirm the section pins and the 4 steps crossfade as you scroll, with the phone-mockup icon changing per step and progress dots updating.
- Scroll to "Vision" — confirm `10,000+`, `24/7`, `< 60s`, `0` count up.
- Confirm Solution cards now have a subtle glass background and lift on hover.
- Resize to mobile width — confirm How It Works falls back to 4 stacked cards (no pinning).

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire pinned how-it-works and count-up stats into homepage"
```

---

### Task 9: Navbar entrance + Footer polish

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: nothing new from earlier tasks (framer-motion only, already a dependency).

- [ ] **Step 1: Add slide-down entrance to Navbar**

In `components/Navbar.tsx`, add the `motion` import:

```typescript
import { motion } from 'framer-motion';
```

Change the `<header>` element (`components/Navbar.tsx:34-40`) from a plain `<header>` to a `motion.header`:

```typescript
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-cream/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
```

And change the closing `</header>` (`components/Navbar.tsx:99`) to `</motion.header>`.

- [ ] **Step 2: Convert Footer to a client component with stagger-in**

`components/Footer.tsx` is currently a server component. Add `'use client'` at the top and wrap the columns in `AnimateIn`.

At the top of the file, add:

```typescript
'use client';

import { AnimateIn } from './AnimateIn';
```

Wrap the brand column (`components/Footer.tsx:24-33`):

```typescript
          <AnimateIn className="md:col-span-5">
            <Logo variant="reversed" iconSize={36} />
            <p className="text-caption uppercase tracking-widest text-brand-muted mt-4">
              Automated Printing, Anytime, Anywhere
            </p>
            <p className="text-[15px] text-brand-cream/60 mt-6 max-w-sm leading-relaxed">
              India&apos;s first patented smart printing kiosk network.
              Building the future of self-service printing infrastructure.
            </p>
          </AnimateIn>
```

Wrap the link-column map (`components/Footer.tsx:36-54`) — add a small stagger delay per column and wrap each column's contents in `AnimateIn`:

```typescript
          {Object.entries(footerLinks).map(([heading, links], i) => (
            <AnimateIn key={heading} delay={0.1 + i * 0.08} className="md:col-span-2">
              <h3 className="text-caption uppercase tracking-widest text-brand-cream/40 mb-4">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-brand-cream/70 hover:text-brand-orange transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          ))}
```

Wrap the contact column (`components/Footer.tsx:56-75`):

```typescript
          <AnimateIn delay={0.26} className="md:col-span-3">
            <h3 className="text-caption uppercase tracking-widest text-brand-cream/40 mb-4">
              Get In Touch
            </h3>
            <div className="space-y-3 text-[15px] text-brand-cream/70">
              <a
                href="mailto:work@vendoprint.in"
                className="block hover:text-brand-orange transition-colors"
              >
                work@vendoprint.in
              </a>
              <p className="leading-relaxed">
                No. 47/60/1, Ground Floor,<br />
                2nd Main Road, KSRTC Layout,<br />
                Chikkalasandra, Bangalore South,<br />
                Bangalore - 560061, Karnataka
              </p>
            </div>
          </AnimateIn>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors.

- [ ] **Step 4: Manual verification**

```bash
npm run dev
```

Reload `http://localhost:3000` — confirm the navbar slides down from above on load (slight delay). Scroll to the footer — confirm its columns fade/slide in as they enter view, and footer links nudge right on hover.

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx components/Footer.tsx
git commit -m "feat: add navbar entrance animation and footer scroll reveal"
```

---

### Task 10: How It Works page — wire full-variant scroll story

**Files:**
- Modify: `app/how-it-works/page.tsx`

**Interfaces:**
- Consumes: `<HowItWorksScroll variant="full" />` (Task 7).

- [ ] **Step 1: Replace the expanded steps section**

Replace `app/how-it-works/page.tsx:85-134` (the `{/* ═══════════ STEPS (EXPANDED) ═══════════ */}` section) with:

```typescript
      {/* ═══════════ STEPS (EXPANDED) ═══════════ */}
      <section className="section-padding section-y bg-white border-t border-brand-border overflow-hidden">
        <HowItWorksScroll variant="full" />
      </section>
```

Note: this removes the now-unused `QrCode`, `Upload`, `CreditCard`, `PackageCheck` imports from this file's top-level import list at `app/how-it-works/page.tsx:5-18` — remove those four from the `lucide-react` import (keep `ShieldCheck`, `Lock`, `Trash2`, `Eye`, `ArrowRight`, `BarChart3`, `Wrench`, `Zap`, since those are still used further down the page).

- [ ] **Step 2: Add the import**

At the top of `app/how-it-works/page.tsx`, add:

```typescript
import { HowItWorksScroll } from '@/components/sections/HowItWorksScroll';
```

- [ ] **Step 3: Upgrade the location-owner cards to glass style**

In `app/how-it-works/page.tsx:218-231` (the "For Location Owners" 3-item grid), change `"card flex gap-4 items-start"` to `"card-glass flex gap-4 items-start"`.

- [ ] **Step 4: Upgrade the FAQ cards to glass style**

In `app/how-it-works/page.tsx:252-263` (the FAQ list), change `"card"` to `"card-glass"`.

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors (confirms the removed lucide imports didn't break anything and no unused-import lint error).

- [ ] **Step 6: Manual verification**

```bash
npm run dev
```

Open `http://localhost:3000/how-it-works` at desktop width — confirm the steps section pins for a longer scroll distance (400vh) than the homepage's compact version, crossfading through all 4 steps. Confirm FAQ and location-owner cards have the glass hover effect.

- [ ] **Step 7: Commit**

```bash
git add app/how-it-works/page.tsx
git commit -m "feat: use full pinned scroll story on how-it-works page"
```

---

### Task 11: About page polish

**Files:**
- Modify: `app/about/page.tsx`

**Interfaces:**
- Consumes: `.card-glass` (Task 2).

- [ ] **Step 1: Upgrade team cards to glass style**

In `app/about/page.tsx:161-178` (the team grid), change `"card text-center"` to `"card-glass text-center"`.

- [ ] **Step 2: Animate the timeline line drawing in**

In `app/about/page.tsx:118-121`, the timeline track is a static absolutely-positioned div:

```typescript
        <div className="max-w-3xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-2 bottom-2 w-px bg-brand-border" />
```

Replace it with a version that scales in on scroll using `AnimateIn`'s existing pattern (framer-motion `whileInView`, no GSAP needed for a single-element reveal):

```typescript
        <div className="max-w-3xl">
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-[23px] top-2 bottom-2 w-px bg-brand-border origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
```

Add the import at the top of the file:

```typescript
import { motion } from 'framer-motion';
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors.

- [ ] **Step 4: Manual verification**

```bash
npm run dev
```

Open `http://localhost:3000/about` — scroll to the Milestones section, confirm the vertical timeline line draws downward as it enters view, then the milestone rows stagger in (existing `AnimateIn` behavior, unchanged). Confirm team cards have the glass hover effect.

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: polish about page timeline and team cards"
```

---

### Task 12: Partner page polish

**Files:**
- Modify: `app/partner/page.tsx`

**Interfaces:**
- Consumes: `.card-glass` (Task 2).

- [ ] **Step 1: Upgrade location cards to glass style**

In `app/partner/page.tsx:103-112` (the Ideal Locations grid), change `"card flex gap-4 items-center"` to `"card-glass flex gap-4 items-center"`.

- [ ] **Step 2: Upgrade the submitted-confirmation card**

In `app/partner/page.tsx:151` change `"card text-center py-16"` to `"card-glass text-center py-16"`.

- [ ] **Step 3: Add a connecting line under the 4-step process**

Replace the steps grid wrapper (`app/partner/page.tsx:124`) from:

```typescript
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl">
```

to a relatively-positioned wrapper with a connecting line behind it:

```typescript
        <div className="relative max-w-5xl">
          <motion.div
            className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-brand-border origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
```

And close the extra wrapping `<div>` after the existing `</div>` that currently closes the grid (`app/partner/page.tsx:136`) — add one more `</div>` right after it, so the structure is:

```typescript
          </div>
        </div>
```

Add the import at the top of the file:

```typescript
import { motion } from 'framer-motion';
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors. Pay attention to matching JSX tags — the grid `<div>` now has one extra wrapping `<div>` that must be closed.

- [ ] **Step 5: Manual verification**

```bash
npm run dev
```

Open `http://localhost:3000/partner` — scroll to "How partnership works", confirm a thin horizontal line draws left-to-right behind the 4 step numbers on desktop width (hidden on mobile). Confirm location cards and the post-submit confirmation card have the glass hover effect.

- [ ] **Step 6: Commit**

```bash
git add app/partner/page.tsx
git commit -m "feat: polish partner page with connecting line and glass cards"
```

---

### Task 13: Contact page polish

**Files:**
- Modify: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `.card-glass` (Task 2).

- [ ] **Step 1: Upgrade the submitted-confirmation card**

In `app/contact/page.tsx:85` change `"card text-center py-16"` to `"card-glass text-center py-16"`.

- [ ] **Step 2: Give the map embed a glass-style frame**

In `app/contact/page.tsx:67`, change:

```typescript
              <div className="rounded-brand overflow-hidden border border-brand-border h-[280px]">
```

to:

```typescript
              <div className="rounded-brand overflow-hidden border border-brand-border/70 shadow-[0_1px_2px_rgba(22,19,15,0.04)] h-[280px]">
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors.

- [ ] **Step 4: Manual verification**

```bash
npm run dev
```

Open `http://localhost:3000/contact` — confirm the page loads with the existing fade-in behavior intact and the map embed has a subtle shadow frame.

- [ ] **Step 5: Commit**

```bash
git add app/contact/page.tsx
git commit -m "polish: apply glass card style to contact page"
```

---

### Task 14: Blog page polish

**Files:**
- Modify: `app/blog/page.tsx`

**Interfaces:**
- Consumes: `.card-glass` (Task 2).

- [ ] **Step 1: Upgrade the coming-soon card**

In `app/blog/page.tsx:43` change `"card max-w-lg text-center mx-auto py-16"` to `"card-glass max-w-lg text-center mx-auto py-16"`.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: succeeds, zero errors.

- [ ] **Step 3: Manual verification**

```bash
npm run dev
```

Open `http://localhost:3000/blog` — confirm the coming-soon card has the glass hover effect.

- [ ] **Step 4: Commit**

```bash
git add app/blog/page.tsx
git commit -m "polish: apply glass card style to blog page"
```

---

### Task 15: Full-site verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

```bash
npm test
```

Expected: all vitest suites pass (`scrollProgress`, `countUp`, `tilt`, `parallax`, `stepProgress`).

- [ ] **Step 2: Run a full production build**

```bash
npm run build
```

Expected: succeeds, zero errors, zero type errors.

- [ ] **Step 3: Manual pass across all 6 pages at desktop width**

```bash
npm run dev
```

Visit `/`, `/about`, `/how-it-works`, `/partner`, `/contact`, `/blog`. For each: confirm the page loads without console errors, scroll-triggered reveals fire once per element (not repeatedly), glass cards lift and glow on hover, and navigation between pages doesn't leave any orphaned `ScrollTrigger` pins (scroll partway down `/how-it-works`, then click to `/about` and confirm `/about` scrolls normally with no leftover pinned/stuck section).

- [ ] **Step 4: Manual pass at mobile width (< 1024px, use dev tools device toolbar)**

Confirm: hero tilt is disabled, How It Works falls back to stacked cards (both homepage and `/how-it-works`), partner's connecting line is hidden, no layout overflow/horizontal scrollbar on any page.

- [ ] **Step 5: Reduced-motion pass**

Enable "Reduce motion" in OS accessibility settings, reload each page. Confirm hero and How It Works content is visible immediately (no stuck-at-opacity-0 elements), count-up numbers show their final value immediately rather than animating.

- [ ] **Step 6: Final commit (if any fixes were needed during verification)**

```bash
git add -A
git commit -m "fix: address issues found in full-site verification pass"
```

If no fixes were needed, skip this step — nothing to commit.
