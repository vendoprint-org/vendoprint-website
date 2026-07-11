import Image from 'next/image';
import { AnimateIn } from '@/components/AnimateIn';

const MODULES = [
  { label: 'Touchscreen display' },
  { label: 'Payment terminal' },
  { label: 'Structural frame' },
  { label: 'Print engine' },
  { label: 'Secure side panel' },
  { label: 'Enclosed housing' },
];

export function BuildQuality() {
  return (
    <section className="section-padding section-y bg-gray-50 border-t border-gray-200">
      <AnimateIn>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-3">Precision engineering</p>
          <h2 className="heading-section mb-5">Built module by module</h2>
          <p className="body-text">
            Every Vend-O-Print kiosk is engineered as independent, serviceable modules&nbsp;&mdash;
            display, payment terminal, print engine, and enclosed housing&nbsp;&mdash; for fast
            maintenance and industrial-grade reliability.
          </p>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <div className="rounded-lg border border-gray-200 bg-white p-6 md:p-10 shadow-ds-sm max-w-4xl mx-auto">
          <Image
            src="/assets/vendoprint/illustrations/kiosk-exploded-structure.webp"
            alt="Exploded view of Vend-O-Print kiosk internal modules"
            width={700}
            height={260}
            className="w-full h-auto"
          />
        </div>
      </AnimateIn>

      <AnimateIn delay={0.2}>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-8 max-w-4xl mx-auto">
          {MODULES.map((m) => (
            <div key={m.label} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-small text-slate">{m.label}</span>
            </div>
          ))}
        </div>
      </AnimateIn>
    </section>
  );
}
