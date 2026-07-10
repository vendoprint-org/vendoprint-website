import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Building, Map, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimateIn } from '@/components/AnimateIn';
import { COVERAGE_STATS } from '@/lib/marketing';

const ICONS: LucideIcon[] = [MapPin, Building, Map];

export function Coverage() {
  return (
    <section className="section-padding section-y bg-gray-50 border-t border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <AnimateIn direction="left">
          <h2 className="heading-section mb-4">Starting in Bangalore. Built for India.</h2>
          <p className="body-text mb-10 max-w-md">
            Vend-O-Print kiosks are live in Bangalore today, with a patented platform built to
            scale to 10,000+ kiosks across India by 2030.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-10 max-w-md">
            {COVERAGE_STATS.map((stat, i) => {
              const Icon = ICONS[i];
              return (
                <div key={stat.label}>
                  <Icon size={22} className="text-primary mb-3" />
                  <p className="font-display font-extrabold text-h3 text-ink">{stat.value}</p>
                  <p className="text-small text-slate mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <Link href="/contact" className="btn-secondary">
            View All Locations
            <ArrowRight size={18} />
          </Link>
        </AnimateIn>

        <AnimateIn direction="right" className="flex flex-col items-center">
          <Image
            src="/assets/vendoprint/illustrations/india-map-light.webp"
            alt="Illustration of Vend-O-Print's 2030 vision for a nationwide kiosk network"
            width={720}
            height={640}
            className="w-full max-w-lg h-auto"
          />
          <p className="text-caption uppercase tracking-widest text-slate mt-3">
            Our 2030 vision — not current coverage
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
