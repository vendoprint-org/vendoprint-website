'use client';

import { useState } from 'react';
import { Sparkles, Tag, Trophy, Newspaper, ArrowRight, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const PERKS: { icon: LucideIcon; label: string }[] = [
  { icon: Sparkles, label: 'New Features' },
  { icon: Tag, label: 'Offers & Discounts' },
  { icon: Trophy, label: 'Success Stories' },
  { icon: Newspaper, label: 'Industry Insights' },
];

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <section className="section-padding section-y bg-white border-t border-gray-200">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="heading-section mb-3">Stay updated with Vend-O-Print</h2>
        <p className="body-text mb-8">
          Get the latest updates, new features and offers straight to your inbox.
        </p>

        {done ? (
          <p className="inline-flex items-center gap-2 text-body font-semibold text-success">
            <Check size={18} /> You&apos;re subscribed. Thanks for joining us.
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-3 text-body text-ink placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button type="submit" className="btn-primary justify-center">
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
          {PERKS.map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <p.icon size={18} />
              </span>
              <span className="text-small text-slate">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
