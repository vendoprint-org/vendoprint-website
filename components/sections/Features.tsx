import Link from 'next/link';
import { Cloud, Cpu, ShieldCheck, Clock, CreditCard, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimateIn } from '@/components/AnimateIn';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  { icon: Cloud, title: 'Cloud Printing', desc: 'Print from anywhere, any device, using our secure cloud infrastructure.' },
  { icon: Cpu, title: 'AI Monitoring', desc: 'Real-time monitoring and predictive alerts ensure zero downtime.' },
  { icon: ShieldCheck, title: 'Secure & Private', desc: 'End-to-end encryption and secure data handling for every print.' },
  { icon: Clock, title: '24×7 Availability', desc: 'Always available kiosks across locations for your convenience.' },
  { icon: CreditCard, title: 'Cashless Payments', desc: 'UPI, cards, wallets and multiple cashless options for a seamless experience.' },
];

export function Features() {
  return (
    <section className="section-padding section-y bg-gray-50">
      <AnimateIn>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <h2 className="heading-section max-w-xl">
            Everything you need.
            <br />
            One <span className="text-primary">smart solution.</span>
          </h2>
          <Link href="/how-it-works" className="btn-text shrink-0">
            Explore all features
            <ArrowRight size={16} />
          </Link>
        </div>
      </AnimateIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {FEATURES.map((f, i) => (
          <AnimateIn key={f.title} delay={i * 0.08}>
            <div className="card-glass h-full">
              <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                <f.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display font-bold text-h5 text-ink mb-2">{f.title}</h3>
              <p className="text-small text-slate leading-relaxed">{f.desc}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
