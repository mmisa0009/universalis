'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { announcements } from '../data/announcements';

export default function Section2() {
    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragScrollLeft = useRef(0);

    const scrollLeft = () => {
        sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

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
        sliderRef.current.style.cursor = 'grab';
    };

    return (
    <section className="h-full flex flex-col pt-20 pb-10 px-4 sm:pt-24 sm:pb-14 sm:px-8 bg-[#f9f3eb]">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
            <div>
                <h2 className="text-3xl sm:text-5xl font-bold text-[#001C3D]">Announcements</h2>
                <div className="h-1 w-24 bg-[#001C3D] mt-4"></div>
            </div>
            <div className="flex gap-4">
                <button onClick={scrollLeft} className="group w-12 h-12 rounded-full border border-[#74777f] flex items-center justify-center hover:bg-[#001C3D] hover:border-[#001C3D] hover:shadow-lg transition-all duration-300">
                    <div className="relative w-6 h-6">
                        <Image
                            src="/arrow.png"
                            alt="arrow left"
                            fill
                            quality={100}
                            className="object-contain scale-x-[-1] group-hover:invert"
                        />
                    </div>
                </button>
                <button onClick={scrollRight} className="group w-12 h-12 rounded-full border border-[#74777f] flex items-center justify-center hover:bg-[#001C3D] hover:border-[#001C3D] hover:shadow-lg transition-all duration-300">
                    <div className="relative w-6 h-6">
                        <Image
                            src="/arrow.png"
                            alt="arrow right"
                            fill
                            quality={100}
                            className="object-contain group-hover:invert"
                        />
                    </div>
                </button>
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
            {announcements.map((item, i) => (
                <div key={i} className="snap-start flex-shrink-0 w-full sm:w-80 bg-white rounded-2xl overflow-hidden shadow-md group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    <div className="h-64 overflow-hidden relative">
                        <Image
                            src={item.img}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        <span className={`absolute top-3 left-3 ${item.tagColor} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm`}>
                            {item.tag}
                        </span>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-[#001C3D] leading-snug">{item.title}</h3>
                        <div className="space-y-2 text-sm font-[family-name:var(--font-inter)]">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-[#001C3D]/50" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                                <span className='text-[#001C3D]'>{item.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-[#001C3D]/50" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                <span className='text-[#001C3D]'>{item.location}</span>
                            </div>
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
  );
}