import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Link from 'next/link';


export default function Account() {
    return (
        <div className="min-h-screen bg-[#fff8f1] text-[#1e1b17] font-sans flex flex-col selection:bg-[#fed65b]">
            <Navbar />
            
            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center p-8 md:p-16 w-full">
                <div className="max-w-2xl w-full mx-auto py-12 md:py-20">
                    
                    {/* Header Text */}
                    <div className="mb-12 text-center">
                        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#735c00] font-bold mb-4 block">
                            System Access Record
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl text-[#000105] tracking-tighter mb-2">
                            Account Settings
                        </h1>
                        <p className="font-sans text-sm text-[#44474e] opacity-70">
                            Manage your institutional identity and security credentials.
                        </p>
                    </div>
                    
                    {/* Settings Form Container */}
                    <div className="bg-[#f9f3eb] border border-[#c4c6cf]/20 p-8 md:p-12">
                        <form className="space-y-10">
                            <div className="space-y-8">
                                
                                {/* Username (Read-only representation) */}
                                <div className="space-y-1">
                                    <label className="font-sans text-xs uppercase tracking-widest text-[#44474e]">
                                        Username
                                    </label>
                                    <div className="w-full border-b border-[#c4c6cf] py-3 font-sans text-lg text-[#44474e] opacity-60 bg-transparent">
                                        j_arclight_archives
                                    </div>
                                    <p className="text-[10px] italic text-[#44474e]">
                                        Username is fixed to your archival identifier.
                                    </p>
                                </div>
                                
                                {/* Email (Read-only representation) */}
                                <div className="space-y-1">
                                    <label className="font-sans text-xs uppercase tracking-widest text-[#44474e]">
                                        Registered Email
                                    </label>
                                    <div className="w-full border-b border-[#c4c6cf] py-3 font-sans text-lg text-[#44474e] opacity-60 bg-transparent">
                                        j.arclight@ucmsa-universalis.edu
                                    </div>
                                </div>
                                
                                {/* Password Change Fields */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <label className="font-sans text-xs uppercase tracking-widest text-[#44474e]">
                                            Current Password
                                        </label>
                                        <input 
                                            className="w-full bg-transparent border-b-2 border-[#c4c6cf] focus:border-[#000105] focus:ring-0 outline-none py-3 font-sans text-lg text-[#000105] transition-all" 
                                            placeholder="••••••••" 
                                            type="password"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="font-sans text-xs uppercase tracking-widest text-[#44474e]">
                                            New Password
                                        </label>
                                        <input 
                                            className="w-full bg-transparent border-b-2 border-[#c4c6cf] focus:border-[#000105] focus:ring-0 outline-none py-3 font-sans text-lg text-[#000105] transition-all" 
                                            type="password"
                                        />
                                    </div>
                                </div>
                                
                            </div>
                            
                            {/* Submit Button */}
                            <div className="pt-4">
                                <button 
                                    className="w-full md:w-auto px-12 bg-[#001c3d] text-[#ffffff] py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#735c00] transition-colors" 
                                    type="submit"
                                >
                                    Update Access Password
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    {/* Help Link */}
                    <div className="mt-12 text-center">
                        <p className="font-sans text-xs text-[#44474e] opacity-60">
                            Lost access to your primary credentials?{' '}
                            <Link href="#" className="text-[#735c00] hover:underline underline-offset-4">
                                Contact the Registrar
                            </Link>
                        </p>
                    </div>
                    
                </div>
            </main>

            <Footer />
        </div>
    );
}