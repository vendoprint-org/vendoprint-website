'use client';

import { useState } from 'react';
import { AnimateIn } from '@/components/AnimateIn';
import {
  GraduationCap,
  Building2,
  Briefcase,
  Hospital,
  Plane,
  ShoppingBag,
  BookOpen,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const locations = [
  { icon: GraduationCap, label: 'College campuses & hostels' },
  { icon: Briefcase, label: 'Co-working spaces' },
  { icon: Building2, label: 'Corporate office lobbies' },
  { icon: Hospital, label: 'Hospitals & government offices' },
  { icon: Plane, label: 'Airports & railway stations' },
  { icon: ShoppingBag, label: 'Shopping malls & retail spaces' },
  { icon: BookOpen, label: 'Libraries & community centres' },
];

const steps = [
  {
    step: '01',
    title: 'Apply',
    desc: 'Fill out the form below. Tell us about your space, location, and expected footfall.',
  },
  {
    step: '02',
    title: 'We Evaluate',
    desc: 'Our team reviews your location for viability\u2009\u2014\u2009foot traffic, power access, indoor placement, and security.',
  },
  {
    step: '03',
    title: 'Install & Launch',
    desc: 'We install the kiosk, handle all setup, and go live. You start earning from the first print.',
  },
  {
    step: '04',
    title: 'Sit Back',
    desc: 'Vendoprint manages operations, maintenance, and support. You get real-time revenue dashboards and monthly payouts.',
  },
];

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to your backend API or email service
    setSubmitted(true);
  };

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="section-padding pt-32 pb-20 md:pt-40 md:pb-28">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">Partner With Us</p>
            <h1 className="heading-display mb-6">
              Put a Vendoprint in your space
            </h1>
            <p className="body-text max-w-2xl">
              Earn passive revenue from India&apos;s first patented self-service
              printing kiosk. We handle everything.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ═══════════ WHY PARTNER ═══════════ */}
      <section className="section-padding section-y bg-white border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl">
            <h2 className="heading-section mb-6">
              You provide the space. We provide the business.
            </h2>
            <p className="body-text">
              Vendoprint kiosks are fully managed&nbsp;&mdash; we handle
              installation, maintenance, consumables, software, and customer
              support. You provide a location with foot traffic and power.
              Revenue is shared from day one.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ═══════════ IDEAL LOCATIONS ═══════════ */}
      <section className="section-padding section-y border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl mb-12">
            <p className="eyebrow mb-3">Ideal Locations</p>
            <h2 className="heading-section">Where Vendoprint works best</h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {locations.map((loc, i) => (
            <AnimateIn key={loc.label} delay={i * 0.06}>
              <div className="card flex gap-4 items-center">
                <loc.icon size={22} className="text-brand-orange flex-shrink-0" />
                <span className="font-medium text-body">{loc.label}</span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ═══════════ HOW PARTNERSHIP WORKS ═══════════ */}
      <section className="section-padding section-y bg-white border-t border-brand-border">
        <AnimateIn>
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-3">The Process</p>
            <h2 className="heading-section">How partnership works</h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl">
          {steps.map((s, i) => (
            <AnimateIn key={s.step} delay={i * 0.1}>
              <div>
                <p className="font-sora font-bold text-4xl text-brand-orange/20 mb-3">
                  {s.step}
                </p>
                <h3 className="font-sora font-bold text-xl mb-2">{s.title}</h3>
                <p className="body-text text-sm">{s.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ═══════════ ENQUIRY FORM ═══════════ */}
      <section className="section-padding section-y border-t border-brand-border" id="enquiry">
        <AnimateIn>
          <div className="max-w-3xl mb-12">
            <p className="eyebrow mb-3">Get Started</p>
            <h2 className="heading-section">Partner enquiry</h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="max-w-2xl">
            {submitted ? (
              <div className="card text-center py-16">
                <CheckCircle size={48} className="text-brand-orange mx-auto mb-4" />
                <h3 className="font-sora font-bold text-xl mb-2">
                  Enquiry submitted
                </h3>
                <p className="body-text">
                  We&apos;ll review your application and get back to you within
                  3&ndash;5 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-black mb-1.5">
                      Full Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-black
                                 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                                 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-black mb-1.5">
                      Email <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-black
                                 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                                 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-black mb-1.5">
                      Phone <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-black
                                 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                                 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-black mb-1.5">
                      Organisation / Institution
                    </label>
                    <input
                      type="text"
                      name="organisation"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-black
                                 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                                 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-black mb-1.5">
                      Location Type <span className="text-brand-orange">*</span>
                    </label>
                    <select
                      required
                      name="locationType"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-black
                                 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                                 transition-all"
                    >
                      <option value="">Select type</option>
                      <option value="college">College</option>
                      <option value="corporate">Corporate</option>
                      <option value="coworking">Co-working</option>
                      <option value="hospital">Hospital</option>
                      <option value="mall">Mall</option>
                      <option value="airport-station">Airport / Station</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-black mb-1.5">
                      City <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="city"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-black
                                 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                                 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-black mb-1.5">
                    Approximate Daily Footfall
                  </label>
                  <select
                    name="footfall"
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-black
                               focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                               transition-all"
                  >
                    <option value="">Select range</option>
                    <option value="under-500">Under 500</option>
                    <option value="500-2000">500 – 2,000</option>
                    <option value="2000-5000">2,000 – 5,000</option>
                    <option value="5000+">5,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-black mb-1.5">
                    Message / Additional Details
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-black
                               focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                               transition-all resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Submit Enquiry
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
