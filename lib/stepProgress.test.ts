import { describe, it, expect } from 'vitest';
import { stepFromProgress } from './stepProgress';

describe('stepFromProgress', () => {
  it('returns the first step at progress 0', () => {
    expect(stepFromProgress(0, 4)).toBe(0);
  });

  it('returns the last step at progress 1', () => {
    expect(stepFromProgress(1, 4)).toBe(3);
  });

  it('returns the second step early in the second quarter', () => {
    expect(stepFromProgress(0.26, 4)).toBe(1);
  });

  it('returns the third step in the third quarter', () => {
    expect(stepFromProgress(0.6, 4)).toBe(2);
  });

  it('never returns an index outside the valid range', () => {
    expect(stepFromProgress(-0.5, 4)).toBe(0);
    expect(stepFromProgress(1.5, 4)).toBe(3);
  });
});
