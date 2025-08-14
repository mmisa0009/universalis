import Image from 'next/image';
import Link from 'next/link';

export default function Section5() {
    return (
        <div className="w-full flex flex-col items-center relative mb-20 mt-8">
            <h2 className="text-[4.5vw] font-bold max-w-[45vw] absolute top-[1.8vh] left-[12%]">Committees</h2>
            <div className="z-20 absolute mt-[3.5vw] right-[8vw] bg-[rgba(255, 255, 255, 0.5)] bg-opacity-10 backdrop-blur-md  shadow-lg rounded-[25px] text-[#001C3D] py-[0.5vh] px-[2vw] max-w-[35vw]">
                <p className="text-[1.6vmax]">
                Check our <Link href="#" className="text-[#001C3D] underline">committee page</Link> to see all committee lists.
                </p>
            </div>
            <Image src="/committee-img.png" alt="committee" width={1000} height={1000} className="z-10 relative w-[90vw] h-auto mx-auto flex justify-center top-4" />
            <p className="text-[1.4vw] absolute bottom-0 right-[6vw] max-w-[35%] text-right">
                Our Association supports more than 25 committees that organize various activities around the University College Maastricht and create a sense of community at the College.
            </p>
        </div>
    );
}
