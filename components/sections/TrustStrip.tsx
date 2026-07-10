import { Building2 } from 'lucide-react';
import { AnimateIn } from '@/components/AnimateIn';
import { TRUSTED_BY } from '@/lib/marketing';

export function TrustStrip() {
  return (
    <section className="section-padding py-14 md:py-16 bg-white border-b border-gray-200">
      <AnimateIn>
        <p className="text-center text-small font-medium uppercase tracking-widest text-slate mb-8">
          Built for India&apos;s campuses, offices, and public spaces
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {TRUSTED_BY.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 text-gray-400 grayscale opacity-70"
            >
              <Building2 size={22} strokeWidth={1.5} />
              <span className="font-display font-bold text-lg tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </AnimateIn>
    </section>
  );
}
