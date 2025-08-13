export default function Home() {
    return (
        <div className="landing-section">
            <main className="min-h-screen flex flex col items-center justify-center">
                {/*content wrapper*/} 
                <div className="w-full max-w-6xl px-4 md:px-8 py-10 flex flex-col md:flex-row items-center md:items-start gap-10">
                    {/*left side*/}
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <div className="flex flex-col items-center md: items-start gap-6">
                            <span className="text-4xl tracking-tight rotate-270 [writing-mode:vertical-rl">
                                UCMSA
                            </span>
                            <span className="text-4xl tracking-tight rotate-270 [writing-mode:vertical-rl text-align: right">
                                Universalis
                            </span>
                        </div>

                        {/*social media*/}
                        <div className="flex flex-col items-center md:items-start gap-2 mt-4">
                            <div className="flex gap-3 text-lg">
                                <i className="fab fa-linkedin"></i>
                                <i className="fab fa-instagram"></i>
                            </div>
                            <span className="text-sm">Follow Us On Media</span>
                        </div>

                        {/*subtitle*/}
                        <p className="text-sm mt-4 max-w-[10rem] text-center md:text-left">
                            University Collete Maastricht Study Association
                        </p>
                    </div>

                    {/*main image*/}
                    <div>
                        <img src="/allMember.png" alt="member-image" />
                    </div>

                    {/*nav bar*/}
                    <div className="flex gap-6 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-sm">
                        <div className="relative group">
                        <button className="hover:underline">Home ▾</button>
                        <div className="absolute hidden group-hover:block mt-2 bg-white/30 backdrop-blur-md rounded-lg p-2 space-y-1">
                            <a href="#" className="block hover:underline">Home</a>
                            <a href="#" className="block hover:underline">Committees</a>
                            <a href="#" className="block hover:underline">Previous Boards</a>
                        </div>
                        </div>
                        <a href="#" className="hover:underline">Shop</a>
                        <a href="#" className="hover:underline">Documents</a>
                        <a href="#" className="hover:underline">FAQ</a>
                    </div>

                    {/*login button*/}
                    <button className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-[#062B52] transition">
                        Log In
                    </button>
                </div>

                {/* Tagline */}
                <p className="text-center text-lg mt-8 px-4 max-w-3xl text-align:left">
                    Enjoy the social and academic activities supported by Universalis.
                </p>
            </main>
        </div>
    );
}