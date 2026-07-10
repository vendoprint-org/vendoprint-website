import { forwardRef } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

const fieldBase =
  'w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-body text-ink ' +
  'placeholder:text-gray-400 transition-colors duration-150 ' +
  'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ' +
  'disabled:bg-gray-100 disabled:text-gray-400';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, className = '', ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-small font-medium text-slate">
          {label}
        </label>
      )}
      <input ref={ref} id={id} className={`${fieldBase} ${className}`} {...props} />
    </div>
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, id, className = '', rows = 4, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-small font-medium text-slate">
          {label}
        </label>
      )}
      <textarea ref={ref} id={id} rows={rows} className={`${fieldBase} resize-y ${className}`} {...props} />
    </div>
  );
});
