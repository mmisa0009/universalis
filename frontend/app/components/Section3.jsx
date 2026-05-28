const bgStyle = {
    backgroundImage: "url('/ucm-building.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const bgClass = "bg-scroll md:bg-fixed";

export function WhoWeAre() {
    return (
        <div className={`relative text-[#001c3d] h-full ${bgClass}`} style={bgStyle}>
            <div className="relative z-10 flex flex-col items-center justify-center gap-3 h-full text-center px-6 pt-20 pb-6">
                <h2 className="text-[6vmin] font-bold">Who Are We?</h2>
                <p className="text-base md:text-lg max-w-[1000px] px-4">
                    UCMSA Universalis is a multicultural and multidisciplinary student association directly affiliated with the University College Maastricht. Collectively, Universalis has approximately 750 members and aims to facilitate a colorful and vibrant university life for them.
                </p>
            </div>
        </div>
    );
}

export function HowWeWork() {
    return (
        <div className={`relative text-[#001c3d] h-full flex flex-col items-center justify-center ${bgClass}`} style={bgStyle}>
            <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6 py-8 w-full">
                <h2 className="text-2xl sm:text-3xl md:text-[5vmin] font-bold">How Does Our Association Work?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-4xl">
                    <div className="flex flex-col items-center gap-2">
                        <img src="/icon-eb.png" className="w-16 md:w-[55%] h-auto" alt="eb icon" />
                        <h3 className="text-sm md:text-base font-semibold">Executive Board</h3>
                        <p className="text-xs md:text-base">Handles the financial and logistical administration of the association.</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/icon-sb.png" className="w-16 md:w-[55%] h-auto" alt="sb icon" />
                        <h3 className="text-sm md:text-base font-semibold">Social Board</h3>
                        <p className="text-xs md:text-base">Organizes social events and facilitate all committee activities and make it as easy as possible for committees to function.</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/icon-ab.png" className="w-16 md:w-[55%] h-auto" alt="ab icon" />
                        <h3 className="text-sm md:text-base font-semibold">Academic Board</h3>
                        <p className="text-xs md:text-base">Hosts academic events and represents the voice of the students to the academic side of the College.</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/icon-ib.png" className="w-16 md:w-[55%] h-auto" alt="ib icon" />
                        <h3 className="text-sm md:text-base font-semibold">Independent Body</h3>
                        <p className="text-xs md:text-base">Keeps the Executive Board, Social Board and Academic Board in accordance with the association&apos;s Statutes and Policy Manual.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Section3() {
    return (
        <div className={`relative text-[#001c3d] ${bgClass}`} style={bgStyle}>
            <div className="relative z-10 flex flex-col items-center justify-center gap-3 h-screen text-center px-6 pt-20 pb-6">
                <h2 className="text-[6vmin] font-bold">Who Are We?</h2>
                <p className="text-base md:text-lg max-w-[1000px] px-4">
                    UCMSA Universalis is a multicultural and multidisciplinary student association directly affiliated with the University College Maastricht. Collectively, Universalis has approximately 750 members and aims to facilitate a colorful and vibrant university life for them.
                </p>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center px-6 py-8 w-full min-h-screen">
                <h2 className="text-2xl sm:text-3xl md:text-[5vmin] font-bold">How Does Our Association Work?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-4xl">
                    <div className="flex flex-col items-center gap-2">
                        <img src="/icon-eb.png" className="w-16 md:w-[55%] h-auto" alt="eb icon" />
                        <h3 className="text-sm md:text-base font-semibold">Executive Board</h3>
                        <p className="text-xs md:text-base">Handles the financial and logistical administration of the association.</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/icon-sb.png" className="w-16 md:w-[55%] h-auto" alt="sb icon" />
                        <h3 className="text-sm md:text-base font-semibold">Social Board</h3>
                        <p className="text-xs md:text-base">Organizes social events and facilitate all committee activities and make it as easy as possible for committees to function.</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/icon-ab.png" className="w-16 md:w-[55%] h-auto" alt="ab icon" />
                        <h3 className="text-sm md:text-base font-semibold">Academic Board</h3>
                        <p className="text-xs md:text-base">Hosts academic events and represents the voice of the students to the academic side of the College.</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/icon-ib.png" className="w-16 md:w-[55%] h-auto" alt="ib icon" />
                        <h3 className="text-sm md:text-base font-semibold">Independent Body</h3>
                        <p className="text-xs md:text-base">Keeps the Executive Board, Social Board and Academic Board in accordance with the association&apos;s Statutes and Policy Manual.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
