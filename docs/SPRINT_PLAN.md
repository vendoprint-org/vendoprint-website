# Vend-O-Print — Website Sprint Plan

> One **sprint = one Claude session**. Every sprint ends with at least one section/page
> built, reviewed, and **merged to the cloud (main → Vercel)**. Nothing is left half-done
> across a session boundary.

## Decisions locked (2026-07-10)
- **Scope:** Full build — marketing homepage (Cat 7) + inner pages (Cat 8) + dashboard/web-app (Cat 9).
- **Brand source of truth:** Category 10 Design System kit.
  - Font: **Plus Jakarta Sans** (replaces Sora/Archivo)
  - Orange **#F57C20**, Charcoal **#0D0F14**, plus Cat 10 gray + semantic palette
  - 8px spacing base · radius 4/8/12/16/24/32 · shadow sm/md/lg/xl
- **Assets:** Full high-res PNG/SVG library delivered **before Sprint 1**, placed in
  `/public/assets/vendoprint/` (hero, illustrations, backgrounds, icons, 3d-assets, bento).

## Estimate: **~19 sprints** across 5 phases

---

### Phase 0 — Foundation (1 sprint)
| # | Sprint | Merge deliverable |
|---|--------|-------------------|
| 1 | **Design System migration + asset pipeline** | Tailwind tokens → Cat 10 (font, colors, spacing, radius, shadow); core UI primitives (Button, Card, Badge, Input/Select/Toggle, Tabs, Pagination, Accordion, Alert/Toast); asset folder + WebP pipeline; Lenis smooth scroll + reduced-motion guard |

### Phase 1 — Marketing Homepage · Cat 7 (6 sprints)
| # | Sprint | Sections merged |
|---|--------|-----------------|
| 2 | Navbar + Hero | Sticky glass navbar, hero with kiosk render + floating cards + stats bar |
| 3 | Trust strip + Features | Patent/trust logo strip, "Everything you need" feature grid |
| 4 | How It Works + Feature Bento | 4-step process, bento feature grid (Cat 5) |
| 5 | Product Showcase + Technology | Kiosk showcase cards, dark technology/cloud-infra section |
| 6 | Use Cases + Locations + Statistics | Use-case cards, India coverage map, impact/stats section |
| 7 | Testimonials + Pricing/ROI + FAQ + Final CTA + Newsletter + Footer | Remaining homepage blocks + dark footer |

### Phase 2 — Inner Pages · Cat 8 (4 sprints)
| # | Sprint | Pages merged |
|---|--------|--------------|
| 8 | About + Solutions | Mission, journey timeline, leadership; solutions tabs + category cards |
| 9 | How It Works page + Locations page | Full pinned scroll story; map, popular cities, request-a-kiosk |
| 10 | Resource/Blog | Article grid, category filters, article cards |
| 11 | Contact + Partner polish | Forms, glass cards, connecting-line CTA |

### Phase 3 — Dashboard / Web App · Cat 9 (6 sprints)
| # | Sprint | Screens merged |
|---|--------|----------------|
| 12 | App shell + login | Sidebar nav, top bar, app-level tables/charts primitives; login screen |
| 13 | Dashboard Overview | Stat cards, prints-trend chart, kiosk-status donut, alerts panel |
| 14 | Kiosk Management + Kiosk Detail | Kiosk list/table, status indicators, detail page |
| 15 | Transactions + Print Jobs | Transaction table, payment-method chart, print-jobs table |
| 16 | Analytics + Alerts/Notifications | Analytics views, alerts feed |
| 17 | User Management + Settings + Mobile teaser | User table/roles, settings tabs, mobile app teaser + responsive pass |

### Phase 4 — QA, Polish & Launch (2 sprints)
| # | Sprint | Merge deliverable |
|---|--------|-------------------|
| 18 | Performance + accessibility | WebP/lazy-load/preload, Lighthouse pass, WCAG 2.1 AA, keyboard nav, reduced-motion audit |
| 19 | Cross-device QA + SEO + launch checklist | Full QA matrix, metadata/sitemap/schema, final launch checklist sign-off |

---

## Per-sprint workflow
1. Pull latest `main`, create a feature branch.
2. Build the section(s) against the matching reference sheet + real assets.
3. Responsive (mobile/tablet/desktop/large) + motion + reduced-motion.
4. Self-review + Lighthouse/lint check.
5. Commit, open PR, merge to `main` → auto-deploy to Vercel (vendoprint.in).

## Notes / risks
- Dashboard (Phase 3) is the largest track — could be data-mocked now, wired to real APIs later.
- If a delivered asset is missing/low-res, that section slips to the next sprint rather than shipping unpolished.
- Sprints can be resequenced on your priority (e.g., pull Locations map earlier).
