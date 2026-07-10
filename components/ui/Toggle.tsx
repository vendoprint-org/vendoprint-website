'use client';

import { useState } from 'react';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export function Toggle({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  id,
}: ToggleProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <label htmlFor={id} className="inline-flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={on}
        disabled={disabled}
        onClick={toggle}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          on ? 'bg-primary' : 'bg-gray-200'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-ds-sm transition-transform duration-200 ${
            on ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
      {label && <span className="text-body text-ink">{label}</span>}
    </label>
  );
}
