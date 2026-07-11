import Link from 'next/link';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'text';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-md ' +
  'transition-all duration-200 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white shadow-ds-sm hover:bg-primary-dark hover:shadow-ds-md',
  secondary: 'bg-white text-ink border border-gray-200 hover:border-ink hover:shadow-ds-sm',
  text: 'text-primary hover:gap-3 bg-transparent',
};

const sizes: Record<Size, string> = {
  sm: 'text-small px-4 py-2',
  md: 'text-body px-7 py-3.5',
  lg: 'text-body-lg px-8 py-4',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', href, className = '', children, ...props },
  ref
) {
  const cls = `${base} ${variants[variant]} ${variant === 'text' ? '' : sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} className={cls} {...props}>
      {children}
    </button>
  );
});
