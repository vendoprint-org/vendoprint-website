import { describe, it, expect } from 'vitest';
import { parseCountTarget, formatCountValue } from './countUp';

describe('parseCountTarget', () => {
  it('parses a plain integer', () => {
    expect(parseCountTarget('0')).toEqual({ prefix: '', value: 0, suffix: '', hasComma: false });
  });

  it('parses a comma-separated number with a plus suffix', () => {
    expect(parseCountTarget('10,000+')).toEqual({
      prefix: '',
      value: 10000,
      suffix: '+',
      hasComma: true,
    });
  });

  it('parses a ratio-style value, treating everything after the number as suffix', () => {
    expect(parseCountTarget('24/7')).toEqual({
      prefix: '',
      value: 24,
      suffix: '/7',
      hasComma: false,
    });
  });

  it('parses a less-than prefix with a unit suffix', () => {
    expect(parseCountTarget('<60s')).toEqual({
      prefix: '<',
      value: 60,
      suffix: 's',
      hasComma: false,
    });
  });

  it('parses a percentage', () => {
    expect(parseCountTarget('100%')).toEqual({
      prefix: '',
      value: 100,
      suffix: '%',
      hasComma: false,
    });
  });
});

describe('formatCountValue', () => {
  it('formats without commas when hasComma is false', () => {
    expect(formatCountValue(60, false)).toBe('60');
  });

  it('formats with commas when hasComma is true', () => {
    expect(formatCountValue(10000, true)).toBe('10,000');
  });
});
