import SignupForm from './components/LoginForm';
import Footer from './components/Footer';
import Image from 'next/image';

export default function LoginPage() {
    return (
        <main className='min-h-screen'>
            <div>
                <div className="bg-[url('/maastricht.png')] bg-cover bg-center h-[80vh] flex flex-col items-center justify-center">

                    {/* Layout wrapper */}
                    <Image src="/universalis-logo.png" alt="logo-icon" width={150} height={150} className="w-[10vmin] h-auto absolute top-4 left-4" />

                    {/* (signup form area) */}
                    <div className="w-full flex items-center justify-center xl:justify-end xl:px-20">
                        <div className='w-[70%] max-w-md lg:w-[50%] lg:max-w-none bg-white/30 m-2 p-8 rounded-lg xl:px-12 shadow-[12px_12px_30px_rgba(0,0,0,0.35)]'>
                        <h3 className='text-white text-lg font-semibold text-center mb-4 lg:text-right'>
                            Create An Account
                        </h3>
                        <SignupForm />
                        <div>
                            <h6 className='text-white text-sm  text-center mt-4'>
                                Already have an account?
                            <a href="#" className=''>Log In</a></h6>
                        </div>
                        </div>
                        
                    </div>
                
                </div>
            </div>
            <Footer />
        </main>
    );
}
