'use client';

import { useState } from 'react';

export default function AccordionMenu({title, children}) {
    const [open, setOpen] = useState(false);

    return (
        <div className='w-full border-b border-white/30'>
            <button
            onClick={() => setOpen(!open)}
            className='w-full flex justify-between items-center py-4 text-left text-white text-mb'
            >
                {title}
                <span className='text-mb'>
                    {open ? '−' : '+'}
                </span>
            </button>

            {oopen && (
                <div className="pb-4 text-white/90">
                    {children}
                </div>
            )}
        </div>
    );
}