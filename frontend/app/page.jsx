'use client';

import { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import { WhoWeAre, HowWeWork } from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Footer from './components/Footer';

const SECTIONS = [
    { id: 'intro',         label: 'Home' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'who-we-are',   label: 'Who We Are' },
    { id: 'how-we-work',  label: 'How We Work' },
    { id: 'team',         label: 'Our Team' },
    { id: 'committees',   label: 'Committees' },
    { id: 'footer',       label: 'More' },
];

export default function HomePage() {
    const [active, setActive] = useState(0);
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = sectionRefs.current.findIndex((el) => el === entry.target);
                        if (idx !== -1) setActive(idx);
                    }
                });
            },
            { root: container, threshold: 0.5 }
        );

        sectionRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const scrollToSection = (i) => {
        sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
        <Navbar />
        <div
            ref={containerRef}
            className="h-screen overflow-y-scroll md:snap-y md:snap-proximity"
        >

            {SECTIONS.map((s, i) => {
                const isSnapped = i <= 4;
                return (
                    <div
                        key={s.id}
                        id={s.id}
                        ref={(el) => { sectionRefs.current[i] = el; }}
                        className={isSnapped ? 'h-screen md:snap-start overflow-hidden' : ''}
                    >
                        {i === 0 && <Section1 />}
                        {i === 1 && <Section2 />}
                        {i === 2 && <WhoWeAre />}
                        {i === 3 && <HowWeWork />}
                        {i === 4 && <Section4 />}
                        {i === 5 && <Section5 />}
                        {i === 6 && <Footer />}
                    </div>
                );
            })}

            {/* Dot navigation */}
            <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
                {SECTIONS.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => scrollToSection(i)}
                        aria-label={`Go to ${s.label}`}
                        title={s.label}
                        className={[
                            'w-2 h-2 rounded-full transition-all duration-300',
                            active === i
                                ? 'bg-[#001c3d] scale-125'
                                : 'bg-[#001c3d]/30 hover:bg-[#001c3d]/70',
                        ].join(' ')}
                    />
                ))}
            </div>
        </div>
        </>
    );
}
