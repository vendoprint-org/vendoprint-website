# Asset Pipeline

Raw design renders live in `/assets/` (git-ignored — kept local only).
Optimized, production-ready **WebP** files live in `/public/assets/vendoprint/` and are the
only images that ship to Vercel.

## Folder structure
```
public/assets/vendoprint/
├── hero/          # primary kiosk render + floating cards
├── illustrations/ # section illustrations (how-it-works, tech, use-cases)
├── backgrounds/   # gradients, glows, dividers, patterns
├── icons/         # feature / step / UI icons
├── 3d-assets/     # kiosk 3D marketing views
└── bento/         # bento feature-card art
```

## Convert PNG → WebP
```bash
npm run assets <srcDir> <category> [maxWidth]

# examples
npm run assets assets/Background backgrounds 2400
npm run assets assets/PNG-elements icons 512
```
- Preserves alpha, quality 82, downscales only if wider than `maxWidth`.
- Output filenames are kebab-cased automatically.

## Status
- ✅ `backgrounds/` — 20 files converted (mesh, waves, circuit, glows, dividers, gradients).
- ⏳ `PNG-elements/` (60 renders) — to be visually identified and categorized per-section during Phase 1
  (hero kiosk, icons, illustrations, 3d, bento). Named generically at source, so each is mapped
  to its semantic kebab-case name as the section that needs it is built.

## Usage in code
```tsx
import Image from 'next/image';

<Image
  src="/assets/vendoprint/backgrounds/06-orange-glow-blobs-transparent.webp"
  alt=""
  fill
  className="object-cover opacity-20"
/>
```
