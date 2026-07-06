# Vendoprint Site — Animation & Pseudo-3D Upgrade

**Date:** 2026-07-06
**Status:** Approved, pending implementation plan

## Problem

Current site (light cream/orange theme) uses only framer-motion `whileInView` fades via a single `AnimateIn` wrapper. Static PNG hero, no parallax, no 3D, no scroll-driven storytelling. Site feels ordinary and doesn't match the "premium/cinematic" ambition in the project's CLAUDE.md (which references cornrevolution.resn.global as the motion benchmark), even though the CLAUDE.md's *dark teal* theme is explicitly not being adopted here — user wants to keep the light cream/orange brand and elevate it instead.

Scope: all 6 pages (home, about, how-it-works, partner, blog, contact) get the same depth of treatment. Nav/footer included.

## Decisions

- **Theme:** Keep existing light cream/orange brand. Elevate via typography, shadows, glass cards, motion — no dark-mode switch.
- **3D approach:** No true 3D (no react-three-fiber, no GLB model). Fake-3D via parallax depth layers + mouse-tilt on the existing `kiosk-hero.png`. Motion kept subtle (see Hero section below) — first draft was too aggressive and was dialed down.
- **Animation stack:** Add GSAP + `@gsap/react` (ScrollTrigger) alongside existing framer-motion, rather than replacing it. GSAP is used specifically where framer-motion is weak: pinned/scrubbed scroll storytelling. Framer-motion stays for hero tilt, card reveals, hovers, page-level fades.
- **Asset:** Reuse existing `/public/images/kiosk-hero.png` as-is. No new photography/renders in this pass.
- **Reduced motion / mobile:** All heavy motion (tilt, parallax, pin+scrub) respects `prefers-reduced-motion` and is disabled on touch devices / below 1024px width, falling back to simple fade/stagger reveals.
- **Cleanup:** Delete the stray `{app...}` junk directory at repo root (leftover from an earlier broken scaffold command, unrelated to any current work).

## Architecture

### New files
- `lib/gsap.ts` — client-only GSAP + ScrollTrigger registration (singleton import, guarded for SSR).
- `components/ui/ScrollProgress.tsx` — fixed thin top progress bar, fill width driven by scroll position, accent-orange.
- `components/HeroKiosk.tsx` — extracted from `app/page.tsx`, wraps `kiosk-hero.png` in the parallax/tilt treatment (see below). Used only on homepage hero.
- `components/ui/CountUp.tsx` — small shared hook/component for count-up-on-view numbers (24/7, <60s, 100%, 10,000+ etc.), used in hero stats bar and Vision/numbers section.
- `components/sections/HowItWorksScroll.tsx` — the pinned GSAP scroll-story component, shared by homepage's mini "How It Works" section and the dedicated `/how-it-works` page's centerpiece.

### Modified files
- `app/page.tsx` — swap inline hero image block for `<HeroKiosk />`, swap mini how-it-works grid for `<HowItWorksScroll variant="compact" />`, upgrade `.card` usages to glass style, wire stats bar with `CountUp`.
- `app/how-it-works/page.tsx` — use `<HowItWorksScroll variant="full" />` as centerpiece, keep existing supporting content below with upgraded reveal treatment.
- `app/about/page.tsx`, `app/partner/page.tsx`, `app/contact/page.tsx`, `app/blog/page.tsx` — apply glass card style, `ScrollTrigger.batch` stagger reveals, hover glows; Partner's 3-card grid + step timeline gets connecting-line draw-in animation.
- `components/AnimateIn.tsx` — kept for simple fades; no framer-motion removal.
- `components/Navbar.tsx` — add slide-down entrance animation on mount (0.3s delay).
- `components/Footer.tsx` — stagger-in columns on scroll into view, social icons hover → accent + lift.
- `app/globals.css` — add `.card-glass` style (semi-transparent white, soft layered shadow, border), reduced-motion media query guards.
- `app/layout.tsx` — mount `<ScrollProgress />` globally.

### Deleted
- Stray `{app...}` junk directory at repo root.

## Component details

### HeroKiosk (parallax/tilt)
Three-layer depth stack over the existing image, motion dialed subtle after user feedback:
- Back glow: parallax speed 0.6x of scroll/mouse offset.
- Kiosk image: 1x, mouse-tilt via framer-motion `useMotionValue` + `useSpring`, max ±3° rotateX/rotateY, high spring damping (calm settle, no bounce).
- Floating "Patent Granted" badge: parallax speed 0.85x, slight independent float loop (small amplitude).
- GSAP entrance timeline on mount: eyebrow → headline word-stagger → sub-headline → CTAs → kiosk scale 0.9→1 + fade, in that sequence.
- Faint grain/noise overlay, ~3% opacity, static (not animated) to keep GPU cost low.
- On scroll-out of hero, kiosk drifts slower than text (ScrollTrigger scrub) for exit parallax.
- Mobile/touch: tilt disabled, parallax collapses to plain fade+scale entrance, no grain.

### HowItWorksScroll (pinned scroll story)
- Desktop (≥1024px): ~400vh container, `ScrollTrigger.pin` + `scrub: 1`. Steps (Scan → Upload → Pay → Collect) crossfade: left = large outline step number + title + description, right = CSS phone-mockup frame (no new asset). Vertical progress dots track active step. Background tint shifts subtly per step within the existing cream palette (no hue swings outside brand).
- Mobile/tablet (<1024px): no pin; falls back to stacked cards with stagger-in, matching current mini-section behavior but nicer easing.
- Props: `variant: 'compact' | 'full'` — compact is the homepage teaser (can be a subset or same 4 steps, shorter), full is the dedicated page's centerpiece with more supporting detail around it.

### CountUp
Small reusable component: takes target number/string (handles `10,000+`, `24/7`, `<60s`, `100%` formats), animates count from 0 → target when scrolled into view once, respects reduced-motion (renders final value immediately if set).

## Testing / Verification
- `npm run build` succeeds with zero errors after each page migration.
- Manual check in browser: hero tilt responds to mouse on desktop, disabled on mobile viewport; How It Works pins and scrubs correctly on desktop, stacks on mobile; reduced-motion OS setting suppresses tilt/parallax/pin site-wide; no ScrollTrigger console warnings; Lighthouse performance not regressed materially (no new render-blocking assets — GSAP is code, not images).
- Visual pass across all 6 pages for consistent glass-card/hover/reveal treatment.

## Out of scope (explicitly not doing)
- No dark theme / teal accent switch.
- No true 3D (three.js/react-three-fiber/GLB model).
- No new photography or generated kiosk imagery.
- No removal of framer-motion.
- No backend/API/auth work (site remains static).
