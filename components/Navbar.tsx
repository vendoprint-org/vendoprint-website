'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/partner', label: 'Partner' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-cream/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-padding flex items-center justify-between h-[72px]">
        <Link href="/" aria-label="Vendoprint Home">
          <Logo iconSize={32} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-brand-orange'
                  : 'text-brand-black hover:text-brand-orange'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/partner" className="btn-primary !py-2.5 !px-5 !text-[15px]">
            Partner With Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-brand-cream border-t border-brand-border">
          <div className="section-padding py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-body font-medium py-2 ${
                  pathname === link.href
                    ? 'text-brand-orange'
                    : 'text-brand-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/partner" className="btn-primary text-center mt-2">
              Partner With Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
