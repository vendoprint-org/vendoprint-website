import { Metadata } from 'next';
import { generatePageMeta, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = generatePageMeta({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Vendoprint Private Limited — how we collect, use, and protect your data.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Privacy Policy', path: '/privacy' },
            ])
          ),
        }}
      />

      <section className="section-padding pt-32 pb-32 md:pt-40">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Legal</p>
          <h1 className="heading-display mb-10">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none text-brand-muted space-y-8">
            <p className="text-sm text-brand-muted">
              Last updated: July 2026
            </p>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                1. Who We Are
              </h2>
              <p className="body-text">
                Vendoprint Private Limited (&ldquo;Vendoprint,&rdquo; &ldquo;we,&rdquo;
                &ldquo;our&rdquo;) is a company registered in Bangalore, Karnataka, India.
                This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website (vendoprint.in) or use our
                kiosk services.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                2. Information We Collect
              </h2>
              <p className="body-text mb-3">
                <strong>Via Website Forms:</strong> Name, email address, phone number,
                organisation name, city, and any message you choose to provide through
                our contact or partner enquiry forms.
              </p>
              <p className="body-text mb-3">
                <strong>Via Kiosk Usage:</strong> Documents uploaded for printing are
                processed in real-time and permanently deleted after the print job completes.
                We do not store, log, or retain the contents of your documents.
              </p>
              <p className="body-text">
                <strong>Automatically:</strong> Basic analytics data (page views, browser type,
                device type) collected through cookies for site improvement purposes only.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                3. How We Use Your Information
              </h2>
              <p className="body-text">
                We use the information collected to respond to enquiries, evaluate partnership
                applications, improve our services, and communicate updates. We do not sell,
                trade, or rent your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                4. Document Security at Kiosks
              </h2>
              <p className="body-text">
                All documents uploaded to Vendoprint kiosks are encrypted in transit (TLS)
                and at rest. Documents are permanently and irrecoverably deleted immediately
                after printing. No copies are retained on our servers, edge devices, or any
                backup systems.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                5. Cookies
              </h2>
              <p className="body-text">
                We use essential and analytics cookies only. No advertising or tracking
                cookies are used. You can disable cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                6. Third-Party Services
              </h2>
              <p className="body-text">
                Payment processing at kiosks is handled by PCI-DSS compliant payment
                gateways. We do not store any payment card details. Third-party services
                are subject to their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                7. Your Rights
              </h2>
              <p className="body-text">
                You may request access to, correction of, or deletion of any personal
                data we hold about you by writing to us at{' '}
                <a href="mailto:work@vendoprint.in" className="text-brand-orange hover:underline">
                  work@vendoprint.in
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                8. Changes to This Policy
              </h2>
              <p className="body-text">
                We may update this Privacy Policy from time to time. Changes will be posted
                on this page with an updated revision date.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-bold text-xl text-brand-black mb-3">
                9. Contact
              </h2>
              <p className="body-text">
                For any privacy-related questions or concerns, please contact us at{' '}
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
