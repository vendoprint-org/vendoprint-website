import Image from 'next/image';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { HeroKiosk } from '@/components/HeroKiosk';
import { HowItWorksScroll } from '@/components/sections/HowItWorksScroll';
import { CountUp } from '@/components/ui/CountUp';
import { productSchema, breadcrumbSchema } from '@/lib/seo';
import {
  ShieldCheck,
  Cpu,
  CloudCog,
  ArrowRight,
} from 'lucide-react';

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
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Home', path: '/' }])
          ),
        }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-brand-cream to-brand-surface" />
        {/* Accent glow */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[120px]" />

        <div className="relative section-padding w-full pt-28 pb-20 md:pt-32 md:pb-28">
          <HeroKiosk />

          <AnimateIn delay={0.4}>
            <div className="mt-16 pt-10 border-t border-brand-border flex flex-wrap gap-x-12 gap-y-6">
              {[
                { value: '24/7', label: 'Always Available' },
                { value: '<60s', label: 'Print Time' },
                { value: '100%', label: 'Contactless' },
              ].map((stat) => (
                <div key={stat.label}>
                  <CountUp value={stat.value} className="font-sora font-extrabold text-3xl text-brand-orange" />
                  <p className="text-caption uppercase tracking-widest text-brand-muted mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════ PROBLEM ═══════════ */}
      <section className="section-padding section-y border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">The Problem</p>
            <h2 className="heading-section mb-6">
              Printing shouldn&apos;t be this hard
            </h2>
            <p className="body-text">
              India has 1.4 billion people and almost no reliable self-service
              printing infrastructure. Students sprint across campus for a single
              printout. Professionals miss deadlines at understaffed copy shops.
              Travelers scramble at airports for a boarding pass. The Indian print
              services market still runs on walk-in shops with fixed hours, manual
              handling, and zero privacy.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ═══════════ SOLUTION ═══════════ */}
      <section className="section-padding section-y bg-white border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-3">The Solution</p>
            <h2 className="heading-section mb-6">
              A vending machine, but for printing
            </h2>
            <p className="body-text">
              Vendoprint kiosks are fully automated, 24/7 self-service printing
              stations. Patented hardware. Cloud-connected software. No operator
              needed. Place them anywhere&nbsp;&mdash; colleges, airports, hospitals,
              co-working spaces, metro stations&nbsp;&mdash; and they just work.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: 'Patented Smart Slot System',
              desc: 'Your print drops into a secure, sorted slot. No mix-ups with other users\u2019 documents. No one else can access your pages.',
            },
            {
              icon: Cpu,
              title: 'Zero Human Dependency',
              desc: 'No attendant. No shopkeeper. The kiosk handles everything\u2009\u2014\u2009from file upload to payment to print delivery.',
            },
            {
              icon: CloudCog,
              title: 'Cloud-First Architecture',
              desc: 'Remote monitoring, automatic supply alerts, usage analytics, and OTA updates. Every kiosk is a connected node in a smart network.',
            },
          ].map((card, i) => (
            <AnimateIn key={card.title} delay={i * 0.1}>
              <div className="card-glass h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-5">
                  <card.icon size={24} className="text-brand-orange" />
                </div>
                <h3 className="font-sora font-bold text-subheading mb-3">
                  {card.title}
                </h3>
                <p className="body-text flex-1">{card.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS (MINI) ═══════════ */}
      <section className="section-padding section-y border-t border-brand-border overflow-hidden">
        <HowItWorksScroll variant="compact" />
      </section>

      {/* ═══════════ VISION / NUMBERS ═══════════ */}
      <section className="section-padding section-y bg-brand-black text-brand-cream">
        <AnimateIn>
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">The Vision</p>
            <h2 className="font-sora font-extrabold text-heading md:text-display text-brand-cream">
              Building India&apos;s printing infrastructure
            </h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {[
            { number: '10,000+', label: 'Kiosks planned across India by 2030' },
            { number: '24/7', label: 'Always on. No holidays. No lunch breaks.' },
            { number: '< 60s', label: 'Average print-to-collect time' },
            { number: '0', label: 'Human operators needed per kiosk' },
          ].map((stat, i) => (
            <AnimateIn key={stat.number} delay={i * 0.1}>
              <div className="text-center">
                <CountUp
                  value={stat.number}
                  className="font-sora font-extrabold text-display-lg md:text-display-xl text-brand-orange block"
                />
                <p className="text-brand-cream/60 text-body mt-2">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="section-padding section-y border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-section mb-4">
              Interested in bringing Vendoprint to your location?
            </h2>
            <p className="body-text mb-8">
              We&apos;re partnering with colleges, corporates, malls, airports,
              and public spaces across India.
            </p>
            <Link href="/partner" className="btn-primary">
              Partner With Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
