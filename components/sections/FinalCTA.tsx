import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimateIn } from '@/components/AnimateIn';

export function FinalCTA() {
  return (
    <section className="relative section-padding section-y bg-ink overflow-hidden">
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-primary/10 blur-[130px]" aria-hidden />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimateIn direction="left">
          <h2 className="font-display font-extrabold text-heading md:text-display text-white mb-5 max-w-lg">
            Ready to bring smart printing to your location?
          </h2>
          <p className="text-body-lg text-white/60 mb-8 max-w-md">
            Partner with Vend-O-Print and provide a world-class printing experience to your
            students, staff, and visitors.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/partner" className="btn-primary">
              Partner With Us
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-7 py-3.5 text-body font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
            >
              Talk to Our Team
            </Link>
          </div>
        </AnimateIn>

        <AnimateIn direction="right" className="flex justify-center lg:justify-end">
          <Image
            src="/assets/vendoprint/illustrations/india-map-glow.webp"
            alt="Vend-O-Print's vision for a nationwide kiosk network by 2030"
            width={720}
            height={620}
            className="w-full max-w-md h-auto"
          />
        </AnimateIn>
      </div>
    </section>
  );
}
