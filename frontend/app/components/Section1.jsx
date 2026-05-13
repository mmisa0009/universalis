import Image from 'next/image';
import Link from 'next/link';

export default function Section1() {
  return (
    <header className="relative md:min-h-screen grid grid-cols-12 gap-0 overflow-hidden pt-14 px-4 pb-6 md:pt-20 md:px-8 md:pb-12 bg-[#001C3D]">
      {/* Sidebar Spine */}
        <div className="hidden sm:flex col-span-1 flex-col justify-between items-center py-12">
            <h1
            className="w-fit h-fit font-bold tracking-tighter text-[#FFF8F1] opacity-90 select-none whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg) translateY(12%)', fontSize: 'clamp(2rem, 6vw, 5rem)', }}
            >
            UCMSA Universalis
            </h1>
        </div>

      {/* Main Content */}
      <div className="col-span-12 sm:col-span-11 flex flex-col gap-3">
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="allMember.png"
            alt="Universalis Member Photo"
            fill
            className="object-cover"
            unoptimized
          />

          {/* Floating Log In */}
          <div className="absolute top-3 right-8">
            <Link href="/LogIn">
                <button className="bg-white/60 backdrop-blur-md px-6 py-2.5 rounded-full text-[#001C3D] hover:bg-white transition-all shadow-lg text-sm">
                  Log In
                </button>
            </Link>
          </div>

        </div>

        {/* Hero Text — always below the photo */}
        <div className="bg-[#001C3D]/90 backdrop-blur-md p-4 md:p-8 rounded-xl w-full text-right">
          <p className="font-['Newsreader'] text-xl md:text-[4.0vh] text-white italic mb-1 md:mb-2 leading-tight">
            Enjoy the social and academic activities supported by Universalis.
          </p>
          <p className="text-white/80 uppercase tracking-widest text-[9px] md:text-xs">
            University College Maastricht Study Association
          </p>
        </div>
      </div>
    </header>
  );
}