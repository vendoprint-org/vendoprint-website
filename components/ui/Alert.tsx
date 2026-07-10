import type { ReactNode } from 'react';
import { CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';

type Variant = 'success' | 'info' | 'warning' | 'error';

const config: Record<Variant, { wrap: string; icon: ReactNode }> = {
  success: {
    wrap: 'bg-success/10 border-success/20 text-success',
    icon: <CheckCircle2 size={18} />,
  },
  info: {
    wrap: 'bg-info/10 border-info/20 text-info',
    icon: <Info size={18} />,
  },
  warning: {
    wrap: 'bg-warning/10 border-warning/20 text-warning',
    icon: <AlertTriangle size={18} />,
  },
  error: {
    wrap: 'bg-error/10 border-error/20 text-error',
    icon: <XCircle size={18} />,
  },
};

export interface AlertProps {
  variant?: Variant;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Alert({ variant = 'info', title, children, className = '' }: AlertProps) {
  const { wrap, icon } = config[variant];
  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-md border px-4 py-3 ${wrap} ${className}`}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="text-small text-ink">
        {title && <p className="font-semibold">{title}</p>}
        <p className="text-slate">{children}</p>
      </div>
    </div>
  );
}
