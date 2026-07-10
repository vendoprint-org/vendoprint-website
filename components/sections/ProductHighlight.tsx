import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { AnimateIn } from '@/components/AnimateIn';

const BULLETS = [
  'Intuitive 24" touchscreen',
  'Multi-language support',
  'High-speed industrial printer',
  'Secure & enclosed design',
];

export function ProductHighlight() {
  return (
    <section className="section-padding section-y bg-white border-t border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <AnimateIn direction="left">
          <p className="eyebrow mb-3">Smart printing, reimagined</p>
          <h2 className="heading-section mb-5">Vend-O-Print Smart Kiosks</h2>
          <p className="body-text mb-8 max-w-lg">
            Our kiosks are built for speed, security and reliability&nbsp;&mdash; designed for
            high-traffic locations and engineered to run unattended, around the clock.
          </p>

          <ul className="space-y-4 mb-9">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-body text-ink">{b}</span>
              </li>
            ))}
          </ul>

          <Link href="/how-it-works" className="btn-secondary">
            Explore Kiosks
            <ArrowRight size={18} />
          </Link>
        </AnimateIn>

        <AnimateIn direction="right" className="relative flex justify-center">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 m-auto h-[70%] w-[70%] rounded-full bg-primary/5 blur-[90px]"
          />
          <Image
            src="/assets/vendoprint/3d-assets/kiosk-perspective-light.webp"
            alt="Vend-O-Print smart printing kiosk, three-quarter view"
            width={700}
            height={620}
            className="w-full max-w-md h-auto"
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse 78% 84% at 50% 46%, #000 62%, transparent 100%)',
              maskImage:
                'radial-gradient(ellipse 78% 84% at 50% 46%, #000 62%, transparent 100%)',
            }}
          />
        </AnimateIn>
      </div>
    </section>
  );
}
