'use client';

import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadImage } from '@/lib/uploadImage';

/**
 * @param {{
 *   committee?: { id: string, name: string, description: string, image: string, instagram: string, email: string } | null,
 *   onClose: () => void,
 *   onSave: (committee: any) => void,
 * }} props
 */
export default function CommitteeModal({ committee, onClose, onSave }) {
  const { token } = useAuth();
  const [name, setName] = useState(committee?.name || '');
  const [description, setDescription] = useState(committee?.description || '');
  const [instagram, setInstagram] = useState(committee?.instagram || '');
  const [email, setEmail] = useState(committee?.email || '');
  const [imageUrl, setImageUrl] = useState(committee?.image || '');
  const [imagePreview, setImagePreview] = useState(committee?.image || '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  async function doUpload(file) {
    setUploading(true);
    setError('');
    try {
      const url = await uploadImage(file, 'committees', token);
      setImageUrl(url);
      setImagePreview(url);
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
    doUpload(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImagePreview(URL.createObjectURL(file));
      doUpload(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) { setError('Name is required.'); return; }
    setSaving(true);
    setError('');

    const body = {
      name: name.trim(),
      description: description.trim(),
      instagram: instagram.trim(),
      email: email.trim(),
      image: imageUrl,
    };

    try {
      const url = committee ? `/api/committees/${committee.id}` : '/api/committees';
      const method = committee ? 'PATCH' : 'POST';
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
            {committee ? 'Edit Committee' : 'New Committee'}
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
                    <span className="text-xs">JPEG, PNG, WebP — max 4MB</span>
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
                placeholder="e.g. Bookclub"
                className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] placeholder-gray-300 transition-colors bg-transparent text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What does this committee do?"
                rows={4}
                className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] placeholder-gray-300 transition-colors bg-transparent text-sm resize-none"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Instagram URL
              </label>
              <input
                type="text"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                placeholder="https://www.instagram.com/..."
                className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] placeholder-gray-300 transition-colors bg-transparent text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Contact Email
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. committee@gmail.com"
                className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] placeholder-gray-300 transition-colors bg-transparent text-sm"
              />
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
                {saving ? 'Saving...' : committee ? 'Save Changes' : 'Add Committee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
