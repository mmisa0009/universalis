'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { members } from '../data/members';

     
function MemberSlider({ boardType, membersList }) {
    const sliderRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (sliderRef.current) {
                    if (entry.isIntersecting) {
                    sliderRef.current.classList.add('animate');
                    } else {
                    sliderRef.current.classList.remove('animate');
                    }
                }
            });
        }, { threshold: 0.5 });
            
        
        if (sliderRef.current) {
            observer.observe(sliderRef.current);
        }

        return () => {
            if (sliderRef.current) {
                observer.unobserve(sliderRef.current);
            }
        };
    }, []);

    return (
        <div ref={sliderRef} className={`member-slider ${boardType.toLowerCase()} flex gap-4 whitespace-nowrap items-center relative overflow-visible w-full`}>
            {membersList.map((member, index) => (
                <div key={index} className="member inline-block text-center bg-[rgba(255, 255, 255, 0.7)] backdrop-blur-md border-[rgba(255, 255, 255, 0.9)]  shadow-2xl rounded-[25px] text-[#001C3D] p-4 gap-4 h-[25vh] mt-4">
                    <Image src={member.img} alt={member.name} width={100} height={100} className="h-[70%] w-auto rounded-[15px]" />
                    <h4>{member.position}</h4>
                    <p>{member.name}</p>
                </div>
            ))}
        </div>
    );
}


export default function Section4() {
    const ebMembers = members.filter(m => m.board === "EB");
    const sbMembers = members.filter(m => m.board === "SB");
    const abMembers = members.filter(m => m.board === "AB");
    return (
        <div className="bg-[#FFF8F0] text-[#001C3D] w-full relative h-auto overflow-hidden pb-4">
            <h2 className="absolute z-10 origin-bottom-right right-[8vw] -rotate-90 translate-y-[-100%] text-[12vh] font-bold whitespace-nowrap text-right p-0 pr-[0.8em] pb-0">
                Meet Our Team
            </h2>
            <div className="relative z-20 pb-8">
                <MemberSlider boardType="EB" membersList={ebMembers} />
                <br />
                <MemberSlider boardType="SB" membersList={sbMembers} />
                <br />
                <MemberSlider boardType="AB" membersList={abMembers} />
            </div>
        </div>
    );
}