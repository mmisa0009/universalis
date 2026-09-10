'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from '@/app/context/AuthContext';
import MemberModal from '@/app/components/MemberModal';

interface Member {
    id: string;
    name: string;
    position: string;
    img: string;
    board: string;
    term: string;
    term_order: number;
    sort_order: number;
}

export default function PreviousBoardsPage() {
    const { user, token } = useAuth();
    const isAdmin = !!user && ['board', 'admin'].includes(user.role?.toLowerCase());

    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeYear, setActiveYear] = useState<string | null>(null);
    const [modalState, setModalState] = useState<null | { mode: 'add' } | { mode: 'edit'; item: Member }>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadMembers();
    }, []);

    function loadMembers() {
        setLoading(true);
        fetch('/api/members')
            .then(r => r.json())
            .then((data) => setMembers(Array.isArray(data) ? data : []))
            .catch(() => setMembers([]))
            .finally(() => setLoading(false));
    }

    // The current board (highest term_order) lives on the homepage — everything
    // else is grouped here, most recent term first.
    const currentTermOrder = members.length ? Math.max(...members.map(m => m.term_order)) : null;
    const previousMembers = members.filter(m => m.term_order !== currentTermOrder);

    const groupsMap = new Map<string, { label: string; term_order: number; members: Member[] }>();
    for (const m of previousMembers) {
        if (!groupsMap.has(m.term)) groupsMap.set(m.term, { label: m.term, term_order: m.term_order, members: [] });
        groupsMap.get(m.term)!.members.push(m);
    }
    const groups = [...groupsMap.values()]
        .map(g => ({ ...g, members: [...g.members].sort((a, b) => a.sort_order - b.sort_order) }))
        .sort((a, b) => b.term_order - a.term_order);

    const allTerms = groups.map(g => g.label);
    const active = groups.find((g) => g.label === activeYear) || groups[0] || null;

    useEffect(() => {
        if (!activeYear && groups.length > 0) setActiveYear(groups[0].label);
    }, [groups.length]);

    function handleSave(saved: Member) {
        setMembers(prev => {
            const exists = prev.find(m => m.id === saved.id);
            return exists ? prev.map(m => m.id === saved.id ? saved : m) : [...prev, saved];
        });
        setModalState(null);
    }

    async function handleDelete(id: string) {
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
        <main className="min-h-screen bg-[#FFF8F0]">

            {/* Hero */}
            <div className="bg-[url('/maastricht.png')] bg-cover bg-center h-[80vh] flex flex-col items-center justify-center">
                <Navbar />
                <div className="flex items-center text-center justify-center backdrop-blur-sm text-[8vmin] w-[80%] h-[65%] lg:max-w-none bg-white/10 p-8 rounded-lg xl:px-20 shadow-[12px_12px_30px_rgba(0,0,0,0.35)]">
                    Previous Board Members
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto">

                <section className="mt-24 px-6 md:px-12">

                    {loading && (
                        <p className="text-[#001c3d]/40 text-sm">Loading previous boards...</p>
                    )}

                    {!loading && groups.length === 0 && (
                        <p className="text-[#001c3d]/40 text-sm">No previous boards yet.</p>
                    )}

                    {!loading && active && (
                    <>
                    {/* Mobile year picker — stacked above grid */}
                    <div className="md:hidden w-full mb-8">
                        <p className="uppercase tracking-widest text-[10px] text-[#735c00] font-bold mb-4">
                            Academic Year
                        </p>
                        <div
                            className="flex gap-2 overflow-x-auto pb-1"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {groups.map((y) => {
                                const isActive = y.label === active.label;
                                return (
                                    <button
                                        key={y.label}
                                        onClick={() => setActiveYear(y.label)}
                                        className={[
                                            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200",
                                            isActive
                                                ? "bg-[#001c3d] text-white border-[#001c3d]"
                                                : "bg-white text-[#44474e] border-[#c4c6cf]/60 hover:border-[#001c3d] hover:text-[#001c3d]",
                                        ].join(" ")}
                                    >
                                        {y.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex gap-10 md:gap-16 items-start">

                        {/* Sidebar */}
                        <aside className="hidden md:flex flex-col shrink-0 w-44 sticky top-28">
                            <p className="uppercase tracking-widest text-[10px] text-[#735c00] font-bold mb-6">
                                Academic Year
                            </p>
                            <nav className="flex flex-col">
                                {groups.map((y) => {
                                    const isActive = y.label === active.label;
                                    return (
                                        <button
                                            key={y.label}
                                            onClick={() => setActiveYear(y.label)}
                                            className={[
                                                "text-left py-3 text-sm border-l-2 pl-4 transition-all duration-200",
                                                isActive
                                                    ? "border-[#001c3d] text-[#001c3d] font-semibold"
                                                    : "border-[#c4c6cf]/40 text-[#44474e] hover:text-[#001c3d] hover:border-[#001c3d]/40",
                                            ].join(" ")}
                                        >
                                            {y.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </aside>

                        {/* Main content */}
                        <div className="flex-1 min-w-0">

                            {/* Year heading */}
                            <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
                                <div>
                                    <span className="font-sans uppercase tracking-widest text-xs text-[#735c00] font-bold block mb-2">
                                        The {active.label}
                                    </span>
                                    <h2 className="font-semibold text-4xl md:text-5xl text-[#001c3d]">
                                        {active.label === "Spring 2020" ? "Spring 2020" : `Academic Year ${active.label}`}
                                    </h2>
                                </div>
                                {isAdmin && (
                                    <button
                                        onClick={() => setModalState({ mode: 'add' })}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-[#001C3D] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#001C3D]/80 transition-colors shadow-sm"
                                    >
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                                        Add Member
                                    </button>
                                )}
                            </div>

                            {/* Member grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:gap-x-8 md:gap-y-14">
                                {active.members.map((member) => (
                                    <div key={member.id} className="group flex flex-col">

                                        {/* Photo */}
                                        <div className="relative aspect-[3/4] bg-[#e8e0d8] mb-4 overflow-hidden">
                                            <Image
                                                fill
                                                src={member.img}
                                                alt={`${member.name} – ${member.position}`}
                                                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                                unoptimized
                                            />

                                            {isAdmin && (
                                                <div className="absolute top-2 right-2 z-10 flex gap-1">
                                                    <button
                                                        onClick={() => setModalState({ mode: 'edit', item: member })}
                                                        className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-[#001c3d] hover:bg-white transition-colors"
                                                        title="Edit"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmDelete(member.id)}
                                                        className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-red-500 hover:bg-white transition-colors"
                                                        title="Delete"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                </div>
                                            )}

                                            {confirmDelete === member.id && (
                                                <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 text-center">
                                                    <span className="material-symbols-outlined text-red-400 text-3xl">delete</span>
                                                    <p className="text-xs font-semibold text-[#001c3d]">Remove {member.name}?</p>
                                                    <div className="flex gap-2 w-full">
                                                        <button
                                                            onClick={() => setConfirmDelete(null)}
                                                            className="flex-1 py-1.5 border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(member.id)}
                                                            disabled={deleting}
                                                            className="flex-1 py-1.5 bg-red-500 text-white rounded-lg text-[11px] font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                                                        >
                                                            {deleting ? '...' : 'Delete'}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="py-1">
                                            <p className="text-[#001c3d] font-bold text-sm sm:text-base leading-snug">{member.name}</p>
                                            <p className="text-[#001c3d]/50 text-xs sm:text-sm mt-1 font-medium">{member.position}</p>

                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    </>
                    )}
                </section>

            </div>

            <div className="mb-24" />
            <Footer />

            {modalState && active && (
                <MemberModal
                    member={modalState.mode === 'edit' ? modalState.item : null}
                    terms={allTerms}
                    defaultTerm={active.label}
                    onClose={() => setModalState(null)}
                    onSave={handleSave}
                />
            )}
        </main>
    );
}
