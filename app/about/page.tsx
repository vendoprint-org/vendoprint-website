'use client';

import { motion } from 'framer-motion';
import { AnimateIn } from '@/components/AnimateIn';
import { breadcrumbSchema } from '@/lib/seo';
import { User } from 'lucide-react';

const milestones = [
  {
    year: '2024',
    title: 'Idea Validated',
    desc: 'Problem-solution fit confirmed across colleges and co-working spaces.',
  },
  {
    year: '2025',
    title: 'Company Incorporated',
    desc: 'Vendoprint Pvt Ltd registered. Patent filed for Smart Slot-Sorting System.',
  },
  {
    year: '2026',
    title: 'Patent Granted & MVP',
    desc: 'Patent granted. MVP hardware in development. Software architecture locked. First pilot planned.',
  },
  {
    year: '2027',
    title: 'Commercial Launch',
    desc: 'First 100 kiosks across Bangalore.',
  },
  {
    year: '2030',
    title: '10,000+ Kiosks',
    desc: 'Nationwide network across India.',
  },
];

const team = [
  {
    name: 'Purushottam N K',
    role: 'Founder & CEO',
    bio: '', // Add bio here
  },
  {
    name: 'Girish J',
    role: 'CTO',
    bio: '', // Add bio here
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
            ])
          ),
        }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="section-padding pt-32 pb-20 md:pt-40 md:pb-28">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">About Vendoprint</p>
            <h1 className="heading-display mb-6">
              We&apos;re not fixing printing. We&apos;re replacing it.
            </h1>
            <p className="body-text max-w-2xl">
              Vendoprint Private Limited is a Bangalore-based deep tech startup
              building India&apos;s first network of fully automated, patented
              printing kiosks. No operators. No storefronts. Just intelligent
              machines that print, sort, and deliver&nbsp;&mdash; anytime, anywhere.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ═══════════ THESIS ═══════════ */}
      <section className="section-padding section-y bg-white border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">Why This Exists</p>
            <h2 className="heading-section mb-6">The thesis</h2>
            <p className="body-text mb-4">
              India&apos;s print services market is massive, yet it runs almost
              entirely on manual labour&nbsp;&mdash; small shops with fixed hours, no
              privacy, and no scalability. Every other vending category (beverages,
              snacks, coffee) has been automated. Printing hasn&apos;t.
            </p>
            <p className="body-text">
              We believe the reason is simple: nobody solved the last-mile hardware
              problem of sorting and securely delivering prints to individual users
              without an attendant. Our patented Smart Slot-Sorting System does
              exactly that.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ═══════════ TIMELINE ═══════════ */}
      <section className="section-padding section-y border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-3">Milestones</p>
            <h2 className="heading-section">Where we are</h2>
          </div>
        </AnimateIn>

        <div className="max-w-3xl">
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-[23px] top-2 bottom-2 w-px bg-brand-border origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <AnimateIn key={m.year} delay={i * 0.08}>
                  <div className="flex gap-6 items-start">
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-sora font-bold ${
                          i <= 2
                            ? 'bg-brand-orange text-white'
                            : 'bg-brand-surface text-brand-muted border border-brand-border'
                        }`}
                      >
                        {m.year.slice(2)}
                      </div>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-sora font-bold text-lg mb-1">
                        {m.year} &mdash; {m.title}
                      </h3>
                      <p className="body-text">{m.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TEAM ═══════════ */}
      <section className="section-padding section-y bg-white border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-3">The People</p>
            <h2 className="heading-section">Founding Team</h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          {team.map((member, i) => (
            <AnimateIn key={member.name} delay={i * 0.1}>
              <div className="card-glass text-center">
                <div className="w-20 h-20 rounded-full bg-brand-surface flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-brand-muted" />
                </div>
                <h3 className="font-sora font-bold text-xl">{member.name}</h3>
                <p className="text-brand-orange font-medium text-sm mt-1">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="body-text text-sm mt-3">{member.bio}</p>
                )}
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ═══════════ COMPANY DETAILS ═══════════ */}
      <section className="section-padding section-y border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Registered Entity</p>
            <h2 className="heading-section mb-8">Company Details</h2>
            <div className="space-y-4 text-body-lg text-brand-muted">
              <p>
                <span className="font-semibold text-brand-black">Registered Name:</span>{' '}
                Vendoprint Private Limited
              </p>
              <p>
                <span className="font-semibold text-brand-black">Registered Office:</span>{' '}
                No. 47/60/1, Ground Floor, 2nd Main Road, KSRTC Layout,
                Chikkalasandra, Bangalore South, Bangalore&nbsp;-&nbsp;560061, Karnataka
              </p>
              <p>
                <span className="font-semibold text-brand-black">Email:</span>{' '}
                <a href="mailto:work@vendoprint.in" className="text-brand-orange hover:underline">
                  work@vendoprint.in
                </a>
              </p>
              <p>
                <span className="font-semibold text-brand-black">Website:</span>{' '}
                <a href="https://vendoprint.in" className="text-brand-orange hover:underline">
                  vendoprint.in
                </a>
              </p>
            </div>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
