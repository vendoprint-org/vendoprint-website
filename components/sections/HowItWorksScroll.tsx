'use client';

import { useEffect, useRef, useState } from 'react';
import { QrCode, Upload, CreditCard, PackageCheck, LucideIcon } from 'lucide-react';
import { registerGsap, gsap, ScrollTrigger } from '@/lib/gsap';
import { stepFromProgress } from '@/lib/stepProgress';
import { AnimateIn } from '@/components/AnimateIn';

interface Step {
  icon: LucideIcon;
  number: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    icon: QrCode,
    number: '01',
    title: 'Scan the Kiosk QR',
    desc: 'Walk up to any Vendoprint kiosk and scan the QR code with your phone camera. No app download required.',
  },
  {
    icon: Upload,
    number: '02',
    title: 'Upload Your Document',
    desc: 'Select your file from your phone, laptop, or cloud drive. Choose colour or black & white, copies, and paper size.',
  },
  {
    icon: CreditCard,
    number: '03',
    title: 'Pay Instantly',
    desc: 'Confirm via UPI, card, or wallet. Pricing is shown up front — no surprises before you pay.',
  },
  {
    icon: PackageCheck,
    number: '04',
    title: 'Collect Your Print',
    desc: 'Your print drops into your own secure slot. Pick it up and go — under 60 seconds, start to finish.',
  },
];

function useDesktopPinCapable() {
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const narrow = window.innerWidth < 1024;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCapable(!narrow && !reduceMotion);
  }, []);
  return capable;
}

export function HowItWorksScroll({ variant }: { variant: 'compact' | 'full' }) {
  const pinCapable = useDesktopPinCapable();
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const scrollDistance = variant === 'full' ? 400 : 300;

  useEffect(() => {
    if (!pinCapable) return;
    registerGsap();
    const container = containerRef.current;
    if (!container) return;
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${scrollDistance}%`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const step = stepFromProgress(self.progress, STEPS.length);
        setActiveStep(step);
      },
    });

    return () => trigger.kill();
  }, [pinCapable, variant]);

  useEffect(() => {
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === activeStep ? 1 : 0,
        y: i === activeStep ? 0 : 20,
        duration: 0.4,
        ease: 'power2.inOut',
        pointerEvents: i === activeStep ? 'auto' : 'none',
      });
    });
  }, [activeStep]);

  const heightClass = `lg:h-[${scrollDistance}vh]`;

  return (
    <div>
      <AnimateIn>
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">How It Works</p>
          <h2 className="heading-section">Four steps. Under a minute.</h2>
        </div>
      </AnimateIn>

      {pinCapable ? (
        <div ref={containerRef} className={`relative hidden lg:block ${heightClass}`}>
          <div className="sticky top-0 h-screen flex items-center">
            <div className="section-padding w-full grid grid-cols-2 gap-16 items-center">
              <div className="relative h-[280px]">
                {STEPS.map((step, i) => (
                  <div
                    key={step.number}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <p className="font-sora font-extrabold text-7xl text-brand-orange/15 mb-4">
                      {step.number}
                    </p>
                    <h3 className="font-sora font-bold text-3xl mb-4">{step.title}</h3>
                    <p className="body-text max-w-md">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="w-56 h-96 rounded-[2rem] border-4 border-brand-black bg-gradient-to-b from-brand-surface to-white shadow-xl flex items-center justify-center">
                  {(() => {
                    const Icon = STEPS[activeStep].icon;
                    return <Icon size={48} className="text-brand-orange" />;
                  })()}
                </div>
                <div className="flex gap-3">
                  {STEPS.map((step, i) => (
                    <div
                      key={step.number}
                      ref={(el) => {
                        dotRefs.current[i] = el;
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        i === activeStep ? 'bg-brand-orange' : 'bg-brand-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <AnimateIn key={step.number} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-orange mx-auto mb-5 flex items-center justify-center">
                  <step.icon size={28} className="text-white" />
                </div>
                <p className="text-caption text-brand-orange font-semibold mb-2">
                  Step {step.number}
                </p>
                <h3 className="font-sora font-bold text-xl mb-2">{step.title}</h3>
                <p className="body-text text-sm">{step.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
}
