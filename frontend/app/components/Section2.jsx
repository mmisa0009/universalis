'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AnnouncementModal from './AnnouncementModal';

export default function Section2() {
    const { user, token } = useAuth();
    const isAdmin = user && ['board', 'admin'].includes(user.role?.toLowerCase());

    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragScrollLeft = useRef(0);

    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalState, setModalState] = useState(null); // null | { mode: 'add' } | { mode: 'edit', item }
    const [confirmDelete, setConfirmDelete] = useState(null); // id to delete
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetch('/api/announcements')
            .then(r => r.json())
            .then(data => setAnnouncements(Array.isArray(data) ? data : []))
            .catch(() => setAnnouncements([]))
            .finally(() => setLoading(false));
    }, []);

    const scrollLeft = () => sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    const scrollRight = () => sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

    const handleMouseDown = (e) => {
        isDragging.current = true;
        dragStartX.current = e.pageX - sliderRef.current.offsetLeft;
        dragScrollLeft.current = sliderRef.current.scrollLeft;
        sliderRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        sliderRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current);
    };

    const handleMouseEnd = () => {
        isDragging.current = false;
        if (sliderRef.current) sliderRef.current.style.cursor = 'grab';
    };

    function handleSave(saved) {
        setAnnouncements(prev => {
            const exists = prev.find(a => a.id === saved.id);
            return exists
                ? prev.map(a => a.id === saved.id ? saved : a)
                : [saved, ...prev];
        });
        setModalState(null);
    }

    async function handleDelete(id) {
        setDeleting(true);
        try {
            const res = await fetch(`/api/announcements/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
        } finally {
            setDeleting(false);
            setConfirmDelete(null);
        }
    }

    return (
        <>
            <section className="h-full flex flex-col pt-24 pb-10 px-4 sm:pt-28 sm:pb-14 sm:px-8 bg-[#f9f3eb]">
                <div className="flex justify-between items-end mb-8 sm:mb-12">
                    <div>
                        <h2 className="text-3xl sm:text-5xl font-bold text-[#001C3D]">Announcements</h2>
                        <div className="h-1 w-24 bg-[#001C3D] mt-4"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        {isAdmin && (
                            <button
                                onClick={() => setModalState({ mode: 'add' })}
                                className="flex items-center gap-1.5 px-4 py-2 bg-[#001C3D] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#001C3D]/80 transition-colors shadow-sm"
                            >
                                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                                Add
                            </button>
                        )}
                        <div className="hidden sm:flex gap-4">
                            <button onClick={scrollLeft} className="group w-12 h-12 rounded-full border border-[#74777f] flex items-center justify-center hover:bg-[#001C3D] hover:border-[#001C3D] hover:shadow-lg transition-all duration-300">
                                <div className="relative w-6 h-6">
                                    <Image src="/arrow.png" alt="arrow left" fill quality={100} className="object-contain scale-x-[-1] group-hover:invert" />
                                </div>
                            </button>
                            <button onClick={scrollRight} className="group w-12 h-12 rounded-full border border-[#74777f] flex items-center justify-center hover:bg-[#001C3D] hover:border-[#001C3D] hover:shadow-lg transition-all duration-300">
                                <div className="relative w-6 h-6">
                                    <Image src="/arrow.png" alt="arrow right" fill quality={100} className="object-contain group-hover:invert" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={sliderRef}
                    className="flex gap-6 overflow-x-auto pt-4 -mt-4 pb-16 -mb-16 scroll-smooth snap-x snap-mandatory cursor-grab select-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseEnd}
                    onMouseLeave={handleMouseEnd}
                >
                    {loading && (
                        <div className="flex-1 flex items-center justify-center py-20 text-[#001C3D]/40 text-sm">
                            Loading announcements...
                        </div>
                    )}
                    {!loading && announcements.length === 0 && (
                        <div className="flex-1 flex items-center justify-center py-20 text-[#001C3D]/40 text-sm">
                            No announcements yet.
                        </div>
                    )}
                    {announcements.map((item) => (
                        <div key={item.id} className="snap-start flex-shrink-0 w-full sm:w-80 bg-white rounded-2xl overflow-hidden shadow-md group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative">

                            {/* Admin controls */}
                            {isAdmin && (
                                <div className="absolute top-3 right-3 z-10 flex gap-1.5">
                                    <button
                                        onClick={e => { e.stopPropagation(); setModalState({ mode: 'edit', item }); }}
                                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-[#001C3D] hover:bg-white transition-colors"
                                        title="Edit"
                                    >
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                    </button>
                                    <button
                                        onClick={e => { e.stopPropagation(); setConfirmDelete(item.id); }}
                                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-red-500 hover:bg-white transition-colors"
                                        title="Delete"
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            )}

                            {/* Delete confirmation overlay */}
                            {confirmDelete === item.id && (
                                <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6 rounded-2xl">
                                    <span className="material-symbols-outlined text-red-400 text-4xl">delete</span>
                                    <p className="text-sm font-semibold text-[#001C3D] text-center">Delete this announcement?</p>
                                    <p className="text-xs text-[#001C3D]/50 text-center -mt-2">This cannot be undone.</p>
                                    <div className="flex gap-3 w-full">
                                        <button
                                            onClick={() => setConfirmDelete(null)}
                                            className="flex-1 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            disabled={deleting}
                                            className="flex-1 py-2 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                                        >
                                            {deleting ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="h-64 overflow-hidden relative">
                                {item.image_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#001C3D]/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-5xl text-[#001C3D]/20">image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                {item.tag && (
                                    <span className={`absolute top-3 left-3 ${item.tag_color || 'bg-[#d8e0f3] text-[#001C3D]'} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm`}>
                                        {item.tag}
                                    </span>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-4 text-[#001C3D] leading-snug">{item.title}</h3>
                                <div className="space-y-2 text-sm font-[family-name:var(--font-inter)]">
                                    {item.time && (
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-[#001C3D]/50" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                                            <span className="text-[#001C3D]">{item.time}</span>
                                        </div>
                                    )}
                                    {item.location && (
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-[#001C3D]/50" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                            <span className="text-[#001C3D]">{item.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {item.tag === 'Academic' && (
                                <Link href="/Documents" className="mx-6 mb-5 flex items-center gap-1 text-xs font-semibold text-[#001C3D]/40 group-hover:text-[#001C3D]/70 transition-colors duration-300 tracking-wide uppercase">
                                    <span>View documents</span>
                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {modalState && (
                <AnnouncementModal
                    announcement={modalState.mode === 'edit' ? modalState.item : null}
                    onClose={() => setModalState(null)}
                    onSave={handleSave}
                />
            )}
        </>
    );
}
