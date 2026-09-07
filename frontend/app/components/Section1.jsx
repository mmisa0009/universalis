'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

const DEFAULT_HERO_IMAGE = '/allMember.png';

export default function Section1() {
  const { user, token } = useAuth();
  const isAdmin = user && ['board', 'admin'].includes(user.role?.toLowerCase());

  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data.hero_image_url) setHeroImage(data.hero_image_url);
      })
      .catch(() => {});
  }, []);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'site');
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed');

      const settingsRes = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key: 'hero_image_url', value: uploadData.url }),
      });
      const settingsData = await settingsRes.json();
      if (!settingsRes.ok) throw new Error(settingsData.error || 'Failed to save');

      setHeroImage(settingsData.value);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <header className="relative h-full bg-[#001C3D] overflow-hidden flex flex-col">

      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <Image
          key={heroImage}
          src={heroImage}
          alt=""
          fill
          className="object-cover opacity-35"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001C3D] via-[#001C3D]/30 to-[#001C3D]/0" />
      </div>

      {isAdmin && (
        <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white/90 backdrop-blur-sm text-[#001C3D] rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-sm disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-sm">photo_camera</span>
            {uploading ? 'Uploading...' : 'Change background'}
          </button>
          {error && (
            <p className="max-w-[220px] text-right text-[11px] text-red-300 bg-[#001C3D]/80 px-2 py-1 rounded-lg">
              {error}
            </p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#ffe088]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-8 md:px-14 pt-10 pb-10">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Image
            src="/universalis-logo.png"
            alt="Universalis logo"
            width={80}
            height={80}
            className="w-18 h-auto opacity-85"
          />

        </div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col justify-end pb-6">
          <p className=" uppercase tracking-[0.3em] text-[10px] font-bold mb-5">
            University College Maastricht Study Association
          </p>
          <h1
            className="font-bold text-white  leading-[0.88] mb-7"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)' }}
          >
            UCMSA<br />Universalis
          </h1>
          <p className="text-white/55 text-base md:text-lg max-w-lg leading-relaxed">
            Enjoy the social and academic activities supported by Universalis —
            a multicultural association with 750+ members.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between">
          <span className="text-white/20 uppercase tracking-widest text-[9px] hidden md:block">
            Est. 2002
          </span>
          <div className="flex items-center gap-2 text-white/30 text-xs ml-auto">
            <span>Scroll to explore</span>
            <svg className="w-3 h-3 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7-7 7" />
            </svg>
          </div>
        </div>

      </div>
    </header>
  );
}
