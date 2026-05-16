import Image from 'next/image';
import Link from 'next/link';

export default function Section1() {
  return (
    <header className="relative h-full bg-[#001C3D] overflow-hidden flex flex-col">

      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src="/allMember.png"
          alt=""
          fill
          className="object-cover opacity-35"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001C3D] via-[#001C3D]/30 to-[#001C3D]/0" />
      </div>

      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#ffe088]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-8 md:px-14 pt-10 pb-10">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Image
            src="/universalis-logo.png"
            alt="Universalis logo"
            width={80}
            height={80}
            className="w-18 h-auto opacity-85"
          />
          
        </div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col justify-end pb-6">
          <p className="text-[#ffe088] uppercase tracking-[0.3em] text-[10px] font-bold mb-5">
            University College Maastricht Study Association
          </p>
          <h1
            className="font-bold text-white  leading-[0.88] mb-7"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)' }}
          >
            UCMSA<br />Universalis
          </h1>
          <p className="text-white/55 text-base md:text-lg max-w-lg leading-relaxed">
            Enjoy the social and academic activities supported by Universalis —
            a multicultural association with 750+ members.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between">
          <span className="text-white/20 uppercase tracking-widest text-[9px] hidden md:block">
            Est. 2018
          </span>
          <div className="flex items-center gap-2 text-white/30 text-xs ml-auto">
            <span>Scroll to explore</span>
            <svg className="w-3 h-3 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>

      </div>
    </header>
  );
}
