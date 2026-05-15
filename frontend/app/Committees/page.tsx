'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

type Category = 'Foundational' | 'Social' | 'Academic' | 'Impact' | 'Creative';

interface Committee {
    name: string;
    category: Category;
    established: string;
    description: string;
    image: string;
    instagram: string;
    email: string;
}

const committees: Committee[] = [
    {
        name: 'Art Committee',
        category: 'Creative',
        established: '1994',
        description: 'Curating the visual identity of student life through exhibitions and collaborative murals. The Art Committee serves as the primary custodian of the campus galleries, fostering a space where experimental aesthetics meet community dialogue.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4eIXZEiL-IRygBaF0CNTNf8zTfv6XqhEHjHwm9TDsvKvdlkvznkr_UYeoev5Q_2jWUxN5PkCzetu79eTMspJp3nJSXFoWWaZTOk6rbCmGWeQP9jz9FbJWQy1m0RMm4RAwYkHitRqlZQokrESeFRCYVdAzPIWh-MZakaeq_cayK85E6-Q40QAwMmSy2GcYPj019RAm9HJYLXWzxekpUjVQdopaSsXTBOEqhsJnBVB_cBSQ4SZD66h1U-AB-uNYLjmtRRod08H1e9E',
        instagram: '#',
        email: 'art@maastrichtuniversity.nl',
    },
    {
        name: 'Debate Society',
        category: 'Academic',
        established: '1988',
        description: 'Fostering critical discourse and eloquence through competitive inter-collegiate tournaments. Our archives preserve decades of rhetorical history, tracking the evolution of campus thought through intense parliamentary-style engagement.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhwmzdGIAuVdHzz6EW2bVGqGAjzkdMaz9bc2648rvxi9Jza0Mf_5yXwgrgB9Zj4g0GxMvp_D1S3aZDxb2LQUMNy2dYd3p56V4QK8q5AjdAXmby5dIc8VhRmWg4XWSttsDvVXsYtIpXEv7x_XlWFAREm7uiQ0fz0tUHIypWr5I_OG6Px-Q2URc7U3yZbzvXrTEv8lTiit8UOW-UblwmNFiFk2tWlk2xNnawliM5642Pd6RrScIU1TcOkh9wfgxCy2SXdSAPOjd8jt4',
        instagram: '#',
        email: 'debate@maastrichtuniversity.nl',
    },
    {
        name: 'Charity Committee',
        category: 'Impact',
        established: '2001',
        description: 'Mobilizing resources for local social equity initiatives and sustainable development goals. The committee manages a portfolio of long-term partnerships with civic organizations, ensuring a legacy of tangible contribution and community stewardship.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9yIAhgeyqlf2vHYt3Nr4YyiIs0YFHY10mywzD03SEntxun5wReRhYT_6hyWaDhwtygG_R43G-NlQQe9rcqcR_pEOLxFf2zEHvATqAv9uGfQo4v4oyHYGDPPZn1fWGnyJwbzHRKfa76DMO1oMHxaTNTa4sVvyofvDy8BxDWLzPvSrIOkwU0ylvASS_6Uv_5FE6_vhsDDVP4aqIE98p4wg_J5kmEa_2Q21z2kDScbUHLyrhsz3XwN40W7PxJXRhDcFxxG6lykdE7qE',
        instagram: '#',
        email: 'charity@maastrichtuniversity.nl',
    },
    {
        name: 'Music Ensemble',
        category: 'Creative',
        established: '1976',
        description: 'Preserving the classical traditions of orchestral performance within a modern campus context. Our record keeping includes a complete catalog of sheet music and digital audio captures from performances dating back to the late 70s.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPRgEYavwEg8BYmad6QM9s3i1n27VRjDC4HTHMxlYKJviEkOCLTf7Rylilcf3Zdc-F0khIkIOzAfx3ZW5O7mY7G2hIkwTDtnhoxSiRZodXgh_88OfwZ9zpC5k1PKjaQlCAA8HsHFWGslPhUXY9cEvKTent_XxkTsgHJx7xv3471WAiS6j6ZJJzefUjQWX6HTsHwnZqd_VSCnJ_jd-pbPi5xUuOsU7RL7FNk0FMANO1chSo8FxYMhfrRBfbAvSBR_2v7OkYx-Jp2Cs',
        instagram: '#',
        email: 'music@maastrichtuniversity.nl',
    },
    {
        name: 'Tech Innovation',
        category: 'Foundational',
        established: '2015',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP8nHmA-y-BfDpCHggwDGeTx4-OD6J8YoWvw_hm6ovbCKSiL7K6YYmlO50QA_K9n3ndONwy42UeefHCUWlmWC-GXzA8FhDPs_ulkRt_o5a3pnSZXB1JP_t8sQUznPbJf1L6Q4bFzP2n6iHSuH6JjfyL0GKf6lCYpK_nHZ-XnxlEbDBp8PXcUi1S3lS8Ja2fbPVqgAGNzZj5XTdE_guKjlLblnKDpqzds92LgvHKMCU0C836NNP2NlPB7DnCGft_mHk54YoHoMZFA',
        instagram: '#',
        email: 'tech@maastrichtuniversity.nl',
    },
];

export default function CommitteesPage() {
    const [search, setSearch] = useState('');

    const filtered = committees.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#FFF8F0]">
            <div className="bg-[url('/maastricht.png')] bg-cover bg-center h-[80vh] flex flex-col items-center justify-center">
                    <Navbar />
                    <div className='flex items-center text-center justify-center backdrop-blur-sm text-[8vmin] w-[80%] h-[65%] lg:max-w-none bg-white/10 p-8 rounded-lg xl:px-20 shadow-[12px_12px_30px_rgba(0,0,0,0.35)]'>Committees</div>
                </div>

            {/* Search Bar */}
            <section className="bg-[#FFF8F0] py-6 px-8 border-y border-[#c4c6cf]/20">
                <div className="max-w-7xl mx-auto">
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
                </div>
            </section>

            {/* Committee List */}
            <section className="px-8 max-w-7xl mx-auto">
                <div className="flex flex-col divide-y divide-[#74777f]/20">
                    {filtered.length === 0 && (
                        <p className="py-20 text-center text-[#74777f]">No committees found.</p>
                    )}
                    {filtered.map((committee) => (
                        <div
                            key={committee.name}
                            className="group py-12 flex flex-col md:flex-row gap-8 md:items-center hover:bg-white/60 transition-colors rounded-sm"
                        >
                            <div className="relative w-full md:w-64 aspect-[3/2] overflow-hidden bg-[#eee7df] rounded-sm flex-shrink-0">
                                <Image
                                    fill
                                    alt={committee.name}
                                    src={committee.image}
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="flex-grow space-y-3">
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#74777f]">
                                        {committee.category}
                                    </span>
                                    <div className="h-px w-8 bg-[#c4c6cf]/40" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#74777f]">
                                        Est. {committee.established}
                                    </span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-serif text-[#001c3d]">
                                    {committee.name}
                                </h3>
                                <p className="text-[#44474e] text-sm md:text-base leading-relaxed max-w-3xl">
                                    {committee.description}
                                </p>
                                <div className="flex items-center gap-4 pt-2">
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>
        </main>
    );
}
