import Image from 'next/image';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { productSchema, breadcrumbSchema } from '@/lib/seo';
import {
  QrCode,
  Upload,
  CreditCard,
  PackageCheck,
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <AnimateIn>
              <div className="max-w-xl">
                <p className="eyebrow mb-4">Patented Technology</p>
                <h1 className="heading-display mb-6">
                  India&apos;s First Patented Smart Printing Kiosk
                </h1>
                <p className="body-text mb-8 max-w-lg">
                  Walk up. Scan. Print. Collect. No queues, no shopkeepers,
                  no hours&nbsp;&mdash; just your documents, ready when you are.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/partner" className="btn-primary">
                    Partner With Us
                    <ArrowRight size={18} />
                  </Link>
                  <Link href="/how-it-works" className="btn-secondary">
                    See How It Works
                  </Link>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2} direction="right">
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-lg">
                  <Image
                    src="/images/kiosk-hero.png"
                    alt="Vendoprint smart printing kiosk in a modern space"
                    width={600}
                    height={900}
                    priority
                    className="rounded-2xl shadow-2xl shadow-brand-black/10"
                  />
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -left-4 md:bottom-4 md:-left-8 bg-white rounded-brand px-5 py-3 shadow-lg border border-brand-border">
                    <p className="text-caption uppercase text-brand-orange font-semibold">Patent Granted</p>
                    <p className="text-xs text-brand-muted mt-0.5">Smart Slot-Sorting System</p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
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
              <div className="card h-full flex flex-col">
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
      <section className="section-padding section-y border-t border-brand-border">
        <AnimateIn>
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">How It Works</p>
            <h2 className="heading-section">
              Four steps. Under a minute.
            </h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: QrCode,
              step: '01',
              title: 'Scan',
              desc: 'Scan the QR code on the kiosk with your phone',
            },
            {
              icon: Upload,
              step: '02',
              title: 'Upload',
              desc: 'Select your documents. Set pages, copies, colour or B&W',
            },
            {
              icon: CreditCard,
              step: '03',
              title: 'Pay',
              desc: 'Pay instantly via UPI, card, or wallet',
            },
            {
              icon: PackageCheck,
              step: '04',
              title: 'Collect',
              desc: 'Your prints arrive in your personal secure slot',
            },
          ].map((step, i) => (
            <AnimateIn key={step.title} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-orange mx-auto mb-5 flex items-center justify-center">
                  <step.icon size={28} className="text-white" />
                </div>
                <p className="text-caption text-brand-orange font-semibold mb-2">
                  Step {step.step}
                </p>
                <h3 className="font-sora font-bold text-xl mb-2">{step.title}</h3>
                <p className="body-text text-sm">{step.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
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
                <p className="font-sora font-extrabold text-display-lg md:text-display-xl text-brand-orange">
                  {stat.number}
                </p>
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
