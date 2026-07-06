# Vendoprint — Business Website

Next.js 14 website for [vendoprint.in](https://vendoprint.in).

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.tsx            # Home
  about/page.tsx      # About
  how-it-works/page.tsx  # How It Works
  partner/page.tsx    # Partner (with enquiry form)
  blog/page.tsx       # Blog (empty state)
  contact/page.tsx    # Contact (with form + map)
  privacy/page.tsx    # Privacy Policy
  terms/page.tsx      # Terms of Service
  layout.tsx          # Root layout (fonts, nav, footer, schema)
  globals.css         # Tailwind + brand styles

components/
  Navbar.tsx          # Sticky nav with mobile menu
  Footer.tsx          # Full footer with links
  Logo.tsx            # Brand logo SVG component (all variants)
  AnimateIn.tsx       # Scroll animation wrapper

lib/
  seo.ts             # Meta generators, schema markup utilities

public/images/
  kiosk-hero.png     # Kiosk render (included)
  og-default.jpg     # TODO: Create 1200x630 OG image
  icon.svg           # TODO: SVG favicon from brand
  apple-touch-icon.png  # TODO: 180x180 touch icon
  icon-192.png       # TODO: PWA icon
  icon-512.png       # TODO: PWA icon
  favicon.ico        # TODO: ICO favicon
```

## Before Deploying

1. **Add missing images** (marked TODO above)
2. **Connect forms** — Partner and Contact forms currently use client-side state only. Connect to your backend API, Formspree, or email service
3. **Google Maps** — Update the iframe `src` in `contact/page.tsx` with your actual Google Maps embed URL
4. **Google Analytics** — Add GA4 measurement ID to layout.tsx
5. **Google Search Console** — Add verification code to layout.tsx metadata
6. **Team bios** — Add bios in `about/page.tsx` team array
7. **Team photos** — Replace the placeholder icons with actual photos

## Build & Deploy

```bash
npm run build    # Builds site + generates sitemap.xml + robots.txt
npm run start    # Production server
```

### Deploy to Vercel (recommended)
```bash
npx vercel
```

### Deploy to GoDaddy
Build the site, then upload the `out/` directory (add `output: 'export'` to next.config.js for static export).

## Brand Tokens

| Token | Value |
|-------|-------|
| Primary Dark | `#16130F` |
| Accent Orange | `#FF8200` |
| Cream BG | `#FAF6EF` |
| Muted Text | `#6E6659` |
| Border | `#DDD5C8` |
| Heading Font | Sora ExtraBold |
| Body Font | Archivo Medium |

## SEO Features

- Auto-generated `sitemap.xml` via next-sitemap
- `robots.txt` with proper directives
- Schema markup: Organization, LocalBusiness, Product, FAQ, BreadcrumbList
- Open Graph + Twitter Card meta on every page
- GEO meta tags (Bangalore, Karnataka, India)
- `hreflang="en-IN"` on html tag
- Canonical URLs on every page
- Semantic HTML throughout
