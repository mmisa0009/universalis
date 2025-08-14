'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex justify-center mt-12">
            <nav className=" fixed h-10 top-[1.5vw] bg-[rgba(255,255,255,0.5)] flex items-center justify-center gap-[5%] px-[3vw] rounded-[50px] mx-auto mb-4 z-50 text-[1vmin] w-[53vw]">
                <div 
                className="relative inline-block"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                >
                    <button className="text-[#001c3d]  no-underline bg-none border-none p-[2vw] cursor-pointer overflow-visible text-[2.5vmin] hover:bg-[#001c3da1] hover:text-[#fff8f0] hover:rounded-[50px] hover:pt-[0.2em] hover:pb-[0.2em]">
                        Home <i className="fa fa-caret-down"></i>
                    </button>
                    {isOpen && (
                        <div className="absolute bg-[#001c3da1] min-w-[160px] top-full rounded-[25px] shadow-lg">
                            <Link href="#" className="block px-4 py-2 text-[#fff8f0a5] text-[2vmin] hover:underline">
                            Home
                            </Link>
                            <Link href="#" className="block px-4 py-2 text-[#fff8f0a5] text-[2vmin] hover:underline">
                            Committees
                            </Link>
                            <Link href="#" className="block px-4 py-2 text-[#fff8f0a5] text-[2vmin] hover:underline">
                            Previous Boards
                            </Link>
                        </div>
                    )}
                </div>
                <Link href="https://shop.ucmsa.nl/" className="text-[#001C3D] p-[2vw] no-underline bg-none border-none cursor-pointer overflow-visible text-[2.5vmin] hover:bg-[#001c3da1] hover:text-[#FFF8F0] hover:rounded-[50px] hover:pt-[0.2em] hover:pb-[0.2em]">
                    Shop
                </Link>
                <Link href="#" className="text-[#001C3D] p-[2vw] no-underline bg-none border-none cursor-pointer overflow-visible text-[2.5vmin] hover:bg-[#001c3da1] hover:text-[#FFF8F0] hover:rounded-[50px] hover:pt-[0.2em] hover:pb-[0.2em]">
                    Documents
                </Link>
                <Link href="#" className="text-[#001C3D] p-[2vw] no-underline bg-none border-none cursor-pointer overflow-visible text-[2.5vmin] hover:bg-[#001c3da1] hover:text-[#FFF8F0] hover:rounded-[50px] hover:pt-[0.2em] hover:pb-[0.2em]">
                    FAQ
                </Link>
            </nav>
        </div>
    )
}