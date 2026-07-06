import { describe, it, expect } from 'vitest';
import { calcTilt } from './tilt';

describe('calcTilt', () => {
  const rect = { width: 400, height: 300 };

  it('returns zero rotation when the mouse is at the center', () => {
    expect(calcTilt(200, 150, rect, 3)).toEqual({ rotateX: 0, rotateY: 0 });
  });

  it('tilts positively on rotateY when mouse is at the right edge', () => {
    const { rotateY } = calcTilt(400, 150, rect, 3);
    expect(rotateY).toBeCloseTo(3);
  });

  it('tilts negatively on rotateY when mouse is at the left edge', () => {
    const { rotateY } = calcTilt(0, 150, rect, 3);
    expect(rotateY).toBeCloseTo(-3);
  });

  it('tilts negatively on rotateX when mouse is at the top edge', () => {
    const { rotateX } = calcTilt(200, 0, rect, 3);
    expect(rotateX).toBeCloseTo(3);
  });

  it('tilts positively on rotateX when mouse is at the bottom edge', () => {
    const { rotateX } = calcTilt(200, 300, rect, 3);
    expect(rotateX).toBeCloseTo(-3);
  });

  it('clamps rotation to maxDeg even if mouse is outside the element bounds', () => {
    const { rotateX, rotateY } = calcTilt(1000, 1000, rect, 3);
    expect(Math.abs(rotateX)).toBeLessThanOrEqual(3);
    expect(Math.abs(rotateY)).toBeLessThanOrEqual(3);
  });
});
