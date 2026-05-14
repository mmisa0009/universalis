import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function CommitteesPage() {
    return (
        <main className='min-h-screen'>
                <div className="bg-[url('/maastricht.png')] bg-cover bg-center h-[80vh] flex flex-col items-center justify-center">
                    <Navbar />
                    <div className='flex items-center text-center justify-center backdrop-blur-sm text-[8vmin] w-[80%] h-[65%] lg:max-w-none bg-white/10 p-8 rounded-lg xl:px-20 shadow-[12px_12px_30px_rgba(0,0,0,0.35)]'>Committees</div>
                </div>
                
                <div className="max-w-3xl mx-auto p-6">
                    
                </div>
                <Footer />
        </main>
    );
}