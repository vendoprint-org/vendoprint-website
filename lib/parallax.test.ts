import { describe, it, expect } from 'vitest';
import { calcParallaxOffset } from './parallax';

describe('calcParallaxOffset', () => {
  it('returns 0 when scrollY is 0', () => {
    expect(calcParallaxOffset(0, 0.6)).toBe(0);
  });

  it('scales scrollY by the given speed', () => {
    expect(calcParallaxOffset(100, 0.6)).toBe(60);
  });

  it('returns the full scrollY when speed is 1', () => {
    expect(calcParallaxOffset(250, 1)).toBe(250);
  });

  it('handles negative scrollY (overscroll/bounce)', () => {
    expect(calcParallaxOffset(-50, 0.6)).toBe(-30);
  });
});
