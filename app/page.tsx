import { AnimateIn } from '@/components/AnimateIn';
import { HeroKiosk } from '@/components/HeroKiosk';
import { CountUp } from '@/components/ui/CountUp';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Features } from '@/components/sections/Features';
import { HowItWorksSteps } from '@/components/sections/HowItWorksSteps';
import { ProductHighlight } from '@/components/sections/ProductHighlight';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { Coverage } from '@/components/sections/Coverage';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Newsletter } from '@/components/sections/Newsletter';
import { productSchema, breadcrumbSchema } from '@/lib/seo';

const HERO_STATS = [
  { value: '24/7', label: 'Always Available' },
  { value: '<60s', label: 'Print Time' },
  { value: '100%', label: 'Contactless' },
  { value: 'Patent', label: 'Published' },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', path: '/' }])),
        }}
      />

      {/* ═══════════ 01 · HERO ═══════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-ink">
        <div
          className="absolute inset-0 opacity-[0.15] bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/vendoprint/backgrounds/03-circuit-pattern-dark.webp')" }}
          aria-hidden
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[130px]" aria-hidden />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.07] blur-[130px]" aria-hidden />

        <div className="relative section-padding w-full pt-28 pb-20 md:pt-32 md:pb-28">
          <HeroKiosk />

          <AnimateIn delay={0.4}>
            <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap gap-x-12 gap-y-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  {/\d/.test(stat.value) ? (
                    <CountUp value={stat.value} className="font-display font-extrabold text-3xl text-primary" />
                  ) : (
                    <span className="font-display font-extrabold text-3xl text-primary">{stat.value}</span>
                  )}
                  <p className="text-caption uppercase tracking-widest text-white/50 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════ 02 · TRUST STRIP ═══════════ */}
      <TrustStrip />

      {/* ═══════════ 03 · FEATURES ═══════════ */}
      <Features />

      {/* ═══════════ 04 · HOW IT WORKS ═══════════ */}
      <HowItWorksSteps />

      {/* ═══════════ 05 · PRODUCT HIGHLIGHT ═══════════ */}
      <ProductHighlight />

      {/* ═══════════ 06 · IMPACT STATS ═══════════ */}
      <ImpactStats />

      {/* ═══════════ 07 · COVERAGE ═══════════ */}
      <Coverage />

      {/* ═══════════ 08 · FINAL CTA ═══════════ */}
      <FinalCTA />

      {/* ═══════════ 09 · NEWSLETTER ═══════════ */}
      <Newsletter />
    </>
  );
}
