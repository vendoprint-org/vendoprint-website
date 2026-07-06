import { Metadata } from 'next';
import { generatePageMeta } from '@/lib/seo';

export const metadata: Metadata = generatePageMeta({
  title: 'About Vendoprint — Building India\'s Printing Infrastructure',
  description:
    'Vendoprint Pvt Ltd is a Bangalore-based startup building a network of patented, fully automated printing kiosks. No operators. No storefronts.',
  path: '/about',
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
