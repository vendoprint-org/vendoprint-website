export interface CountTarget {
  prefix: string;
  value: number;
  suffix: string;
  hasComma: boolean;
}

export function parseCountTarget(raw: string): CountTarget {
  const match = raw.match(/^([^\d]*)([\d,]+)(.*)$/s);
  if (!match) {
    return { prefix: '', value: 0, suffix: raw, hasComma: false };
  }
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    value: parseInt(digits.replace(/,/g, ''), 10),
    suffix,
    hasComma: digits.includes(','),
  };
}

export function formatCountValue(current: number, hasComma: boolean): string {
  return hasComma ? Math.round(current).toLocaleString('en-US') : String(Math.round(current));
}
