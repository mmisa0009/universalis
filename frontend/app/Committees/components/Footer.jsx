import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#001C3D] text-[#FFF8F0] overflow-hidden relative">
            <div className="w-[70%] mx-auto border-t border-[#001C3D]/20 pt-10">
                <div className='grid grid-cols-1 md:grid-cols-3 w-full mb-0 gap-8'>
                    <div className="pages text-center md:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-50">Pages</h3>
                        <ul className="list-none space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-[#FFF8F0] hover:opacity-70 transition-opacity">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm text-[#FFF8F0] hover:opacity-70 transition-opacity">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="account text-center md:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-50">Account</h3>
                        <ul className="list-none space-y-2">
                            <li>
                                <Link href="/LogIn" className="text-sm text-[#FFF8F0] hover:opacity-70 transition-opacity">
                                    Log In
                                </Link>
                            </li>
                            <li>
                                <Link href="/SignUp" className="text-sm text-[#FFF8F0] hover:opacity-70 transition-opacity">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="contact text-center md:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-50">Contact Us</h3>
                        <div className="flex gap-3 items-center justify-center md:justify-start">
                            <a href="mailto:ucmsa-secretary@maastrichtuniversity.nl" aria-label="Email us" className="opacity-70 hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                                    <path d="M2 7l10 7 10-7"/>
                                </svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="opacity-70 hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <circle cx="12" cy="12" r="4"/>
                                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                                </svg>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="opacity-70 hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                    <rect x="2" y="9" width="4" height="12"/>
                                    <circle cx="4" cy="4" r="2"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden mt-0">
                <h1 className="text-[23vw] font-bold flex justify-center relative bottom-0 mb-[-13%] mt-[-6%]">
                Universalis
                </h1>
            </div>
        </footer>
  );
}
