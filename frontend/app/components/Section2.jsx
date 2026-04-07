'use client';

import Image from 'next/image';
import { useRef } from 'react';

const announcements = [
  {
    tag: 'Social',
    tagColor: 'bg-[#d8e0f3] text-[#001C3D]',
    title: 'The Winter Ball: Archive Edition',
    time: 'Dec 15, 20:00',
    location: 'The Great Hall',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASqr7M3GahuBbvhlVDjISwEufOW7GTxZc78OVJdE9Q6Yf2WblbSuq5TwvITRHGPnR2MKIlYagT-iMpoS7H3CdNeyZbVptz3rmQWd3Lm_4tYATD_PLSsJEzIETtcuWo9cC9ZP6QwRHwhkz7JJwc43kI4pR447AugwHtBNcSYE7LyRnYApD2Y73M7vn9pm2a4S4GaqyC9rTDq_Gc06PtgCPUGTzNWkDhMDXtVmOT-TGL-AkiqIoxW4mUTdILaUhx3s8lt4uUzF0kZew',
  },
  {
    tag: 'Academic',
    tagColor: 'bg-[#351100] text-[#b27658]',
    title: 'GA: Budget Approval',
    time: 'Nov 28, 18:30',
    location: 'UCM Auditorium',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbh2IxOqF_qQi5BVffVh_VQNvYVOwamLJ6rutTrPqAGUCuVj5RZy-RJK6H_IdzcLO98tijOiusfgDSV9pjk3A3pmMN27l_kJTwJ7kpZfG5QOLL5i5sy2KDIIOn1rhGoNJ55YdBdBJVIWinjqeXlyXT0FlKkLt00-Rgu4Ctxyc69RqdPsf1LaPJyREKpxxVMo7HD2qK-X5Atu892ZAJTEFSwChdpqjao-0blGypLCPHeub0TBCOK_r431pfNseggA0tIVz8HcOGjFo',
  },
  {
    tag: 'Academic',
    tagColor: 'bg-[#351100] text-[#b27658]',
    title: 'GA: Budget Approval',
    time: 'Nov 28, 18:30',
    location: 'UCM Auditorium',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbh2IxOqF_qQi5BVffVh_VQNvYVOwamLJ6rutTrPqAGUCuVj5RZy-RJK6H_IdzcLO98tijOiusfgDSV9pjk3A3pmMN27l_kJTwJ7kpZfG5QOLL5i5sy2KDIIOn1rhGoNJ55YdBdBJVIWinjqeXlyXT0FlKkLt00-Rgu4Ctxyc69RqdPsf1LaPJyREKpxxVMo7HD2qK-X5Atu892ZAJTEFSwChdpqjao-0blGypLCPHeub0TBCOK_r431pfNseggA0tIVz8HcOGjFo',
  },
  {
    tag: 'Careers',
    tagColor: 'bg-[#d8e0f3] text-[#001C3D]',
    title: 'Alumni Mentorship Open',
    time: 'Ongoing',
    location: 'Online Portal',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACqFM8KGFCbmsWvYENY7LpuxJLL0hZk9aL3tdaLHpvL1GKMFRpu4ZY65xXraOsraNAO42PYzUqxAm-Nkos5gzVEZ6seVs-SIEUzjoFfODRomIeu8AxfGjJ6OH82NXucS3quuIazsa8fJ0-QURv6GAbQg2Jav6lrbCTZMDgRjiDT7LmhhGF0IYLC6jGPVTuVwGae0zytmVdrlBkQqvS3TxqLxUL1gDRqFkoCc50GKi0mu15VGcOP4gYiVI7TfuJ3SS6HmY6sb9MeEU',
  },
];

export default function Section2() {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
    <section className="py-24 px-8 bg-[#f9f3eb]">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="font-['Newsreader'] text-5xl font-bold text-[#001C3D]">Announcements</h2>
                <div className="h-1 w-24 bg-[#001C3D] mt-4"></div>
            </div>
            <div className="flex gap-4">
                <button onClick={scrollLeft} className="group w-12 h-12 rounded-full border border-[#74777f] flex items-center justify-center hover:bg-[#001C3D] hover:text-white transition-all">
                    <div className="relative w-5 h-5">
                        <Image
                            src="/arrow.png"
                            alt="arrow left"
                            fill
                            className="object-contain scale-x-[-1] group-hover:invert"
                        />
                    </div>
                </button>
                <button onClick={scrollRight} className="group w-12 h-12 rounded-full border border-[#74777f] flex items-center justify-center hover:bg-[#001C3D] hover:text-white transition-all">
                    <div className="relative w-5 h-5">
                        <Image
                            src="/arrow.png"
                            alt="arrow right"
                            fill
                            className="object-contain group-hover:invert"
                        />
                    </div>
                </button>
            </div>
        </div>

        <div ref={sliderRef} className="flex gap-8 overflow-x-auto pb-8 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {announcements.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-80 bg-white rounded-xl overflow-hidden shadow-sm group">
                    <div className="h-48 overflow-hidden relative">
                        <Image
                            src={item.img}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex gap-2 mb-3">
                            <span className={`${item.tagColor} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter`}>
                            {item.tag}
                            </span>
                        </div>
                        <h3 className="font-['Newsreader'] text-xl font-bold mb-4 text-[#001C3D]">{item.title}</h3>
                        <div className="space-y-2 text-[#44474e] text-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                <span className='text-[#001C3D]'>{item.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                <span className='text-[#001C3D]'>{item.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
}