import { Metadata } from 'next';

const SITE_URL = 'https://vendoprint.in';
const SITE_NAME = 'Vendoprint';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

interface PageSEO {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

export function generatePageMeta({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
}: PageSEO): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    other: {
      'geo.region': 'IN-KA',
      'geo.placename': 'Bangalore',
      'geo.position': '12.9716;77.5946',
      'ICBM': '12.9716, 77.5946',
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vendoprint Private Limited',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description:
      "India's first patented smart printing kiosk. Automated, 24/7, self-service printing for colleges, airports, and public spaces.",
    email: 'work@vendoprint.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 47/60/1, Ground Floor, 2nd Main Road, KSRTC Layout, Chikkalasandra',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560061',
      addressCountry: 'IN',
    },
    sameAs: [],
    founder: {
      '@type': 'Person',
      name: 'Purushottam N K',
    },
  };
}

export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Vendoprint Smart Printing Kiosk',
    description:
      'Fully automated, patented self-service printing kiosk with Smart Slot-Sorting System for secure, 24/7 unattended operation.',
    brand: {
      '@type': 'Brand',
      name: 'Vendoprint',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Vendoprint Private Limited',
    },
    category: 'Self-Service Printing Kiosk',
    url: `${SITE_URL}/how-it-works`,
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Vendoprint Private Limited',
    url: SITE_URL,
    email: 'work@vendoprint.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 47/60/1, Ground Floor, 2nd Main Road, KSRTC Layout, Chikkalasandra',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560061',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItemElement',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
