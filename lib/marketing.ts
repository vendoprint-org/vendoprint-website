/**
 * ⚠️ PLACEHOLDER MARKETING DATA — REPLACE BEFORE LAUNCH ⚠️
 *
 * These figures, quotes, partner names and pricing come from the design
 * reference sheets and are placeholders for a pre-launch product. Swap in
 * real, verifiable values here (single source of truth for the whole site).
 */

export const IMPACT_STATS = [
  { value: '2,500+', label: 'Kiosks Deployed', note: 'Across India' },
  { value: '10M+', label: 'Prints Completed', note: 'Every month' },
  { value: '300+', label: 'Cities Covered', note: 'Pan India' },
  { value: '99.6%', label: 'Uptime Reliability', note: 'Always on' },
] as const;

export const COVERAGE_STATS = [
  { value: '2,500+', label: 'Active Kiosks' },
  { value: '300+', label: 'Cities' },
  { value: '28', label: 'States & UTs' },
] as const;

export const PRICING = [
  {
    title: 'Cost Per Print',
    lead: 'As low as',
    value: '₹1.50',
    unit: 'Per Page',
    note: 'Up to 70% cheaper than traditional print shops.',
  },
  {
    title: 'Institution Savings',
    lead: 'Save up to',
    value: '60%',
    unit: 'On printing costs',
    note: 'Smart printing. Smarter spending.',
  },
  {
    title: 'ROI in 6 Months',
    lead: 'Average ROI achieved in',
    value: '6',
    unit: 'Months',
    note: 'High footfall. Higher returns.',
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      'Vend-O-Print has completely transformed the way our students print. It’s reliable, fast and extremely convenient.',
    name: 'Dr. R. Mehta',
    role: 'IT Head, Modern College',
  },
] as const;

/** Partner logo strip — replace with real, permissioned partner logos. */
export const TRUSTED_BY = [
  'Universities',
  'Corporates',
  'Airports',
  'Hospitals',
  'Metro Stations',
  'Libraries',
] as const;
