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
        description: 'Curating the visual identity of student life through exhibitions and collaborative murals. The Art Committee serves as the primary custodian of the campus galleries, fostering a space where experimental aesthetics meet community dialogue.',
        image: '/art.png',
        instagram: '#',
        email: 'ucmartcommittee@gmail.com',
    },
    {
        name: 'Bookclub',
        description: 'Fostering critical discourse and eloquence through competitive inter-collegiate tournaments. Our archives preserve decades of rhetorical history, tracking the evolution of campus thought through intense parliamentary-style engagement.',
        image: '/bookclub.jpg',
        instagram: '#',
        email: 'ucmbookclub2023@gmail.com',
    },
    {
        name: 'Charity',
        description: 'Mobilizing resources for local social equity initiatives and sustainable development goals. The committee manages a portfolio of long-term partnerships with civic organizations, ensuring a legacy of tangible contribution and community stewardship.',
        image: '/charity.jpg',
        instagram: '#',
        email: 'ucmcharitycommitee23@gmail.com',
    },
    {
        name: 'Cooking',
        description: 'Preserving the classical traditions of orchestral performance within a modern campus context. Our record keeping includes a complete catalog of sheet music and digital audio captures from performances dating back to the late 70s.',
        image: '/cooking.jpg',
        instagram: '#',
        email: 'ucm.forkyeah@gmail.com',
    },
    {
        name: 'Exco Excursion',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/excursion.jpg',
        instagram: '#',
        email: 'exco.ucmaastricht@gmail.com',
    },
    {
        name: 'Film',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/film.jpeg',
        instagram: '#',
        email: 'ucmfilmcommittee1@gmail.com',
    },
    {
        name: 'Finance',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/finance.jpeg',
        instagram: '#',
        email: 'ucmfinancecommittee@gmail.com',
    },
    {
        name: 'Games',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/games.jpg',
        instagram: '#',
        email: 'ucmgamesandchesscommittee@gmail.com',
    },
    {
        name: 'Gardening',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/gardening.jpg',
        instagram: '#',
        email: 'Gardening4ucm@gmail.com',
    },
    {
        name: 'Gay Agenda',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/gayAgenda.jpg',
        instagram: '#',
        email: 'ucmthegayagenda@gmail.com',
    },
    {
        name: 'Graduation',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/graduation.jpg',
        instagram: '#',
        email: '',
    },
    {
        name: 'Hypatia',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/hypatia.jpg',
        instagram: '#',
        email: 'ucmhypatiacommittee@gmail.com',
    },
    {
        name: 'IRDC',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/irdc.jpg',
        instagram: '#',
        email: 'irdc.ucm@gmail.com',
    },
    {
        name: 'Limburg',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/limburg.jpg',
        instagram: '#',
        email: 'tech@maastrichtuniversity.nl',
    },
    {
        name: 'Music',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/music.jpg',
        instagram: '#',
        email: 'ucmmusiccommittee2023@gmail.com',
    },
    {
        name: 'Party',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/party.jpeg',
        instagram: '#',
        email: 'partycommitteeucm@gmail.com',
    },
    {
        name: 'Philosophy',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/philosophy.jpg',
        instagram: '#',
        email: 'philosophycommitteeucm@gmail.com',
    },
    {
        name: 'Poetry',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/poetry.jpg',
        instagram: '#',
        email: 'poetrysociety.ucm@gmail.com',
    },
    {
        name: 'Radio',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/radio.jpg',
        instagram: '#',
        email: 'rumoradio@gmail.com',
    },
    {
        name: 'Spiritual Enlightenment',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/spiritualEnlightenment.jpg',
        instagram: '#',
        email: 'spiritual.enlightenment.se@gmail.com',
    },
    {
        name: 'Sports',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/sports.jpg',
        instagram: '#',
        email: 'ucmsportscommittee@gmail.com',
    },
    {
        name: 'Sustainability',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/sustainability.jpg',
        instagram: '#',
        email: 'suatainabilitycommitteeucm@gmail.com',
    },
    {
        name: 'Theatre',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/theatre.jpg',
        instagram: '#',
        email: 'ucmtheatercommittee@gmail.com',
    },
    {
        name: 'The Bell',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/theBell.jpg',
        instagram: '#',
        email: 'ucmthebell@gmail.com',
    },
    {
        name: 'UCSRN',
        description: 'Developing digital solutions and exploring the ethical frontiers of emerging technologies. The newest chapter in our archive, focusing on the intersection of human-centered design and technical infrastructure.',
        image: '/ucsrn.png',
        instagram: '#',
        email: ' ',
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
