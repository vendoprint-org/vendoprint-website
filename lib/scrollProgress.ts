export function calcScrollProgress(
  scrollY: number,
  docHeight: number,
  viewportHeight: number
): number {
  const scrollable = docHeight - viewportHeight;
  if (scrollable <= 0) return 0;
  const pct = (scrollY / scrollable) * 100;
  return Math.min(100, Math.max(0, pct));
}
