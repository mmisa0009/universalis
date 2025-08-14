import Image from 'next/image';
import Link from 'next/link';

export default function Section1() {
    return (
        <div className='flex w-[96vw] max-h-[90vw] p-[2vw] gap-[2vw] relative'>
            <div className='flex flex-col items-center justify-between gap-[15vw] w-[20%] relative '>
                <div className='origin-bottom-right -rotate-90 translate-y-[-100%] mr-[-3.5vw] flex '>
                    <h1 className='text-[6.3vw] leading-[9vw] font-bold whitespace-nowrap text-right p-0 pb-[8vw] w-fit h-fit'>
                        UCMSA <br />Universalis
                    </h1>
                </div>

                <div className="flex flex-col items-center bottom-[21%] gap-[1vw] relative">
                    <div className="flex flex-row m-0 p-0 gap-2">
                        <Link href="https://nl.linkedin.com/company/universalis">
                        <Image src="/linkedin.png" alt="linkedin logo" width={100} height={100} className="w-[1.5vw]" />
                        </Link>
                        <Link href="https://www.instagram.com/ucmsa_universalis/?hl=en">
                        <Image src="/instagram.png" alt="instagram logo" width={100} height={100} className="w-[1.5vw]" />
                        </Link>
                    </div>
                    <p className="text-[1vmax] text-center">Follow Us On Media</p>
                </div>

                


            </div>

            <div className="relative inline-block w-[80%]">
                    <Image src="/allMember.png" alt="all members" width={2000} height={2000} className="block w-full h-auto" />
                    <button className="absolute top-0 right-[2vw] max-w-[12vw] bg-transparent border border-[#FFF8F0] rounded-[50px] text-[#FFF8F0] py-[0.8vw] px-[3.5vw] cursor-pointer text-[1.2vmax] hover:bg-[#FFF8F0] hover:text-[#001C3D]">
                    Log In
                    </button>
                    <h3 className="text-[1.8vw] mb-[1vw] relative left-[-20vw] bottom-[3vw]">
                    University College Maastricht Study Association
                    </h3>
                </div>

            
        </div>
    );
}