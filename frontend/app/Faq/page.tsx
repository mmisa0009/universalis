import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function FaqPage() {
    return (
        <main className='min-h-screen'>
            <div className="bg-[url('/maastricht.png')] bg-cover bg-center h-[80vh] flex flex-col items-center justify-center">
                <Navbar />
            </div>
        </main>
    );
}
