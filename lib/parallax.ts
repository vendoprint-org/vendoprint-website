export function calcParallaxOffset(scrollY: number, speed: number): number {
  return scrollY * speed;
}
