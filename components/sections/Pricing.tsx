import { AnimateIn } from '@/components/AnimateIn';
import { PRICING } from '@/lib/marketing';

export function Pricing() {
  return (
    <section className="section-padding section-y bg-gray-50 border-t border-gray-200">
      <AnimateIn>
        <h2 className="heading-section text-center mb-14">
          Affordable for everyone.
          <br className="hidden sm:block" /> Valuable for institutions.
        </h2>
      </AnimateIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PRICING.map((p, i) => (
          <AnimateIn key={p.title} delay={i * 0.1}>
            <div className="card h-full flex flex-col">
              <h3 className="font-display font-bold text-h5 text-ink mb-1">{p.title}</h3>
              <p className="text-small text-slate mb-4">{p.lead}</p>
              <p className="font-display font-extrabold text-display text-primary leading-none">
                {p.value}
              </p>
              <p className="text-small text-slate mt-2 mb-5">{p.unit}</p>
              <div className="mt-auto pt-5 border-t border-gray-200">
                <p className="text-small text-slate">{p.note}</p>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
