'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import MemberModal from './MemberModal';

const BOARD_META = {
    EB: { label: 'Executive Board', pill: 'bg-[#001c3d] text-[#FFF8F0]' },
    SB: { label: 'Social Board',    pill: 'bg-[#1c6b51] text-white' },
    AB: { label: 'Academic Board',  pill: 'bg-[#865400] text-[#FFF8F0]' },
};

function MemberCard({ member, isAdmin, onEdit, confirmDelete, onRequestDelete, onCancelDelete, onConfirmDelete, deleting }) {
    const meta = BOARD_META[member.board];
    const isConfirming = confirmDelete === member.id;

    return (
        <div className="relative flex-shrink-0 w-[85vw] sm:w-[200px] rounded-[16px] overflow-hidden bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_4px_20px_rgba(0,28,61,0.13)] select-none">
            <div className="relative h-64 sm:h-auto sm:aspect-[3/4] w-full bg-[#f0ece6]">
                <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                    draggable={false}
                    unoptimized
                />
                <span className={`absolute top-2 left-2 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ${meta.pill}`}>
                    {member.board}
                </span>

                {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                        <button
                            onMouseDown={e => e.stopPropagation()}
                            onClick={e => { e.stopPropagation(); onEdit(member); }}
                            className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-[#001c3d] hover:bg-white transition-colors"
                            title="Edit"
                        >
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                            onMouseDown={e => e.stopPropagation()}
                            onClick={e => { e.stopPropagation(); onRequestDelete(member.id); }}
                            className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-red-500 hover:bg-white transition-colors"
                            title="Delete"
                        >
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                )}
            </div>
            <div className="px-4 py-3">
                <p className="text-[#001c3d] font-bold text-sm leading-snug">{member.name}</p>
                <p className="text-[#001c3d]/50 text-[11px] mt-0.5 font-medium">{member.position}</p>
            </div>

            {isConfirming && (
                <div
                    onMouseDown={e => e.stopPropagation()}
                    className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 text-center"
                >
                    <span className="material-symbols-outlined text-red-400 text-3xl">delete</span>
                    <p className="text-xs font-semibold text-[#001c3d]">Remove {member.name}?</p>
                    <div className="flex gap-2 w-full">
                        <button
                            onClick={() => onCancelDelete()}
                            className="flex-1 py-1.5 border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onConfirmDelete(member.id)}
                            disabled={deleting}
                            className="flex-1 py-1.5 bg-red-500 text-white rounded-lg text-[11px] font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                            {deleting ? '...' : 'Delete'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function SliderRow({ items, direction, isAdmin, onEdit, confirmDelete, onRequestDelete, onCancelDelete, onConfirmDelete, deleting }) {
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
                <MemberCard
                    key={`${member.id}-${i}`}
                    member={member}
                    isAdmin={isAdmin}
                    onEdit={onEdit}
                    confirmDelete={confirmDelete}
                    onRequestDelete={onRequestDelete}
                    onCancelDelete={onCancelDelete}
                    onConfirmDelete={onConfirmDelete}
                    deleting={deleting}
                />
            ))}
        </div>
    );
}

export default function Section4() {
    const { user, token } = useAuth();
    const isAdmin = user && ['board', 'admin'].includes(user.role?.toLowerCase());

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalState, setModalState] = useState(null); // null | { mode: 'add' } | { mode: 'edit', item }
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadMembers();
    }, []);

    function loadMembers() {
        setLoading(true);
        fetch('/api/members')
            .then(r => r.json())
            .then(data => setMembers(Array.isArray(data) ? data : []))
            .catch(() => setMembers([]))
            .finally(() => setLoading(false));
    }

    // The current board is whichever term has the highest term_order —
    // everything else lives on the Previous Boards page.
    const currentTermOrder = members.length ? Math.max(...members.map(m => m.term_order)) : null;
    const currentMembers = members.filter(m => m.term_order === currentTermOrder);
    const currentTerm = currentMembers[0]?.term || '';
    const allTerms = [...new Set(members.map(m => m.term))];

    const byBoard = (board) => currentMembers.filter((m) => m.board === board);
    const allMembers = [...byBoard('EB'), ...byBoard('SB'), ...byBoard('AB')];

    function handleSave(saved) {
        setMembers(prev => {
            const exists = prev.find(m => m.id === saved.id);
            return exists
                ? prev.map(m => m.id === saved.id ? saved : m)
                : [...prev, saved];
        });
        setModalState(null);
    }

    async function handleDelete(id) {
        setDeleting(true);
        try {
            const res = await fetch(`/api/members/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) setMembers(prev => prev.filter(m => m.id !== id));
        } finally {
            setDeleting(false);
            setConfirmDelete(null);
        }
    }

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
                <div className="flex items-center gap-4 pl-8 pb-2 select-none flex-wrap">
                    {Object.entries(BOARD_META).map(([key, meta]) => (
                        <span key={key} className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${meta.pill}`}>
                            {meta.label}
                        </span>
                    ))}
                    {currentTerm && (
                        <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#001c3d]/10 text-[#001c3d]/60">
                            {currentTerm}
                        </span>
                    )}
                    {isAdmin && (
                        <button
                            onClick={() => setModalState({ mode: 'add' })}
                            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#001C3D] text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-[#001C3D]/80 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                            Add Member
                        </button>
                    )}
                    <span className="ml-auto pr-8 text-xs text-[#001c3d]/40 font-medium flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        drag to explore
                    </span>
                </div>

                {loading && (
                    <div className="pl-8 pb-8 text-[#001c3d]/40 text-sm">Loading team...</div>
                )}
                {!loading && allMembers.length === 0 && (
                    <div className="pl-8 pb-8 text-[#001c3d]/40 text-sm">No team members yet.</div>
                )}
                {!loading && allMembers.length > 0 && (
                    <SliderRow
                        items={allMembers}
                        direction="left"
                        isAdmin={isAdmin}
                        onEdit={(item) => setModalState({ mode: 'edit', item })}
                        confirmDelete={confirmDelete}
                        onRequestDelete={setConfirmDelete}
                        onCancelDelete={() => setConfirmDelete(null)}
                        onConfirmDelete={handleDelete}
                        deleting={deleting}
                    />
                )}

                <div className="flex-1 min-h-[15vw]" />
            </div>

            {modalState && (
                <MemberModal
                    member={modalState.mode === 'edit' ? modalState.item : null}
                    terms={allTerms}
                    defaultTerm={currentTerm}
                    onClose={() => setModalState(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
