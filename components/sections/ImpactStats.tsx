import { AnimateIn } from '@/components/AnimateIn';
import { CountUp } from '@/components/ui/CountUp';
import { IMPACT_STATS } from '@/lib/marketing';

export function ImpactStats() {
  return (
    <section className="relative section-padding section-y bg-ink overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.12] bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/vendoprint/backgrounds/03-circuit-pattern-dark.webp')" }}
        aria-hidden
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px]" aria-hidden />

      <div className="relative">
        <AnimateIn>
          <h2 className="font-display font-extrabold text-heading md:text-display text-white text-center max-w-3xl mx-auto mb-16">
            Making printing simple for everyone, everywhere.
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {IMPACT_STATS.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                {/\d/.test(stat.value) ? (
                  <CountUp
                    value={stat.value}
                    className="font-display font-extrabold text-display-lg md:text-display-xl text-primary block"
                  />
                ) : (
                  <span className="font-display font-extrabold text-display-lg md:text-display-xl text-primary block">
                    {stat.value}
                  </span>
                )}
                <p className="text-body font-semibold text-white mt-2">{stat.label}</p>
                <p className="text-small text-white/50 mt-1">{stat.note}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
