import { Quote } from 'lucide-react';
import { AnimateIn } from '@/components/AnimateIn';
import { TESTIMONIALS } from '@/lib/marketing';

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, '')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Testimonials() {
  const t = TESTIMONIALS[0];
  return (
    <section className="section-padding section-y bg-white border-t border-gray-200">
      <AnimateIn>
        <h2 className="heading-section text-center mb-14">
          Loved by <span className="text-primary">students.</span> Trusted by{' '}
          <span className="text-primary">institutions.</span>
        </h2>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <figure className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-gray-50 p-8 md:p-10 shadow-ds-sm">
          <Quote size={36} className="text-primary mb-5" />
          <blockquote className="font-display text-h4 md:text-h3 font-medium text-ink leading-snug mb-8">
            {t.quote}
          </blockquote>
          <figcaption className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-display font-bold text-primary">
              {initials(t.name)}
            </span>
            <div>
              <p className="font-semibold text-ink">{t.name}</p>
              <p className="text-small text-slate">{t.role}</p>
            </div>
          </figcaption>
        </figure>
      </AnimateIn>
    </section>
  );
}
