'use client';

import { useState } from 'react';
import { AnimateIn } from '@/components/AnimateIn';
import { Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="section-padding pt-32 pb-20 md:pt-40 md:pb-28">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">Contact</p>
            <h1 className="heading-display mb-6">Let&apos;s talk</h1>
            <p className="body-text max-w-2xl">
              Questions, partnership enquiries, or just want to say
              hello&nbsp;&mdash; we&apos;re here.
            </p>
          </div>
        </AnimateIn>
      </section>

      <section className="section-padding pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <AnimateIn>
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-lg mb-1">Email</h3>
                  <a
                    href="mailto:work@vendoprint.in"
                    className="body-text text-brand-orange hover:underline"
                  >
                    work@vendoprint.in
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-lg mb-1">Office</h3>
                  <p className="body-text">
                    No. 47/60/1, Ground Floor,<br />
                    2nd Main Road, KSRTC Layout,<br />
                    Chikkalasandra, Bangalore South,<br />
                    Bangalore&nbsp;-&nbsp;560061, Karnataka
                  </p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-brand overflow-hidden border border-brand-border h-[280px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8!2d77.56!3d12.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzM2LjAiTiA3N8KwMzMnMzYuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vendoprint Office Location"
                />
              </div>
            </div>
          </AnimateIn>

          {/* Form */}
          <AnimateIn delay={0.15}>
            {submitted ? (
              <div className="card text-center py-16">
                <CheckCircle size={48} className="text-brand-orange mx-auto mb-4" />
                <h3 className="font-sora font-bold text-xl mb-2">Message sent</h3>
                <p className="body-text">
                  We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-1.5">
                    Name <span className="text-brand-orange">*</span>
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

                <div>
                  <label className="block text-sm font-medium text-brand-black mb-1.5">
                    Enquiry Type
                  </label>
                  <select
                    name="type"
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-black
                               focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                               transition-all"
                  >
                    <option value="general">General</option>
                    <option value="partnership">Partnership</option>
                    <option value="media">Media / Press</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-black mb-1.5">
                    Message <span className="text-brand-orange">*</span>
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-brand-black
                               focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
                               transition-all resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Send Message
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
