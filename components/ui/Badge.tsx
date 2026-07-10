import type { ReactNode } from 'react';

type Variant =
  | 'new'
  | 'popular'
  | 'ai'
  | 'secure'
  | 'online'
  | 'idle'
  | 'offline'
  | 'neutral';

const variants: Record<Variant, string> = {
  new: 'bg-primary-soft text-primary',
  popular: 'bg-success/10 text-success',
  ai: 'bg-info/10 text-info',
  secure: 'bg-info/10 text-info',
  online: 'bg-success/10 text-success',
  idle: 'bg-warning/10 text-warning',
  offline: 'bg-error/10 text-error',
  neutral: 'bg-gray-100 text-slate',
};

const dotColors: Partial<Record<Variant, string>> = {
  online: 'bg-success',
  idle: 'bg-warning',
  offline: 'bg-error',
};

export interface BadgeProps {
  variant?: Variant;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', dot = false, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-small font-semibold ${variants[variant]} ${className}`}
    >
      {dot && (
        <span className={`h-1.5 w-1.5 rounded-full ${dotColors[variant] ?? 'bg-slate'}`} />
      )}
      {children}
    </span>
  );
}
