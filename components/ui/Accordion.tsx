'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** allow multiple panels open at once */
  multiple?: boolean;
  className?: string;
}

export function Accordion({ items, multiple = false, className = '' }: AccordionProps) {
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) => {
    setOpen((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i);
      return multiple ? [...prev, i] : [i];
    });
  };

  return (
    <div className={`divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white ${className}`}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-h5 font-semibold text-ink">{item.question}</span>
              <span className="shrink-0 text-primary">
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 text-body text-slate">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
