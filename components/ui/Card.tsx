import type { HTMLAttributes, ReactNode } from 'react';

type Variant = 'flat' | 'glass' | 'dark';

const variants: Record<Variant, string> = {
  flat: 'bg-white border border-gray-200 shadow-ds-sm',
  glass:
    'bg-white border border-gray-200 shadow-ds-sm transition-all duration-300 ease-out ' +
    'hover:border-primary/40 hover:shadow-ds-lg hover:-translate-y-1',
  dark: 'bg-ink border border-white/10 text-gray-50 shadow-ds-md',
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Card({ variant = 'flat', className = '', children, ...props }: CardProps) {
  return (
    <div className={`rounded-lg p-8 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
