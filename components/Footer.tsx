'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { AnimateIn } from './AnimateIn';

const footerLinks = {
  Company: [
    { href: '/about', label: 'About' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/partner', label: 'Partner' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-black text-brand-cream">
      <div className="section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <AnimateIn className="md:col-span-5">
            <Logo variant="reversed" iconSize={36} />
            <p className="text-caption uppercase tracking-widest text-brand-muted mt-4">
              Automated Printing, Anytime, Anywhere
            </p>
            <p className="text-[15px] text-brand-cream/60 mt-6 max-w-sm leading-relaxed">
              India&apos;s first patented smart printing kiosk network.
              Building the future of self-service printing infrastructure.
            </p>
          </AnimateIn>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links], i) => (
            <AnimateIn key={heading} delay={0.1 + i * 0.08} className="md:col-span-2">
              <h3 className="text-caption uppercase tracking-widest text-brand-cream/40 mb-4">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-brand-cream/70 hover:text-brand-orange transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          ))}

          {/* Contact Column */}
          <AnimateIn delay={0.26} className="md:col-span-3">
            <h3 className="text-caption uppercase tracking-widest text-brand-cream/40 mb-4">
              Get In Touch
            </h3>
            <div className="space-y-3 text-[15px] text-brand-cream/70">
              <a
                href="mailto:work@vendoprint.in"
                className="block hover:text-brand-orange transition-colors"
              >
                work@vendoprint.in
              </a>
              <p className="leading-relaxed">
                No. 47/60/1, Ground Floor,<br />
                2nd Main Road, KSRTC Layout,<br />
                Chikkalasandra, Bangalore South,<br />
                Bangalore - 560061, Karnataka
              </p>
            </div>
          </AnimateIn>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-brand-cream/40">
            &copy; {new Date().getFullYear()} Vendoprint Private Limited. All rights reserved.
          </p>
          <p className="text-sm text-brand-cream/40">
            Patented Technology &middot; Made in India
          </p>
        </div>
      </div>
    </footer>
  );
}
