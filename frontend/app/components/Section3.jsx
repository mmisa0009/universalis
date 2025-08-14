export default function Section3() {
    return (
        <div className="section3-bg text-[#001c3d] h-auto">
            <div className="flex flex-col items-center justify-center gap-2 h-screen opacity-100 text-center transform translate-y-0 transition-opacity duration-800 ease-in-out transform-gpu pb-4">
                <h2 className="text-[6vmin] font-bold">Who Are We?</h2>
                <p className="text-lg max-w-[1000px] p-4">
                    UCMSA Universalis is a multicultural and multidisciplinary student association directly affiliated with the University College Maastricht. Collectively, Universalis has approximately 750 members and aims to facilitate a colorful and vibrant university life for them.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 h-screen opacity-100 text-center transform translate-y-0 transition-opacity duration-800 ease-in-out transform-gpu pb-[50vh]">
                <h2 className="text-[6vmin] font-bold">How Does Our Association Work?</h2>
                <div className="flex gap-3 px-2">
                    <div className="flex flex-col items-center p-1 gap-1">
                        <img src="/icon-eb.png" className="w-[60%] h-auto" alt="eb icon" />
                        <h3 className="text-[2.8vmin]">Executive Board</h3>
                        <p className="text-[2vmin] max-w-[20vw]">Handles the financial and logistical administration of the association.</p>
                    </div>
                    <div className="flex flex-col items-center p-1 gap-1">
                        <img src="/icon-sb.png" className="w-[60%] h-auto" alt="eb icon" />
                        <h3 className="text-[2.8vmin]">Social Board</h3>
                        <p className="text-[2vmin] max-w-[20vw]">Organizes social events and facilitate all committee activities and make it as easy as possible for committees to function.</p>
                    </div>
                    <div className="flex flex-col items-center p-1 gap-1">
                        <img src="/icon-ab.png" className="w-[60%] h-auto" alt="eb icon" />
                        <h3 className="text-[2.8vmin]">Academic Board</h3>
                        <p className="text-[2vmin] max-w-[20vw]">Hosts academic events  and represents the voice of the students to the academic side of the College.</p>
                    </div>
                    <div className="flex flex-col items-center p-1 gap-1">
                        <img src="/icon-ib.png" className="w-[60%] h-auto" alt="eb icon" />
                        <h3 className="text-[2.8vmin] ">Independent Body</h3>
                        <p className="text-[2vmin] max-w-[20vw]">Keeps the Executive Board, Social Board and Academic Board in accordance with the association’s Statutes and Policy Manual.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}