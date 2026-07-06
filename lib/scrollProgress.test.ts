import { describe, it, expect } from 'vitest';
import { calcScrollProgress } from './scrollProgress';

describe('calcScrollProgress', () => {
  it('returns 0 at the top of the page', () => {
    expect(calcScrollProgress(0, 3000, 800)).toBe(0);
  });

  it('returns 100 at the bottom of the page', () => {
    expect(calcScrollProgress(2200, 3000, 800)).toBe(100);
  });

  it('returns a proportional value in between', () => {
    expect(calcScrollProgress(1100, 3000, 800)).toBe(50);
  });

  it('clamps to 0 when scrollY is negative', () => {
    expect(calcScrollProgress(-50, 3000, 800)).toBe(0);
  });

  it('clamps to 100 when scrollY overshoots', () => {
    expect(calcScrollProgress(9999, 3000, 800)).toBe(100);
  });

  it('returns 0 when the page is shorter than the viewport', () => {
    expect(calcScrollProgress(0, 400, 800)).toBe(0);
  });
});
