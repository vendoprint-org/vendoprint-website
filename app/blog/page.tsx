import { Metadata } from 'next';
import { AnimateIn } from '@/components/AnimateIn';
import { generatePageMeta, breadcrumbSchema } from '@/lib/seo';
import { PenLine } from 'lucide-react';

export const metadata: Metadata = generatePageMeta({
  title: 'Vendoprint Blog — Updates, Insights & Startup Journey',
  description:
    "Product updates, printing industry insights, and behind-the-scenes of building India's first smart printing kiosk network.",
  path: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
            ])
          ),
        }}
      />

      <section className="section-padding pt-32 pb-20 md:pt-40 md:pb-28">
        <AnimateIn>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">Blog</p>
            <h1 className="heading-display mb-6">From the Vendoprint desk</h1>
            <p className="body-text">
              Product updates, industry insights, and the journey of building
              India&apos;s printing infrastructure.
            </p>
          </div>
        </AnimateIn>
      </section>

      <section className="section-padding pb-32">
        <AnimateIn>
          <div className="card max-w-lg text-center mx-auto py-16">
            <PenLine size={40} className="text-brand-orange/30 mx-auto mb-4" />
            <h2 className="font-sora font-bold text-xl mb-2">
              First post coming soon
            </h2>
            <p className="body-text">
              We&apos;re working on something. Stay tuned.
            </p>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
