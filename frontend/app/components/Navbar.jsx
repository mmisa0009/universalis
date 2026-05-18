'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    async function handleLogout() {
        await logout();
        router.push('/');
    }

    return (
        <>
            {/* Desktop nav */}
            <nav className="fixed top-[2.0vw] left-1/2 -translate-x-1/2 z-50 h-10 hidden md:flex items-center justify-between px-2 rounded-full bg-white/60 backdrop-blur-md shadow-[0_4px_24px_rgba(0,28,61,0.08)] border border-white/40 w-[53vw]">

                {/* Home dropdown */}
                <div
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <button className="flex items-center gap-1 text-[#001C3D] px-4 py-1 rounded-full text-[2.0vh] hover:bg-[#001C3D] hover:text-[#FFF8F0] transition-all duration-200">
                        Home
                        <svg className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className={`absolute top-full left-0 pt-1.5 transition-all duration-200 ${dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                        <div className="min-w-[170px] bg-[#001C3D]/90 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,28,61,0.18)] border border-white/10 overflow-hidden">
                            <Link href="/" className="block px-4 py-2.5 text-[#FFF8F0]/70 text-[2.0vh] hover:text-[#FFF8F0] hover:bg-white/10 transition-colors duration-150">Home</Link>
                            <Link href="/Committees" className="block px-4 py-2.5 text-[#FFF8F0]/70 text-[2.0vh] hover:text-[#FFF8F0] hover:bg-white/10 transition-colors duration-150">Committees</Link>
                            <Link href="/PreviousBoards" className="block px-4 py-2.5 text-[#FFF8F0]/70 text-[2.0vh] hover:text-[#FFF8F0] hover:bg-white/10 transition-colors duration-150">Previous Boards</Link>
                        </div>
                    </div>
                </div>

                <div className="h-4 w-px bg-[#001C3D]/15" />

                <Link href="https://shop.ucmsa.nl/" className="text-[#001C3D] px-4 py-1 rounded-full text-[2.1vh] hover:bg-[#001C3D] hover:text-[#FFF8F0] transition-all duration-200">Shop</Link>

                <div className="h-4 w-px bg-[#001C3D]/15" />

                <Link href="/Documents" className="text-[#001C3D] px-4 py-1 rounded-full text-[2.1vh] hover:bg-[#001C3D] hover:text-[#FFF8F0] transition-all duration-200">Documents</Link>

                <div className="h-4 w-px bg-[#001C3D]/15" />

                <Link href="/Faq" className="text-[#001C3D] px-4 py-1 rounded-full text-[2.1vh] hover:bg-[#001C3D] hover:text-[#FFF8F0] transition-all duration-200">FAQ</Link>

                <div className="h-4 w-px bg-[#001C3D]/15" />

                {/* Account dropdown */}
                <div
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setLoginDropdownOpen(true)}
                    onMouseLeave={() => setLoginDropdownOpen(false)}
                >
                    <button className="flex items-center gap-1 text-[#001C3D] px-4 py-1 rounded-full text-[2.0vh] hover:bg-[#001C3D] hover:text-[#FFF8F0] transition-all duration-200">
                        {user ? user.username : 'Account'}
                        <svg className={`w-3 h-3 transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className={`absolute top-full right-0 pt-1.5 transition-all duration-200 ${loginDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                        <div className="min-w-[140px] bg-[#001C3D]/90 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,28,61,0.18)] border border-white/10 overflow-hidden">
                            {user ? (
                                <>
                                    <Link href="/Account" className="block px-4 py-2.5 text-[#FFF8F0]/70 text-[2.0vh] hover:text-[#FFF8F0] hover:bg-white/10 transition-colors duration-150">Account</Link>
                                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2.5 text-[#FFF8F0]/70 text-[2.0vh] hover:text-[#FFF8F0] hover:bg-white/10 transition-colors duration-150">Log Out</button>
                                </>
                            ) : (
                                <>
                                    <Link href="/LogIn" className="block px-4 py-2.5 text-[#FFF8F0]/70 text-[2.0vh] hover:text-[#FFF8F0] hover:bg-white/10 transition-colors duration-150">Log In</Link>
                                    <Link href="/SignUp" className="block px-4 py-2.5 text-[#FFF8F0]/70 text-[2.0vh] hover:text-[#FFF8F0] hover:bg-white/10 transition-colors duration-150">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile nav */}
            <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw]">
                <div className="flex items-center justify-between px-5 h-11 rounded-full bg-white/70 backdrop-blur-md shadow-[0_4px_24px_rgba(0,28,61,0.10)] border border-white/40">
                    <span className="text-[#001C3D] font-medium text-sm tracking-tight">Menu</span>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        className="flex flex-col justify-center gap-[5px] w-6 h-6"
                    >
                        <span className={`block h-[1.5px] w-full bg-[#001C3D] rounded-full transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                        <span className={`block h-[1.5px] w-full bg-[#001C3D] rounded-full transition-all duration-200 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                        <span className={`block h-[1.5px] w-full bg-[#001C3D] rounded-full transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
                    </button>
                </div>

                <div className={`mt-2 rounded-2xl border border-white/40 bg-white/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,28,61,0.12)] overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col py-3">
                        <Link href="/" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-[#001C3D] text-sm hover:bg-[#001C3D]/5 transition-colors">Home</Link>
                        <Link href="/Committees" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-[#001C3D]/70 text-sm hover:bg-[#001C3D]/5 hover:text-[#001C3D] transition-colors">Committees</Link>
                        <Link href="/PreviousBoards" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-[#001C3D]/70 text-sm hover:bg-[#001C3D]/5 hover:text-[#001C3D] transition-colors">Previous Boards</Link>
                        <div className="mx-6 my-1 h-px bg-[#001C3D]/10" />
                        <Link href="https://shop.ucmsa.nl/" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-[#001C3D]/70 text-sm hover:bg-[#001C3D]/5 hover:text-[#001C3D] transition-colors">Shop</Link>
                        <Link href="/Documents" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-[#001C3D]/70 text-sm hover:bg-[#001C3D]/5 hover:text-[#001C3D] transition-colors">Documents</Link>
                        <Link href="/Faq" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-[#001C3D]/70 text-sm hover:bg-[#001C3D]/5 hover:text-[#001C3D] transition-colors">FAQ</Link>
                        <div className="mx-6 my-1 h-px bg-[#001C3D]/10" />
                        {user ? (
                            <>
                                <Link href="/Account" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-[#001C3D]/70 text-sm hover:bg-[#001C3D]/5 hover:text-[#001C3D] transition-colors">Account</Link>
                                <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="text-left px-6 py-3 text-[#001C3D]/70 text-sm hover:bg-[#001C3D]/5 hover:text-[#001C3D] transition-colors">Log Out</button>
                            </>
                        ) : (
                            <>
                                <Link href="/LogIn" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-[#001C3D]/70 text-sm hover:bg-[#001C3D]/5 hover:text-[#001C3D] transition-colors">Log In</Link>
                                <Link href="/SignUp" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-[#001C3D]/70 text-sm font-medium hover:bg-[#001C3D]/5 hover:text-[#001C3D] transition-colors">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
