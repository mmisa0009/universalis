'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from '@/app/context/AuthContext';
import CommitteeModal from '@/app/components/CommitteeModal';

interface Committee {
    id: string;
    name: string;
    description: string;
    image: string;
    instagram: string;
    email: string;
}

export default function CommitteesPage() {
    const { user, token } = useAuth();
    const isAdmin = !!user && ['board', 'admin'].includes(user.role?.toLowerCase());

    const [committees, setCommittees] = useState<Committee[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [modalState, setModalState] = useState<null | { mode: 'add' } | { mode: 'edit'; item: Committee }>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetch('/api/committees')
            .then(r => r.json())
            .then((data) => setCommittees(Array.isArray(data) ? data : []))
            .catch(() => setCommittees([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = committees.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );

    function handleSave(saved: Committee) {
        setCommittees(prev => {
            const exists = prev.find(c => c.id === saved.id);
            return exists ? prev.map(c => c.id === saved.id ? saved : c) : [...prev, saved];
        });
        setModalState(null);
    }

    async function handleDelete(id: string) {
        setDeleting(true);
        try {
            const res = await fetch(`/api/committees/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) setCommittees(prev => prev.filter(c => c.id !== id));
        } finally {
            setDeleting(false);
            setConfirmDelete(null);
        }
    }

    return (
        <main className="min-h-screen bg-[#FFF8F0]">
            <div className="bg-[url('/maastricht.png')] bg-cover bg-center h-[80vh] flex flex-col items-center justify-center">
                    <Navbar />
                    <div className='flex items-center text-center justify-center backdrop-blur-sm text-[8vmin] w-[80%] h-[65%] lg:max-w-none bg-white/10 p-8 rounded-lg xl:px-20 shadow-[12px_12px_30px_rgba(0,0,0,0.35)]'>Committees</div>
                </div>

            {/* Search Bar */}
            <section className="bg-[#FFF8F0] py-6 px-8 border-y border-[#c4c6cf]/20">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
                    <div className="w-full md:max-w-md relative group">
                        <span className="material-symbols-outlined absolute left-0 bottom-2 text-[#74777f] group-focus-within:text-[#001c3d] transition-colors">
                            search
                        </span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-[#c4c6cf] focus:border-[#001c3d] py-2 pl-8 text-lg text-[#001c3d] placeholder:text-[#74777f]/60 outline-none transition-colors"
                            placeholder="Search committees..."
                            type="text"
                        />
                    </div>
                    {isAdmin && (
                        <button
                            onClick={() => setModalState({ mode: 'add' })}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#001C3D] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#001C3D]/80 transition-colors shadow-sm flex-shrink-0"
                        >
                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                            Add Committee
                        </button>
                    )}
                </div>
            </section>

            {/* Committee List */}
            <section className="px-8 max-w-7xl mx-auto">
                <div className="flex flex-col divide-y divide-[#74777f]/20">
                    {loading && (
                        <p className="py-20 text-center text-[#74777f]">Loading committees...</p>
                    )}
                    {!loading && filtered.length === 0 && (
                        <p className="py-20 text-center text-[#74777f]">No committees found.</p>
                    )}
                    {filtered.map((committee) => (
                        <div
                            key={committee.id}
                            className="group py-12 flex flex-col md:flex-row gap-8 md:items-center hover:bg-white/60 transition-colors rounded-sm"
                        >
                            <div className="relative w-full md:w-64 aspect-[3/2] overflow-hidden bg-[#eee7df] rounded-sm flex-shrink-0">
                                {committee.image ? (
                                    <Image
                                        fill
                                        alt={committee.name}
                                        src={committee.image}
                                        className="object-cover transition-all duration-700"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-[#001c3d]/20">
                                        <span className="material-symbols-outlined text-5xl">groups</span>
                                    </div>
                                )}

                                {isAdmin && (
                                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                                        <button
                                            onClick={() => setModalState({ mode: 'edit', item: committee })}
                                            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-[#001c3d] hover:bg-white transition-colors"
                                            title="Edit"
                                        >
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                        <button
                                            onClick={() => setConfirmDelete(committee.id)}
                                            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-red-500 hover:bg-white transition-colors"
                                            title="Delete"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                )}

                                {confirmDelete === committee.id && (
                                    <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 text-center">
                                        <span className="material-symbols-outlined text-red-400 text-3xl">delete</span>
                                        <p className="text-xs font-semibold text-[#001c3d]">Remove {committee.name}?</p>
                                        <div className="flex gap-2 w-full">
                                            <button
                                                onClick={() => setConfirmDelete(null)}
                                                className="flex-1 py-1.5 border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleDelete(committee.id)}
                                                disabled={deleting}
                                                className="flex-1 py-1.5 bg-red-500 text-white rounded-lg text-[11px] font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                                            >
                                                {deleting ? '...' : 'Delete'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="h-px w-8 bg-[#c4c6cf]/40" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-semibold text-[#001c3d]">
                                    {committee.name}
                                </h3>
                                <p className="text-[#44474e] text-sm md:text-base leading-relaxed max-w-3xl whitespace-pre-line">
                                    {committee.description}
                                </p>
                                <div className="flex items-center gap-4 pt-2">
                                    {committee.instagram && (
                                        <a
                                            href={committee.instagram}
                                            aria-label={`${committee.name} Instagram`}
                                            className="text-[#001c3d] opacity-40 hover:opacity-100 transition-opacity"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                                <circle cx="12" cy="12" r="4"/>
                                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                                            </svg>
                                        </a>
                                    )}
                                    {committee.email && (
                                        <a
                                            href={`mailto:${committee.email}`}
                                            aria-label={`${committee.name} email`}
                                            className="text-[#001c3d] opacity-40 hover:opacity-100 transition-opacity"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="4" width="20" height="16" rx="2"/>
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />

            {modalState && (
                <CommitteeModal
                    committee={modalState.mode === 'edit' ? modalState.item : null}
                    onClose={() => setModalState(null)}
                    onSave={handleSave}
                />
            )}
        </main>
    );
}
