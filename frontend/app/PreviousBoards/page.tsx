'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const years = [
    { label: "2023 – 2024", ordinal: "6th Board" },
    { label: "2022 – 2023", ordinal: "5th Board" },
    { label: "2021 – 2022", ordinal: "4th Board" },
    { label: "2020 – 2021", ordinal: "3rd Board" },
    { label: "2019 – 2020", ordinal: "2nd Board" },
    { label: "Founding Board", ordinal: "1st Board" },
];

const boardMembers = [
    { role: "President",           name: "Elias van der Berg", email: "elias.berg@universalis.nl",      img: "/treasurer_eb 1.png" },
    { role: "Secretary",           name: "Sophie Larsson",     email: "sophie.larsson@universalis.nl",  img: "/treasurer_eb 1.png" },
    { role: "Treasurer",           name: "Marcello Rossi",     email: "marcello.rossi@universalis.nl",  img: "/treasurer_eb 1.png" },
    { role: "Social Internal",     name: "Amara Okafor",       email: "amara.okafor@universalis.nl",    img: "/treasurer_eb 1.png" },
    { role: "Social External",     name: "Thomas Muller",      email: "thomas.muller@universalis.nl",   img: "/treasurer_eb 1.png" },
    { role: "Academic Internal",   name: "Elena Costa",        email: "elena.costa@universalis.nl",     img: "/treasurer_eb 1.png" },
    { role: "Social Chair",        name: "Julian Weaver",      email: "julian.weaver@universalis.nl",   img: "/treasurer_eb 1.png" },
    { role: "Social Acquisitions", name: "Clara Schmidt",      email: "clara.schmidt@universalis.nl",   img: "/treasurer_eb 1.png" },
    { role: "Academic Chair",      name: "Leo Fontaine",       email: "leo.fontaine@universalis.nl",    img: "/treasurer_eb 1.png" },
    { role: "Academic Events",     name: "Maya Patel",         email: "maya.patel@universalis.nl",      img: "/treasurer_eb 1.png" },
    { role: "Academic External",   name: "Hugo Janssen",       email: "hugo.janssen@universalis.nl",    img: "/treasurer_eb 1.png" },
    { role: "Media",               name: "Isabella Rossi",     email: "isabella.rossi@universalis.nl",  img: "/treasurer_eb 1.png" },
];

export default function PreviousBoardsPage() {
    const [activeYear, setActiveYear] = useState(years[0].label);
    const active = years.find((y) => y.label === activeYear)!;

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

                    {/* Mobile year picker — stacked above grid */}
                    <div className="md:hidden w-full mb-8">
                        <p className="font-sans uppercase tracking-widest text-[10px] text-[#735c00] font-bold mb-4">
                            Academic Year
                        </p>
                        <div
                            className="flex gap-2 overflow-x-auto pb-1"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {years.map((y) => {
                                const isActive = y.label === activeYear;
                                return (
                                    <button
                                        key={y.label}
                                        onClick={() => setActiveYear(y.label)}
                                        className={[
                                            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-sans font-medium border transition-all duration-200",
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
                            <p className="font-sans uppercase tracking-widest text-[10px] text-[#735c00] font-bold mb-6">
                                Academic Year
                            </p>
                            <nav className="flex flex-col">
                                {years.map((y) => {
                                    const isActive = y.label === activeYear;
                                    return (
                                        <button
                                            key={y.label}
                                            onClick={() => setActiveYear(y.label)}
                                            className={[
                                                "text-left py-3 text-sm font-sans border-l-2 pl-4 transition-all duration-200",
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
                            <div className="mb-10">
                                <span className="font-sans uppercase tracking-widest text-xs text-[#735c00] font-bold block mb-2">
                                    The {active.ordinal}
                                </span>
                                <h2 className="font-serif text-4xl md:text-5xl text-[#001c3d]">
                                    {activeYear === "Founding Board" ? "Founding Board" : `Academic Year ${activeYear}`}
                                </h2>
                            </div>

                            {/* Member grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:gap-x-8 md:gap-y-14">
                                {boardMembers.map((member, i) => (
                                    <div key={i} className="group flex flex-col">

                                        {/* Photo */}
                                        <div className="aspect-[3/4] relative bg-[#e8e0d8] mb-4 overflow-hidden">
                                            <Image
                                                fill
                                                src={member.img}
                                                alt={`${member.name} – ${member.role}`}
                                                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="py-1">
                                            <p className="text-[#001c3d] font-bold text-sm sm:text-base leading-snug">{member.name}</p>
                                            <p className="text-[#001c3d]/50 text-xs sm:text-sm mt-1 font-medium">{member.role}</p>
                                            <a
                                                href={`mailto:${member.email}`}
                                                aria-label={`Email ${member.name}`}
                                                className="inline-flex mt-2 text-[#44474e] hover:text-[#001c3d] transition-colors"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                </svg>
                                            </a>
                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>

            </div>

            <div className="mb-24" />
            <Footer />
        </main>
    );
}
