'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { AnimateIn } from './AnimateIn';
import { Mail, MapPin, ArrowRight, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';

const COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/partner', label: 'Partner With Us' },
      { href: '/contact', label: 'Contact Us' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { href: '/partner', label: 'For Institutions' },
      { href: '/partner', label: 'For Businesses' },
      { href: '/how-it-works', label: 'Cloud Printing' },
      { href: '/how-it-works', label: 'Kiosk Network' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
];

const SOCIALS = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <AnimateIn className="md:col-span-4">
            <Logo variant="reversed" iconSize={36} />
            <p className="text-[15px] text-white/60 mt-6 max-w-xs leading-relaxed">
              India&apos;s first patented smart printing kiosk network. Building the future of
              self-service printing infrastructure.
            </p>
            <div className="flex gap-3 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-primary hover:text-primary"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </AnimateIn>

          {/* Link columns */}
          {COLUMNS.map((col, i) => (
            <AnimateIn key={col.heading} delay={0.1 + i * 0.06} className="md:col-span-2">
              <h3 className="text-caption uppercase tracking-widest text-white/40 mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link, j) => (
                  <li key={`${link.href}-${j}`}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-white/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          ))}

          {/* Need help */}
          <AnimateIn delay={0.28} className="md:col-span-2">
            <h3 className="text-caption uppercase tracking-widest text-white/40 mb-4">Need help?</h3>
            <a
              href="mailto:work@vendoprint.in"
              className="flex items-start gap-2 text-[15px] text-white/70 hover:text-primary transition-colors mb-3"
            >
              <Mail size={16} className="mt-1 shrink-0" />
              work@vendoprint.in
            </a>
            <p className="flex items-start gap-2 text-[15px] text-white/60 leading-relaxed mb-5">
              <MapPin size={16} className="mt-1 shrink-0" />
              Chikkalasandra, Bangalore South, Bangalore&nbsp;&mdash;&nbsp;560061, Karnataka
            </p>
            <Link href="/contact" className="btn-primary !py-2.5 !px-5 !text-small">
              Find a Kiosk
              <ArrowRight size={15} />
            </Link>
          </AnimateIn>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-small text-white/40">
            &copy; {new Date().getFullYear()} Vendoprint Private Limited. All rights reserved.
          </p>
          <p className="text-small text-white/40">Made with care in India</p>
        </div>
      </div>
    </footer>
  );
}
