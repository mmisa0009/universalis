'use client';

import { useState } from 'react';

export default function AccordionMenu({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`w-full border border-white/20 rounded-xl mb-3 overflow-hidden transition-colors duration-200 ${open ? 'bg-white/10' : 'bg-white/5 hover:bg-white/8'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-4 text-left text-white font-semibold text-base gap-4"
      >
        <span>{title}</span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-white/30 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-45 bg-white/20' : ''}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr' }}
        className="transition-[grid-template-rows] duration-300 ease-in-out"
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-white/80 text-sm leading-relaxed border-t border-white/10 pt-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
