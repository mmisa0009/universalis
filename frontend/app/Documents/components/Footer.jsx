import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#FFF8F0] text-[#001C3D] overflow-hidden relative">
            <div className="w-[70%] mx-auto border-t border-[#001C3D]/20 pt-10">
                <div className='grid grid-cols-1 md:grid-cols-2 w-full mb-0 gap-8 md:gap-32'>
                    <div className="pages text-center md:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-50">Pages</h3>
                        <ul className="list-none space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-[#001C3D] hover:opacity-70 transition-opacity">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm text-[#001C3D] hover:opacity-70 transition-opacity">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="contact text-center md:text-left">
                        <h3 className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-50">Contact Us</h3>
                        <div className="flex gap-2 items-center justify-center md:justify-start">
                            <Image src="/email.png" alt="email icon" width={16} height={16} className="w-4 h-4 opacity-70" />
                            <a className="text-sm hover:underline transition-opacity hover:opacity-70" href="mailto:ucmsa-secretary@maastrichtuniversity.nl">
                                ucmsa-secretary@maastrichtuniversity.nl
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
