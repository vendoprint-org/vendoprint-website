'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, className = '' }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div className={className}>
      <div role="tablist" className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.id)}
              className={`relative -mb-px pb-3 text-body font-semibold transition-colors duration-200 ${
                selected ? 'text-primary' : 'text-slate hover:text-ink'
              }`}
            >
              {tab.label}
              {selected && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-6">
        {activeTab?.content}
      </div>
    </div>
  );
}
