'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { members } from '../data/members';

const BOARD_META = {
    EB: { label: 'Executive Board', pill: 'bg-[#001c3d] text-[#FFF8F0]' },
    SB: { label: 'Social Board',    pill: 'bg-[#1c6b51] text-white' },
    AB: { label: 'Academic Board',  pill: 'bg-[#865400] text-[#FFF8F0]' },
};

// 2 members from each board per row
const byBoard = (board) => members.filter((m) => m.board === board);
const allMembers = [...byBoard('EB'), ...byBoard('SB'), ...byBoard('AB')];

function MemberCard({ member }) {
    const meta = BOARD_META[member.board];
    return (
        <div className="flex-shrink-0 w-[85vw] sm:w-[200px] rounded-[16px] overflow-hidden bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_20px_rgba(0,28,61,0.13)] select-none">
            <div className="relative h-64 sm:h-auto sm:aspect-[3/4] w-full bg-[#f0ece6]">
                <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                    draggable={false}
                />
                <span className={`absolute top-2 left-2 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ${meta.pill}`}>
                    {member.board}
                </span>
            </div>
            <div className="px-4 py-3">
                <p className="text-[#001c3d] font-bold text-sm leading-snug">{member.name}</p>
                <p className="text-[#001c3d]/50 text-[11px] mt-0.5 font-medium">{member.position}</p>
            </div>
        </div>
    );
}

function SliderRow({ items, direction }) {
    const [isDesktop, setIsDesktop] = useState(false);
    const containerRef    = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 640px)');
        setIsDesktop(mq.matches);
        const handler = (e) => setIsDesktop(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    const isDragging      = useRef(false);
    const dragStartX      = useRef(0);
    const dragScrollLeft  = useRef(0);
    const isPaused        = useRef(false);
    const resumeTimer     = useRef(null);
    const rafId           = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const SPEED = direction === 'left' ? 0.8 : -0.8;

        // For rightward auto-scroll, start at the midpoint so we can scroll backward
        if (direction === 'right') {
            container.scrollLeft = container.scrollWidth / 2;
        }

        function tick() {
            if (!isPaused.current && !isDragging.current) {
                container.scrollLeft += SPEED;
                const half = container.scrollWidth / 2;
                if (direction === 'left' && container.scrollLeft >= half) {
                    container.scrollLeft -= half;
                }
                if (direction === 'right' && container.scrollLeft <= 0) {
                    container.scrollLeft += half;
                }
            }
            rafId.current = requestAnimationFrame(tick);
        }

        rafId.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId.current);
            clearTimeout(resumeTimer.current);
        };
    }, [direction]);

    const scheduleResume = () => {
        clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => { isPaused.current = false; }, 2000);
    };

    const handleMouseDown = (e) => {
        isDragging.current = true;
        isPaused.current = true;
        clearTimeout(resumeTimer.current);
        dragStartX.current = e.pageX - containerRef.current.offsetLeft;
        dragScrollLeft.current = containerRef.current.scrollLeft;
        containerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        containerRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current);
    };

    const handleMouseEnd = () => {
        isDragging.current = false;
        if (containerRef.current) containerRef.current.style.cursor = 'grab';
        scheduleResume();
    };

    const displayItems = isDesktop ? [...items, ...items] : items;

    return (
        <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto pt-3 pb-8 -mb-5 px-6 sm:px-0 sm:gap-6 cursor-grab select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseEnd}
            onMouseLeave={handleMouseEnd}
        >
            {displayItems.map((member, i) => (
                <MemberCard key={i} member={member} />
            ))}
        </div>
    );
}

export default function Section4() {
    return (
        <div className="bg-[#FFF8F0] text-[#001C3D] w-full min-h-screen relative overflow-hidden">

            {/* Background title – desktop only (whitespace-nowrap overflows on mobile) */}
            <h2 className="hidden md:block absolute bottom-0 left-8 text-[12vw] font-extrabold tracking-tighter leading-[0.88] whitespace-nowrap text-[#001c3d] select-none pointer-events-none z-0 pb-14">
                Meet Our Team
            </h2>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Mobile heading */}
                <div className="md:hidden pt-28 px-8 pb-4">
                    <h2 className="text-3xl font-extrabold text-[#001c3d]">Meet Our Team</h2>
                </div>

                {/* Desktop: push slider toward bottom */}
                <div className="md:flex-1" />

                {/* Legend + drag hint */}
                <div className="flex items-center gap-4 pl-8 pb-2 select-none">
                    {Object.entries(BOARD_META).map(([key, meta]) => (
                        <span key={key} className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${meta.pill}`}>
                            {meta.label}
                        </span>
                    ))}
                    <span className="ml-auto pr-8 text-xs text-[#001c3d]/40 font-medium flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        drag to explore
                    </span>
                </div>

                <SliderRow items={allMembers} direction="left" />

                <div className="flex-1 min-h-[15vw]" />
            </div>
        </div>
    );
}
