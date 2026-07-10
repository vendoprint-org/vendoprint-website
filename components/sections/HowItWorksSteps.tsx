import Link from 'next/link';
import { Upload, MapPin, CreditCard, FileText, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimateIn } from '@/components/AnimateIn';

interface Step {
  n: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  { n: '01', icon: Upload, title: 'Upload Document', desc: 'Upload your file in seconds from any device.' },
  { n: '02', icon: MapPin, title: 'Choose Kiosk', desc: 'Select the nearest Vend-O-Print kiosk.' },
  { n: '03', icon: CreditCard, title: 'Make Payment', desc: 'Pay securely using UPI, cards or wallets.' },
  { n: '04', icon: FileText, title: 'Collect Print', desc: 'Collect your high-quality print instantly.' },
];

export function HowItWorksSteps() {
  return (
    <section className="section-padding section-y bg-white border-t border-gray-200">
      <AnimateIn>
        <h2 className="heading-section text-center mb-16">
          Print in <span className="text-primary">4 simple steps</span>
        </h2>
      </AnimateIn>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
        {/* connecting line (desktop) */}
        <div
          aria-hidden
          className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/30 via-primary/30 to-primary/30"
        />
        {STEPS.map((s, i) => (
          <AnimateIn key={s.n} delay={i * 0.1} className="relative text-center">
            <div className="relative inline-flex items-center justify-center mb-5">
              <div className="w-[72px] h-[72px] rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
                <s.icon size={26} className="text-ink" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-white text-small font-bold flex items-center justify-center">
                {s.n}
              </span>
            </div>
            <h3 className="font-display font-bold text-h5 text-ink mb-2">{s.title}</h3>
            <p className="text-small text-slate max-w-[220px] mx-auto">{s.desc}</p>
          </AnimateIn>
        ))}
      </div>

      <AnimateIn delay={0.2}>
        <div className="flex justify-center mt-14">
          <Link href="/contact" className="btn-primary">
            Find a Kiosk Near You
            <ArrowRight size={18} />
          </Link>
        </div>
      </AnimateIn>
    </section>
  );
}
