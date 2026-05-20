'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Footer from './components/Footer';
import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

type FileType = 'pdf' | 'docx' | 'xlsx' | 'other';

interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  category: string;
  created_at: string;
  uploaded_by: string;
}

const fileIcons: Record<FileType, { icon: string; bg: string; text: string }> = {
  pdf:   { icon: 'picture_as_pdf', bg: 'bg-red-100',   text: 'text-red-600'   },
  docx:  { icon: 'description',    bg: 'bg-blue-100',  text: 'text-blue-600'  },
  xlsx:  { icon: 'table_chart',    bg: 'bg-green-100', text: 'text-green-600' },
  other: { icon: 'insert_drive_file', bg: 'bg-gray-100', text: 'text-gray-600' },
};

function normalizeFileType(raw: string): FileType {
  const t = (raw ?? '').toLowerCase();
  if (t === 'pdf' || t.includes('pdf')) return 'pdf';
  if (t === 'docx' || t.includes('word')) return 'docx';
  if (t === 'xlsx' || t.includes('spreadsheet') || t === 'xls') return 'xlsx';
  return 'other';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

const tags = ['2024 Semester', 'Official', 'Templates', 'Archive'];
const CATEGORIES = ['Official', 'Minutes', 'Finance', 'Committees', 'Templates'];

// ─── Upload Modal ─────────────────────────────────────────────────────────────

interface UploadModalProps {
  token: string;
  onClose: () => void;
  onUploaded: (doc: Document) => void;
}

function UploadModal({ token, onClose, onUploaded }: UploadModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!title.trim()) { setError('Title is required.'); return; }
    if (!file) { setError('Please select a file.'); return; }

    setLoading(true);
    try {
      // 1. Upload file to S3
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'documents');

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) { setError(uploadData.error || 'Upload failed.'); return; }

      // Derive a simple file_type string from the MIME type
      const ext = normalizeFileType(file.type);

      // 2. Save document metadata to database
      const docRes = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          file_url: uploadData.url,
          file_type: ext,
          category,
        }),
      });
      const docData = await docRes.json();
      if (!docRes.ok) { setError(docData.error || 'Could not save document record.'); return; }

      onUploaded(docData);
      onClose();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#001c3d]">Upload New Document</h2>
          <button onClick={onClose} className="text-[#001c3da1] hover:text-[#001c3d] transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#001c3da1] mb-1">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. General Assembly Minutes – Sept"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#001c3d] text-sm focus:outline-none focus:ring-2 focus:ring-[#001c3d]/20"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#001c3da1] mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of the document…"
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#001c3d] text-sm focus:outline-none focus:ring-2 focus:ring-[#001c3d]/20 resize-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#001c3da1] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#001c3d] text-sm focus:outline-none focus:ring-2 focus:ring-[#001c3d]/20"
              disabled={loading}
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#001c3da1] mb-1">File * (PDF, DOCX, XLSX — max 10 MB)</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#001c3d]/40 transition-colors"
            >
              {file ? (
                <div className="flex items-center justify-center gap-2 text-[#001c3d]">
                  <span className="material-symbols-outlined text-green-600">check_circle</span>
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              ) : (
                <div className="text-[#001c3da1]">
                  <span className="material-symbols-outlined text-3xl mb-2 block">cloud_upload</span>
                  <span className="text-sm">Click to choose a file</span>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,.xlsx"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                disabled={loading}
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 border border-gray-200 text-[#001c3d] rounded-xl py-3 text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#001c3d] text-white rounded-xl py-3 text-sm font-bold hover:bg-[#002a5a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                  Uploading…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">upload_file</span>
                  Upload
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Document Card ─────────────────────────────────────────────────────────────

interface DocumentCardProps {
  doc: Document;
  isAdmin: boolean;
  onDelete: (id: string) => void;
}

function DocumentCard({ doc, isAdmin, onDelete }: DocumentCardProps) {
  const ft = normalizeFileType(doc.file_type);
  const fi = fileIcons[ft];
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { token } = useAuth();

  async function handleDelete() {
    if (!confirm(`Delete "${doc.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/documents/${doc.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) onDelete(doc.id);
    } finally {
      setDeleting(false);
      setMenuOpen(false);
    }
  }

  const isPdf = ft === 'pdf';

  return (
    <article className="bg-white p-6 rounded-3xl hover:-translate-y-1 transition-all duration-300 group relative">
      {/* Icon row */}
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 ${fi.bg} rounded-2xl flex items-center justify-center ${fi.text}`}>
          <span className="material-symbols-outlined text-3xl">{fi.icon}</span>
        </div>
        {isAdmin && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="text-[#001c3da1] hover:text-[#865400] transition-colors"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 min-w-[120px]">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-xl"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  {deleting ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-[#001c3d] mb-2 group-hover:text-[#001c3da1] transition-colors">
        {doc.title}
      </h3>
      <p className="text-[#001c3da1] text-sm mb-6">{doc.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-[#f9e9d5] px-3 py-1 rounded-md text-[10px] font-bold text-[#001c3d] uppercase tracking-widest">
          {doc.category}
        </span>
        <span className="bg-[#f9e9d5] px-3 py-1 rounded-md text-[10px] font-bold text-[#001c3d] uppercase tracking-widest">
          {ft.toUpperCase()}
        </span>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between pt-6 border-t border-[#d5fcf0]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#001c3da1] text-lg">calendar_today</span>
          <span className="text-xs text-[#001c3da1] font-medium">{formatDate(doc.created_at)}</span>
        </div>
        <button
          onClick={async () => {
            const res = await fetch(`/api/documents/${doc.id}/file`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.url) window.open(data.url, '_blank');
          }}
          className="text-[#001c3d] font-bold text-sm flex items-center gap-1 hover:underline">
          {isPdf ? 'View' : 'Download'}
          <span className="material-symbols-outlined text-sm">
            {isPdf ? 'open_in_new' : 'download'}
          </span>
        </button>
      </div>
    </article>
  );
}

function ArchivistCard() {
  return (
    <article className="relative rounded-3xl overflow-hidden min-h-[300px] flex items-end p-8 bg-[rgba(255,255,255,0.5)]">
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[#a6f2d1] via-transparent to-[#003a30]" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">Can&apos;t find a file?</h3>
        <p className="text-white/80 text-sm mb-6 max-w-xs">
          Request archived documents to a secretary.
        </p>
        <button className="px-6 py-2 bg-[#4f3000] text-[#fea619] rounded-full text-sm font-bold border border-[#fea619]/30 hover:bg-[#6b4000] transition-colors">
          Contact secretary
        </button>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Documents() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const [search, setSearch] = useState('');
  const [fileFilter, setFileFilter] = useState('All File Types');
  const [catFilter, setCatFilter] = useState('All Categories');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const isAdmin = user?.role === 'admin' || user?.role === 'board';
  console.log('User object:', user, 'isAdmin:', isAdmin);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/LogIn');
    }
  }, [authLoading, user, router]);

  const fetchDocuments = useCallback(async () => {
    setFetchLoading(true);
    setFetchError('');
    try {
      const params = new URLSearchParams();
      if (catFilter !== 'All Categories') params.set('category', catFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/documents?${params}`);
      const data = await res.json();
      if (!res.ok) { setFetchError(data.error || 'Failed to load documents.'); return; }
      setDocuments(Array.isArray(data) ? data : []);
    } catch {
      setFetchError('Could not connect to server.');
    } finally {
      setFetchLoading(false);
    }
  }, [catFilter, search]);

  useEffect(() => {
    if (user) fetchDocuments();
  }, [user, fetchDocuments]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = documents.filter((d) => {
    const ft = normalizeFileType(d.file_type);
    const matchFile =
      fileFilter === 'All File Types' ||
      (fileFilter === 'PDF Documents' && ft === 'pdf') ||
      (fileFilter === 'DOCX Files' && ft === 'docx') ||
      (fileFilter === 'Spreadsheets' && ft === 'xlsx');
    const matchTag =
      !activeTag ||
      (activeTag === '2024 Semester' && d.created_at?.startsWith('2024')) ||
      (activeTag === 'Official' && d.category === 'Official') ||
      (activeTag === 'Templates' && d.category === 'Templates') ||
      activeTag === 'Archive';
    return matchFile && matchTag;
  });

  if (authLoading) {
    return (
      <main className="bg-[#001c3da1] min-h-screen flex items-center justify-center">
        <span className="text-white text-lg">Loading…</span>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="bg-[#001c3da1] min-h-screen">
      <Navbar />

      {showUpload && token && (
        <UploadModal
          token={token}
          onClose={() => setShowUpload(false)}
          onUploaded={(doc) => setDocuments((prev) => [doc, ...prev])}
        />
      )}

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">

        {/* Header */}
        <header className="mb-16 md:flex items-end justify-between">
          <div className="max-w-2xl">
            <h4 className="text-5xl md:text-6xl text-[#FFF8F0] mb-6 font-bold">
              Document Portal
            </h4>
            <p className="text-[#FFF8F0] text-lg leading-relaxed">
              All UCMSA related documents (minutes, templates, budget plans) are stored here.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            {isAdmin && (
              <button
                onClick={() => setShowUpload(true)}
                className="bg-[rgba(255,255,255,0.5)] text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-[#1c6b51]/20 active:scale-95 transition-transform hover:opacity-90"
              >
                <span className="material-symbols-outlined">upload_file</span>
                Upload New
              </button>
            )}
          </div>
        </header>

        {/* Search & Filter Bar */}
        <section className="mb-12 sticky top-[4.25rem] md:top-[calc(2vw+3rem)] z-40">
          <div className={`bg-[rgba(255,255,255,0.5)] backdrop-blur-md rounded-3xl shadow-sm transition-all duration-300 ${isScrolled ? 'p-3 space-y-2' : 'p-4 sm:p-6 space-y-4 sm:space-y-6'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Search */}
              <div className="lg:col-span-6 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#001c3da1]">search</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full pl-12 pr-4 bg-white border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001c3da1]/20 placeholder:text-[#001c3da1] text-[#001c3da1] transition-all duration-300 ${isScrolled ? 'py-2 text-sm' : 'py-3 sm:py-4'}`}
                  placeholder="Search documents..."
                  type="text"
                />
              </div>

              {/* File type */}
              <div className="lg:col-span-2">
                <select
                  value={fileFilter}
                  onChange={(e) => setFileFilter(e.target.value)}
                  className={`w-full px-4 bg-white border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1c6b51]/20 text-[#2e695c] appearance-none transition-all duration-300 ${isScrolled ? 'py-2 text-sm' : 'py-3 sm:py-4'}`}
                >
                  <option>All File Types</option>
                  <option>PDF Documents</option>
                  <option>DOCX Files</option>
                  <option>Spreadsheets</option>
                </select>
              </div>

              {/* Category */}
              <div className="lg:col-span-2">
                <select
                  value={catFilter}
                  onChange={(e) => setCatFilter(e.target.value)}
                  className={`w-full px-4 bg-white border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1c6b51]/20 text-[#2e695c] appearance-none transition-all duration-300 ${isScrolled ? 'py-2 text-sm' : 'py-3 sm:py-4'}`}
                >
                  <option>All Categories</option>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Reset button */}
              <div className="lg:col-span-2 flex gap-2">
                <button
                  onClick={() => { setSearch(''); setFileFilter('All File Types'); setCatFilter('All Categories'); setActiveTag(null); }}
                  className={`flex-1 bg-[#001c3da1] text-[#FFF8F0] font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#1c6b51]/10 ${isScrolled ? 'py-2 text-sm' : 'py-3 sm:py-4'}`}
                >
                  <span className="material-symbols-outlined">filter_list</span>
                  Reset
                </button>
              </div>
            </div>

            {/* Popular Tags */}
            <div className={`flex flex-wrap gap-2 items-center transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-20 opacity-100'}`}>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFF8F0] px-2">Popular Tags:</span>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={[
                    'px-4 py-1.5 rounded-full text-xs font-semibold transition-colors',
                    activeTag === tag ? 'bg-[#1c6b51] text-white' : 'bg-[#c9d3ff] text-[#1d3989] hover:bg-[#dce1ff]',
                  ].join(' ')}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Document Grid */}
        {fetchLoading ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-[#FFF8F0] text-lg">Loading documents…</span>
          </div>
        ) : fetchError ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-300">{fetchError}</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length === 0 && (
              <div className="lg:col-span-2 flex items-center justify-center py-20 text-[#FFF8F0]/60">
                No documents found.
              </div>
            )}
            {filtered.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                isAdmin={isAdmin}
                onDelete={(id) => setDocuments((prev) => prev.filter((d) => d.id !== id))}
              />
            ))}
            <ArchivistCard />
          </section>
        )}

        {/* Load More (decorative) */}
        <div className="mt-20 flex flex-col items-center">
          <div className="h-px w-24 bg-[#4c8577]/20 mb-8" />
          <button className="group flex items-center gap-4 text-[#FFF8F0] font-bold tracking-tight">
            <span className="text-sm">DISCOVER MORE DOCUMENTS</span>
            <span className="w-12 h-12 bg-[rgba(255,255,255,0.5)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">arrow_downward</span>
            </span>
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
