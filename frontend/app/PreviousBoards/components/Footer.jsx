import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#FFF8F0] text-[#001C3D] overflow-hidden relative">
            <div className="flex justify-center w-[75%] mx-auto items-center">
                <div className='flex items-baseline justify-between w-full pt-10 mb-0'>
                    <div className="contact">
                        <h3 className="text-[2vmin]">Contact Us</h3>
                        <div className="pt-[0.5vw] flex gap-2">
                            <Image src="/email.png" alt="email icon" width={25} height={25} className="w-[1.6vw]" />
                            <a className="underline text-[1.8vmin]" href="mailto:ucmsa-secretary@maastrichtuniversity.nl">
                            ucmsa-secretary@maastrichtuniversity.nl
                            </a>
                        </div>
                    </div>
                    <div className="pages">
                        <ul className="list-none mx-auto xl:mx-0">
                            <li className="pb-[1vw]">
                                <Link href="/" className="no-underline text-[2vmin] text-[#001C3D]">
                                    Home
                                </Link>
                            </li>
                            <li className="pb-[1vw]">
                                <Link href="#" className="no-underline text-[2vmin] text-[#001C3D]">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
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
