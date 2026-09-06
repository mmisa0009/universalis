'use client';

import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const BOARDS = [
  { value: 'EB', label: 'Executive Board' },
  { value: 'SB', label: 'Social Board' },
  { value: 'AB', label: 'Academic Board' },
];

// `lockTerm`: when true (used on the Previous Boards archive), the term can
// only be picked from `terms` — editing history shouldn't accidentally spin
// up a new "current" term. When false (used on the homepage), the term is a
// free-text field with existing tags suggested: typing a brand-new tag there
// is exactly how a new term becomes current and archives the old one.
/**
 * @param {{
 *   member?: { id: string, name: string, position: string, board: string, term: string, img: string } | null,
 *   terms?: string[],
 *   defaultTerm?: string,
 *   lockTerm?: boolean,
 *   onClose: () => void,
 *   onSave: (member: any) => void,
 * }} props
 */
export default function MemberModal({ member, terms = [], defaultTerm = '', lockTerm = false, onClose, onSave }) {
  const { token } = useAuth();
  const [name, setName] = useState(member?.name || '');
  const [position, setPosition] = useState(member?.position || '');
  const [board, setBoard] = useState(member?.board || 'EB');
  const [term, setTerm] = useState(member?.term || defaultTerm || '');
  const [imageUrl, setImageUrl] = useState(member?.img || '');
  const [imagePreview, setImagePreview] = useState(member?.img || '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const isNewTerm = !lockTerm && term.trim() && !terms.some(t => t.toLowerCase() === term.trim().toLowerCase());

  async function uploadImage(file) {
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'members');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setImageUrl(data.url);
      setImagePreview(data.url);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    uploadImage(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImagePreview(URL.createObjectURL(file));
      uploadImage(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) { setError('Name is required.'); return; }
    if (!position.trim()) { setError('Position is required.'); return; }
    if (!term.trim()) { setError('Term is required.'); return; }
    setSaving(true);
    setError('');

    const body = { name: name.trim(), position: position.trim(), board, term: term.trim(), img: imageUrl };

    try {
      const url = member ? `/api/members/${member.id}` : '/api/members';
      const method = member ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      onSave(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-[#001C3D]">
            {member ? 'Edit Member' : 'New Member'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="p-6 space-y-5">

            {/* Photo upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Photo
              </label>
              <div
                className={`relative h-44 rounded-xl border-2 border-dashed transition-colors cursor-pointer overflow-hidden ${
                  isDragOver ? 'border-[#001C3D] bg-[#001C3D]/5' : 'border-gray-200 hover:border-[#001C3D]/50'
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imagePreview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2 text-white text-sm font-semibold">
                        <span className="material-symbols-outlined text-base">photo_camera</span>
                        Change photo
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 pointer-events-none">
                    <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                    <span className="text-sm font-medium">Drag & drop or click to upload</span>
                    <span className="text-xs">JPEG, PNG, WebP — max 10MB</span>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <span className="text-sm text-[#001C3D] font-semibold animate-pulse">Uploading...</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Anni Najorka"
                className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] placeholder-gray-300 transition-colors bg-transparent text-sm"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Position <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={position}
                onChange={e => setPosition(e.target.value)}
                placeholder="e.g. President"
                className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] placeholder-gray-300 transition-colors bg-transparent text-sm"
              />
            </div>

            {/* Board */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Board
              </label>
              <div className="flex gap-2 flex-wrap">
                {BOARDS.map(b => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBoard(b.value)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border-2 transition-all ${
                      board === b.value
                        ? 'bg-[#001C3D] text-white border-[#001C3D] scale-105 shadow-sm'
                        : 'bg-transparent text-[#001C3D]/60 border-gray-200 hover:border-[#001C3D]/40'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Term */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Term <span className="text-red-400">*</span>
              </label>
              {lockTerm ? (
                <select
                  value={term}
                  onChange={e => setTerm(e.target.value)}
                  className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] transition-colors bg-transparent text-sm"
                >
                  {terms.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              ) : (
                <>
                  <input
                    type="text"
                    list="member-term-options"
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                    placeholder="e.g. Fall 2025"
                    className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] placeholder-gray-300 transition-colors bg-transparent text-sm"
                  />
                  <datalist id="member-term-options">
                    {terms.map(t => <option key={t} value={t} />)}
                  </datalist>
                  <p className="text-xs text-[#001C3D]/40 mt-1.5">
                    {isNewTerm
                      ? 'New tag — this becomes the current board and moves the existing one to Previous Boards.'
                      : 'Existing tag — this member joins that board.'}
                  </p>
                </>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || uploading}
                className="flex-1 py-3 bg-[#001C3D] text-white rounded-xl text-sm font-bold hover:bg-[#001C3D]/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : member ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
