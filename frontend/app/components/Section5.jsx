import Image from 'next/image';

export default function Section5() {
    return (
        <section className="py-24 px-8 bg-[#eee7df] grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="relative min-h-[400px]">
                <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBOlduncerWUWKKnM4AfpyO_gdksU-1KNX8EGRd8nGVgSc1cQUvgvuIdnswU6UKj7QAg4kXgpz5eq6H9lJXFfgnNzQ96vY69c3-KnlKZIrnwqackFm0hrahBEPdtkD5p17heMvPH-Rg3nvWLkb3xD5AK8iXbrwJe3wrBvWXGWpqQU6hLIPynh0lR--Y3R4Eem1wMoQi_wYXkp6jym0xUbW2TWkipgkE8p8Yaab-AOAx9o0Wl21_oeAjcazrddfF55wxkGsZr8wPM4"
                alt="Students collaborating on creative projects"
                fill
                className="object-cover"
                unoptimized
                />
            </div>
            <div className="bg-[#001C3D] p-16 flex flex-col justify-center">
                <h2 className="font-['Newsreader'] text-5xl text-white font-bold mb-8 italic">
                Committees
                </h2>
                <p className="text-white/80 text-lg mb-12">
                From arts to finance, our 25+ committees are the lifeblood of our student body. They
                transform ideas into experiences.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-3 bg-white text-[#001C3D] rounded-full font-bold hover:scale-105 transition-transform">
                        Explore Committees
                    </button>
                    <button className="px-8 py-3 border border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                        Ask questions
                    </button>
                </div>
            </div>
        </section>
    );
}