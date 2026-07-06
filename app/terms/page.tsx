import { Metadata } from 'next';
import { generatePageMeta, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = generatePageMeta({
  title: 'Terms of Service',
  description: 'Terms of Service for Vendoprint Private Limited — usage terms for our website and kiosk services.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Terms of Service', path: '/terms' },
            ])
          ),
        }}
      />

      <section className="section-padding pt-32 pb-32 md:pt-40">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Legal</p>
          <h1 className="heading-display mb-10">Terms of Service</h1>

          <div className="prose prose-lg max-w-none text-brand-muted space-y-8">
            <p className="text-sm text-brand-muted">
              Last updated: July 2026
            </p>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="body-text">
                By accessing or using the Vendoprint website (vendoprint.in) or any
                Vendoprint kiosk, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                2. Services
              </h2>
              <p className="body-text">
                Vendoprint provides automated self-service printing through physical
                kiosks. Users can upload documents, pay electronically, and collect
                prints from the kiosk. Services are subject to kiosk availability,
                operational status, and consumable supply.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                3. User Responsibilities
              </h2>
              <p className="body-text">
                You are responsible for the content you upload to Vendoprint kiosks.
                You must not upload content that is illegal, infringing, harmful, or
                violates any applicable laws. You are responsible for collecting your
                prints in a timely manner.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                4. Payment and Pricing
              </h2>
              <p className="body-text">
                Prices are displayed before payment confirmation. All payments are
                final once a print job is initiated. Refunds may be issued at
                Vendoprint&apos;s discretion in cases of kiosk malfunction or failed
                print jobs. Refund requests can be directed to{' '}
                <a href="mailto:work@vendoprint.in" className="text-brand-orange hover:underline">
                  work@vendoprint.in
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                5. Intellectual Property
              </h2>
              <p className="body-text">
                The Vendoprint name, logo, kiosk design, Smart Slot-Sorting System,
                and all associated intellectual property are owned by Vendoprint Private
                Limited. Our kiosk hardware design is protected by granted patent.
                Unauthorised reproduction, reverse engineering, or imitation is prohibited.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                6. Limitation of Liability
              </h2>
              <p className="body-text">
                Vendoprint shall not be liable for any indirect, incidental, or
                consequential damages arising from use of our services. Our total
                liability for any claim shall not exceed the amount paid by you for
                the specific transaction giving rise to the claim.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                7. Service Availability
              </h2>
              <p className="body-text">
                While we strive for 24/7 availability, kiosk services may be
                temporarily unavailable due to maintenance, consumable replenishment,
                power outages, or technical issues. We do not guarantee uninterrupted
                service.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                8. Governing Law
              </h2>
              <p className="body-text">
                These terms are governed by and construed in accordance with the laws
                of India. Any disputes shall be subject to the exclusive jurisdiction
                of the courts in Bangalore, Karnataka.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                9. Changes to Terms
              </h2>
              <p className="body-text">
                We reserve the right to modify these terms at any time. Continued use
                of our services after changes constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                10. Contact
              </h2>
              <p className="body-text">
                For questions about these terms, contact us at{' '}
                <a href="mailto:work@vendoprint.in" className="text-brand-orange hover:underline">
                  work@vendoprint.in
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
