import { Metadata } from 'next';
import Link from 'next/link';
import { AnimateIn } from '@/components/AnimateIn';
import { generatePageMeta, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { HowItWorksScroll } from '@/components/sections/HowItWorksScroll';
import {
  ShieldCheck,
  Lock,
  Trash2,
  Eye,
  ArrowRight,
  BarChart3,
  Wrench,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = generatePageMeta({
  title: 'How Vendoprint Works — Print in Under 60 Seconds',
  description:
    "Scan the QR, upload your docs, pay via UPI, and collect from your secure slot. See how Vendoprint's patented kiosk delivers prints in under a minute.",
  path: '/how-it-works',
});

const faqs = [
  {
    question: 'Do I need to download an app?',
    answer:
      'No. Vendoprint works entirely through your phone browser. Just scan the QR code on the kiosk and you\'re ready to go.',
  },
  {
    question: 'What file formats are supported?',
    answer:
      'PDF, JPEG, PNG, and Word documents (.doc, .docx). More formats will be added over time.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. Files are encrypted in transit and at rest, and permanently deleted after printing. We don\'t store or log your document contents.',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'UPI, debit and credit cards, and popular digital wallets. All payments are processed through secure, PCI-compliant gateways.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'How It Works', path: '/how-it-works' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="section-padding pt-32 pb-20 md:pt-40 md:pb-28">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">How It Works</p>
            <h1 className="heading-display mb-6">
              Printing without the printer guy
            </h1>
            <p className="body-text max-w-2xl">
              The full Vendoprint experience&nbsp;&mdash; from your phone to your
              hands&nbsp;&mdash; in under 60 seconds.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ═══════════ STEPS (EXPANDED) ═══════════ */}
      <section className="section-padding section-y bg-white border-t border-brand-border overflow-hidden">
        <HowItWorksScroll variant="full" />
      </section>

      {/* ═══════════ PATENTED DIFFERENCE ═══════════ */}
      <section className="section-padding section-y border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">The Patented Difference</p>
            <h2 className="heading-section mb-6">Why the slot matters</h2>
            <p className="body-text mb-4">
              Every other printing kiosk uses an open output tray. That means your
              documents mix with the next person&apos;s. It means anyone nearby can
              pick up your pages. It means no privacy, no security, and no
              accountability.
            </p>
            <p className="body-text">
              Vendoprint&apos;s patented Smart Slot-Sorting System assigns each
              print job to an isolated, secure compartment. It&apos;s the difference
              between a shared mailbox and a personal locker. And it&apos;s what
              makes truly unattended, 24/7 operation possible.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ═══════════ SECURITY ═══════════ */}
      <section className="section-padding section-y bg-brand-black text-brand-cream">
        <AnimateIn>
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-3">Security & Privacy</p>
            <h2 className="font-sora font-extrabold text-heading md:text-display text-brand-cream mb-4">
              Your files, your business
            </h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
          {[
            {
              icon: Lock,
              title: 'End-to-end encryption',
              desc: 'Files are encrypted in transit and at rest.',
            },
            {
              icon: Trash2,
              title: 'Auto-deletion',
              desc: 'Documents are permanently deleted after printing.',
            },
            {
              icon: Eye,
              title: 'No storage, no logs',
              desc: "We don't keep your files or track their contents.",
            },
            {
              icon: ShieldCheck,
              title: 'Secure slots',
              desc: 'Physical prints are accessible only by the person who ordered them.',
            },
          ].map((item, i) => (
            <AnimateIn key={item.title} delay={i * 0.1}>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-lg text-brand-cream mb-1">
                    {item.title}
                  </h3>
                  <p className="text-brand-cream/60 text-body">{item.desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ═══════════ FOR LOCATION OWNERS ═══════════ */}
      <section className="section-padding section-y border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl mb-12">
            <p className="eyebrow mb-3">For Location Owners</p>
            <h2 className="heading-section mb-6">What your space gets</h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {[
            { icon: Zap, text: 'A fully managed, maintenance-free kiosk' },
            { icon: BarChart3, text: 'Real-time dashboard with usage analytics' },
            { icon: Wrench, text: 'Vendoprint handles hardware, software, maintenance, and support' },
          ].map((item, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div className="card-glass flex gap-4 items-start">
                <item.icon size={20} className="text-brand-orange flex-shrink-0 mt-0.5" />
                <p className="body-text">{item.text}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.3}>
          <div className="mt-12">
            <Link href="/partner" className="btn-primary">
              Become a Partner
              <ArrowRight size={18} />
            </Link>
          </div>
        </AnimateIn>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="section-padding section-y bg-white border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl mb-12">
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="heading-section">Common questions</h2>
          </div>
        </AnimateIn>

        <div className="max-w-3xl space-y-6">
          {faqs.map((faq, i) => (
            <AnimateIn key={i} delay={i * 0.08}>
              <div className="card-glass">
                <h3 className="font-sora font-bold text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="body-text">{faq.answer}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>
    </>
  );
}
