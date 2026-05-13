'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { members } from '../data/members';

const BOARD_META = {
    EB: { label: 'Executive Board', pill: 'bg-[#001c3d] text-[#FFF8F0]' },
    SB: { label: 'Social Board',    pill: 'bg-[#1c6b51] text-white' },
    AB: { label: 'Academic Board',  pill: 'bg-[#865400] text-[#FFF8F0]' },
};

function MemberCard({ member }) {
    const meta = BOARD_META[member.board];
    return (
        <div className="flex-shrink-0 w-[210px] rounded-[26px] overflow-hidden bg-white shadow-[10px_14px_28px_rgba(0,28,61,0.18)] select-none">
            <div className="relative h-[280px] w-full bg-[#f0ece6]">
                <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                    draggable={false}
                />
                <span className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${meta.pill}`}>
                    {member.board}
                </span>
            </div>
            <div className="px-5 py-4">
                <p className="text-[#001c3d] font-bold text-base leading-snug">{member.name}</p>
                <p className="text-[#001c3d]/50 text-xs mt-1 font-medium">{member.position}</p>
            </div>
        </div>
    );
}

export default function Section4() {
    const containerRef = useRef(null);
    const trackRef     = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const track     = trackRef.current;
        if (!container || !track) return;

        let pos          = 0;
        let target       = 0;
        let vel          = 0;
        let dragging     = false;
        let dragStartX   = 0;
        let dragStartPos = 0;
        let lastMouseX   = 0;
        let paused       = false;
        let rafId;
        let resumeTimer;

        const AUTO_SPEED = 0.55;
        const FRICTION   = 0.90;
        const LERP       = 0.07;

        function halfWidth() { return track.scrollWidth / 2; }

        function tick() {
            if (!dragging && !paused) target -= AUTO_SPEED;

            if (!dragging && Math.abs(vel) > 0.02) {
                target += vel;
                vel    *= FRICTION;
            }

            pos += (target - pos) * LERP;

            const half = halfWidth();
            if (pos < -half) { pos += half; target += half; }
            if (pos > 0)     { pos -= half; target -= half; }

            track.style.transform = `translateX(${pos}px)`;

            // subtle scale + opacity parallax based on distance from viewport centre
            const cx = container.getBoundingClientRect().left + container.offsetWidth / 2;
            for (const card of track.children) {
                const r      = card.getBoundingClientRect();
                const dist   = Math.abs(r.left + r.width / 2 - cx);
                const ratio  = Math.min(dist / (container.offsetWidth * 0.55), 1);
                card.style.transform = `scale(${(1 - ratio * 0.06).toFixed(3)})`;
                card.style.opacity   = (1 - ratio * 0.35).toFixed(3);
            }

            rafId = requestAnimationFrame(tick);
        }

        rafId = requestAnimationFrame(tick);

        function scheduleResume() {
            clearTimeout(resumeTimer);
            resumeTimer = setTimeout(() => { paused = false; }, 2000);
        }

        const onMouseDown = (e) => {
            e.preventDefault();
            dragging     = true;
            paused       = true;
            clearTimeout(resumeTimer);
            dragStartX   = e.clientX;
            dragStartPos = pos;
            lastMouseX   = e.clientX;
            vel = 0;
            container.style.cursor = 'grabbing';
        };
        const onMouseMove = (e) => {
            if (!dragging) return;
            vel        = e.clientX - lastMouseX;
            target     = dragStartPos + (e.clientX - dragStartX);
            lastMouseX = e.clientX;
        };
        const onMouseUp = () => {
            if (!dragging) return;
            dragging = false;
            container.style.cursor = 'grab';
            scheduleResume();
        };
        const onTouchStart = (e) => {
            dragging     = true;
            paused       = true;
            clearTimeout(resumeTimer);
            dragStartX   = e.touches[0].clientX;
            dragStartPos = pos;
            lastMouseX   = e.touches[0].clientX;
            vel = 0;
        };
        const onTouchMove = (e) => {
            if (!dragging) return;
            vel        = e.touches[0].clientX - lastMouseX;
            target     = dragStartPos + (e.touches[0].clientX - dragStartX);
            lastMouseX = e.touches[0].clientX;
        };
        const onTouchEnd = () => {
            dragging = false;
            scheduleResume();
        };

        container.addEventListener('mousedown',  onMouseDown);
        window.addEventListener('mousemove',     onMouseMove);
        window.addEventListener('mouseup',       onMouseUp);
        container.addEventListener('touchstart', onTouchStart, { passive: true });
        container.addEventListener('touchmove',  onTouchMove,  { passive: false });
        container.addEventListener('touchend',   onTouchEnd);

        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(resumeTimer);
            container.removeEventListener('mousedown',  onMouseDown);
            window.removeEventListener('mousemove',     onMouseMove);
            window.removeEventListener('mouseup',       onMouseUp);
            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchmove',  onTouchMove);
            container.removeEventListener('touchend',   onTouchEnd);
        };
    }, []);

    const doubled = [...members, ...members];

    return (
        <div className="bg-[#FFF8F0] text-[#001C3D] w-full min-h-screen relative overflow-hidden">

            {/* title — behind the slider, anchored to the bottom */}
            <h2 className="absolute bottom-0 left-8 text-[12vw] font-extrabold tracking-tighter leading-[0.88] whitespace-nowrap text-[#001c3d] select-none pointer-events-none z-0">
                Meet Our Team
            </h2>

            {/* slider content — floats above the title */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="flex-1" />

                {/* legend + drag hint */}
                <div className="flex items-center gap-4 pl-8 pb-8 select-none">
                    {Object.entries(BOARD_META).map(([key, meta]) => (
                        <span key={key} className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${meta.pill}`}>
                            {meta.label}
                        </span>
                    ))}
                    <span className="ml-auto pr-8 text-xs text-[#001c3d]/40 font-medium flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        drag to explore
                    </span>
                </div>

                {/* carousel */}
                <div
                    ref={containerRef}
                    className="cursor-grab select-none py-8"
                >
                    <div
                        ref={trackRef}
                        className="flex gap-10 w-max will-change-transform"
                    >
                        {doubled.map((member, i) => (
                            <MemberCard key={i} member={member} />
                        ))}
                    </div>
                </div>

                {/* bottom spacer — half a title height keeps carousel above it */}
                <div className="flex-1 min-h-[10vw]" />
            </div>
        </div>
    );
}
