/**
 * Site-wide marketing copy — single source of truth.
 *
 * Only verified facts from CLAUDE.md / company brief belong here. No invented
 * install-base numbers, pricing, or testimonials — Vendoprint is pre-launch
 * and currently Bangalore-only, so there is no real data for those yet.
 */

export const IMPACT_STATS = [
  { value: 'Patented', label: 'Technology', note: "India's first" },
  { value: '24/7', label: 'Availability', note: 'Every kiosk, every day' },
  { value: '<60s', label: 'Print Time', note: 'Scan to collect' },
  { value: '2030', label: 'Vision', note: '10,000+ kiosks nationwide' },
] as const;

export const COVERAGE_STATS = [
  { value: 'Bangalore', label: 'Live Today' },
  { value: '2030', label: 'Expansion Target' },
  { value: '10,000+', label: 'Kiosk Vision' },
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
