'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


interface Committee {
    name: string;
    description: string;
    image: string;
    instagram: string;
    email: string;
}

const committees: Committee[] = [
    {
        name: 'Art',
        description: 'coming soon',
        image: '/art.png',
        instagram: 'https://www.instagram.com/ucmartsociety/',
        email: 'ucmartcommittee@gmail.com',
    },
    {
        name: 'Bookclub',
        description: 'coming soon',
        image: '/bookclub.jpg',
        instagram: 'https://www.instagram.com/ucm_book_club/',
        email: 'ucmbookclub2023@gmail.com',
    },
    {
        name: 'Charity',
        description: 'coming soon',
        image: '/charity.jpg',
        instagram: 'https://www.instagram.com/ucm.charitycommittee/',
        email: 'ucmcharitycommitee23@gmail.com',
    },
    {
        name: 'Cooking',
        description: 'coming soon',
        image: '/cooking.jpg',
        instagram: 'https://www.instagram.com/forkyeah.ucm/',
        email: 'ucm.forkyeah@gmail.com',
    },
    {
        name: 'Exco Excursion',
        description: 'coming soon',
        image: '/excursion.jpg',
        instagram: 'https://www.instagram.com/ucm_exco/',
        email: 'exco.ucmaastricht@gmail.com',
    },
    {
        name: 'Film',
        description: 'coming soon',
        image: '/film.jpeg',
        instagram: 'https://www.instagram.com/ucmfilmcommittee/',
        email: 'ucmfilmcommittee1@gmail.com',
    },
    {
        name: 'Finance',
        description: 'coming soon',
        image: '/finance.jpeg',
        instagram: 'https://www.instagram.com/ucmfinancecommittee/',
        email: 'ucmfinancecommittee@gmail.com',
    },
    {
        name: 'Games',
        description: 'coming soon',
        image: '/games.jpg',
        instagram: 'https://www.instagram.com/ucm_gcc/',
        email: 'ucmgamesandchesscommittee@gmail.com',
    },
    {
        name: 'Gardening',
        description: 'coming soon',
        image: '/gardening.jpg',
        instagram: 'https://www.instagram.com/ucmgardenningcommittee/',
        email: 'Gardening4ucm@gmail.com',
    },
    {
        name: 'Gay Agenda',
        description: 'coming soon',
        image: '/gayAgenda.jpg',
        instagram: 'https://www.instagram.com/gayagenda_ucm/',
        email: 'ucmthegayagenda@gmail.com',
    },
    {
        name: 'Graduation',
        description: 'coming soon',
        image: '/graduation.jpg',
        instagram: '#',
        email: '',
    },
    {
        name: 'Hypatia',
        description: 'coming soon',
        image: '/hypatia.jpg',
        instagram: 'https://www.instagram.com/ucm.hypatia/',
        email: 'ucmhypatiacommittee@gmail.com',
    },
    {
        name: 'IRDC',
        description: 'coming soon',
        image: '/irdc.jpg',
        instagram: 'https://www.instagram.com/irdc.ucm/',
        email: 'irdc.ucm@gmail.com',
    },
    {
        name: 'Limburg',
        description: 'coming soon',
        image: '/limburg.jpg',
        instagram: 'https://www.instagram.com/ucmlimburg/',
        email: 'tech@maastrichtuniversity.nl',
    },
    {
        name: 'Music',
        description: 'coming soon',
        image: '/music.jpg',
        instagram: 'https://www.instagram.com/ucmmusiccommittee/',
        email: 'ucmmusiccommittee2023@gmail.com',
    },
    {
        name: 'Party',
        description: 'coming soon',
        image: '/party.jpeg',
        instagram: 'https://www.instagram.com/ucm_party/',
        email: 'partycommitteeucm@gmail.com',
    },
    {
        name: 'Philosophy',
        description: 'coming soon',
        image: '/philosophy.jpg',
        instagram: 'https://www.instagram.com/ucm_philosophy_committee/',
        email: 'philosophycommitteeucm@gmail.com',
    },
    {
        name: 'Poetry',
        description: 'coming soon',
        image: '/poetry.jpg',
        instagram: 'https://www.instagram.com/ucmpoetrysociety/',
        email: 'poetrysociety.ucm@gmail.com',
    },
    {
        name: 'Radio',
        description: 'coming soon',
        image: '/radio.jpg',
        instagram: '#',
        email: 'rumoradio@gmail.com',
    },
    {
        name: 'Spiritual Enlightenment',
        description: 'coming soon',
        image: '/spiritualEnlightenment.jpg',
        instagram: 'https://www.instagram.com/spiritualenlightenment.ucm/',
        email: 'spiritual.enlightenment.se@gmail.com',
    },
    {
        name: 'Sports',
        description: 'coming soon',
        image: '/sports.jpg',
        instagram: 'https://www.instagram.com/ucmsportscommittee/',
        email: 'ucmsportscommittee@gmail.com',
    },
    {
        name: 'Sustainability',
        description: 'coming soon',
        image: '/sustainability.jpg',
        instagram: 'https://www.instagram.com/sustainabilitycommittee_ucm/',
        email: 'suatainabilitycommitteeucm@gmail.com',
    },
    {
        name: 'Theatre',
        description: 'coming soon',
        image: '/theatre.jpg',
        instagram: 'https://www.instagram.com/ucmtheatercommittee/',
        email: 'ucmtheatercommittee@gmail.com',
    },
    {
        name: 'The Bell',
        description: 'coming soon',
        image: '/theBell.jpg',
        instagram: 'https://www.instagram.com/ucmthebell/',
        email: 'ucmthebell@gmail.com',
    },
    {
        name: 'UCSRN',
        description: 'coming soon',
        image: '/ucsrn.png',
        instagram: 'https://www.instagram.com/ucm_ucsrn_committee/',
        email: '#',
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
                                    className="object-cover transition-all duration-700"
                                />
                            </div>
                            <div className="flex-grow space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="h-px w-8 bg-[#c4c6cf]/40" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-semibold text-[#001c3d]">
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
        </main>
    );
}
