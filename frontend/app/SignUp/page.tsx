import SignupForm from './components/SignupForm';
import Footer from './components/Footer';

export default function LoginPage() {
    return (
        <div>
            <div className="bg-[url('/maastricht.png')] bg-cover bg-center h-[80vh] flex flex-col items-center justify-center">
            <img src="/universalis-logo.png" alt="logo-icon" className="w-[10vmin]" />
            <div className="login-container">
                <h3>Create An Account</h3>
                <SignupForm />
                <h6>Already have an account? <a href="#">Log In</a></h6>
                <Footer />
            </div>
            </div>

        </div>
    );
}
