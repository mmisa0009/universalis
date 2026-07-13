'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const TAG_COLORS = [
  { label: 'Blue', value: 'bg-[#d8e0f3] text-[#001C3D]' },
  { label: 'Brown', value: 'bg-[#351100] text-[#b27658]' },
  { label: 'Green', value: 'bg-[#d4edda] text-[#155724]' },
  { label: 'Yellow', value: 'bg-[#fff3cd] text-[#856404]' },
  { label: 'Red', value: 'bg-[#f8d7da] text-[#721c24]' },
];

function formatDateTime(date, time) {
  if (!date) return '';
  const d = new Date(date + 'T00:00:00');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = d.getDate();
  const suffix = [11, 12, 13].includes(day) ? 'th' : ['st', 'nd', 'rd'][((day % 10) - 1)] ?? 'th';
  return time ? `${months[d.getMonth()]} ${day}${suffix}, ${time}` : `${months[d.getMonth()]} ${day}${suffix}`;
}

export default function AnnouncementModal({ announcement, onClose, onSave }) {
  const { token } = useAuth();
  const [title, setTitle] = useState(announcement?.title || '');
  const [tag, setTag] = useState(announcement?.tag || '');
  const [tagColor, setTagColor] = useState(announcement?.tag_color || TAG_COLORS[0].value);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState(announcement?.location || '');
  const [imageUrl, setImageUrl] = useState(announcement?.image_url || '');
  const [imagePreview, setImagePreview] = useState(announcement?.image_url || '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (announcement?.time) {
      const match = announcement.time.match(/(\d{2}:\d{2})$/);
      if (match) setTime(match[1]);
    }
  }, []);

  async function uploadImage(file) {
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'announcements');
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
    if (!title.trim()) { setError('Title is required.'); return; }
    setSaving(true);
    setError('');

    const timeStr = date ? formatDateTime(date, time) : (announcement?.time || '');
    const body = { title: title.trim(), tag: tag.trim(), tag_color: tagColor, time: timeStr, location: location.trim(), image_url: imageUrl };

    try {
      const url = announcement ? `/api/announcements/${announcement.id}` : '/api/announcements';
      const method = announcement ? 'PATCH' : 'POST';
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
            {announcement ? 'Edit Announcement' : 'New Announcement'}
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

            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Pizza with the Dean"
                className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] placeholder-gray-300 transition-colors bg-transparent text-sm"
              />
            </div>

            {/* Tag */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Tag / Category
              </label>
              <input
                type="text"
                value={tag}
                onChange={e => setTag(e.target.value)}
                placeholder="e.g. Universalis AB, Party"
                className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] placeholder-gray-300 transition-colors bg-transparent text-sm"
              />
            </div>

            {/* Tag color */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Tag Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {TAG_COLORS.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setTagColor(c.value)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border-2 transition-all ${c.value} ${
                      tagColor === c.value ? 'border-[#001C3D] scale-105 shadow-sm' : 'border-transparent opacity-60 hover:opacity-90'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] transition-colors bg-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full border-b-2 border-gray-200 focus:border-[#001C3D] outline-none py-2 text-[#001C3D] transition-colors bg-transparent text-sm"
                />
              </div>
            </div>
            {(date || time) && (
              <p className="text-xs text-[#001C3D]/50 -mt-3">
                Preview: <span className="font-medium">{formatDateTime(date, time)}</span>
              </p>
            )}

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Common Room"
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
                {saving ? 'Saving...' : announcement ? 'Save Changes' : 'Add Announcement'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
