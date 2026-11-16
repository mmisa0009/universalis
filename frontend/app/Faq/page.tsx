'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import AccordionMenu from './components/AccordionMenu';
import FaqModal from './components/FaqModal';
import Footer from './components/Footer';
import { useAuth } from '@/app/context/AuthContext';
import fallbackFaqs from '@/app/data/faqs';

interface Faq {
    id: string;
    question: string;
    answer: string;
}

export default function FaqPage() {
    const { user, token } = useAuth();
    // Only the 'admin' role (the secretary) can edit. Everyone else just reads.
    const isAdmin = !!user && user.role?.toLowerCase() === 'admin';

    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [loading, setLoading] = useState(true);
    // True when the database couldn't be reached and we're showing the
    // built-in copy instead — editing is disabled in that case.
    const [usingFallback, setUsingFallback] = useState(false);
    const [modalState, setModalState] = useState<null | { mode: 'add' } | { mode: 'edit'; item: Faq }>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetch('/api/faqs')
            .then(async (r) => {
                const data = await r.json();
                if (!r.ok || !Array.isArray(data)) throw new Error(data.error || 'Failed to load');
                setFaqs(data);
            })
            .catch(() => {
                setFaqs(fallbackFaqs.map((f: { question: string; answer: string }, i: number) => ({ id: `fallback-${i}`, ...f })));
                setUsingFallback(true);
            })
            .finally(() => setLoading(false));
    }, []);

    const canEdit = isAdmin && !usingFallback;

    function handleSave(saved: Faq) {
        setFaqs(prev => prev.some(f => f.id === saved.id)
            ? prev.map(f => f.id === saved.id ? saved : f)
            : [...prev, saved]);
        setModalState(null);
    }

    async function handleDelete(id: string) {
        setDeleting(true);
        try {
            const res = await fetch(`/api/faqs/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) setFaqs(prev => prev.filter(f => f.id !== id));
        } finally {
            setDeleting(false);
            setConfirmDelete(null);
        }
    }

    return (
        <main className='min-h-screen'>
            <div className="bg-[url('/maastricht.png')] bg-cover bg-center h-[80vh] flex flex-col items-center justify-center">
                <div className="flex w-full justify-center">
                    <Navbar />
                </div>
                <div className='flex items-center text-center justify-center backdrop-blur-sm text-[8vmin] w-[80%] h-[65%] lg:max-w-none bg-white/10 p-8 rounded-lg xl:px-20 shadow-[12px_12px_30px_rgba(0,0,0,0.35)]'>Frequently Asked Questions</div>
            </div>

            <div className="max-w-3xl mx-auto p-6">
                {isAdmin && usingFallback && (
                    <p className="mb-4 text-sm text-red-300">
                        Couldn&apos;t load the editable FAQ from the database, so editing is disabled. Make sure supabase/faqs.sql has been run.
                    </p>
                )}
                {canEdit && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setModalState({ mode: 'add' })}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#FFF8F0] text-[#001C3D] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#FFF8F0]/80 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                            Add Question
                        </button>
                    </div>
                )}

                {loading && <p className="py-10 text-center text-white/60">Loading...</p>}

                {faqs.map((faq) => (
                    <div key={faq.id}>
                        <AccordionMenu
                            title={faq.question}
                            actions={canEdit ? (
                                <>
                                    <button
                                        onClick={() => setModalState({ mode: 'edit', item: faq })}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                        title="Edit"
                                    >
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete(faq.id)}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-red-300 transition-colors"
                                        title="Delete"
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </>
                            ) : null}
                        >
                            {faq.answer.split(/\n\s*\n/).map((para, i) => (
                                <p key={i} className={`whitespace-pre-line ${i > 0 ? 'mt-6' : ''}`}>{para}</p>
                            ))}
                        </AccordionMenu>

                        {canEdit && confirmDelete === faq.id && (
                            <div className="-mt-1 mb-4 flex items-center justify-between gap-3 rounded-xl border border-red-300/40 bg-red-500/10 px-5 py-3">
                                <p className="text-sm text-white">Delete this question?</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setConfirmDelete(null)}
                                        className="px-3 py-1.5 border border-white/30 rounded-lg text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faq.id)}
                                        disabled={deleting}
                                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                                    >
                                        {deleting ? '...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Footer />

            {modalState && (
                <FaqModal
                    faq={modalState.mode === 'edit' ? modalState.item : null}
                    onClose={() => setModalState(null)}
                    onSave={handleSave}
                />
            )}
        </main>
    );
}
