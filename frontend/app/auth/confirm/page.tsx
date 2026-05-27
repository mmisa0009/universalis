export default function ConfirmPage() {
  return (
    <main className="min-h-screen bg-[#001C3D] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#FFF8F0] mb-4">Email Confirmed!</h1>
        <p className="text-[#FFF8F0]/70 mb-8">Your account is now active. You can log in.</p>
        <a href="/LogIn" className="bg-[#FFF8F0] text-[#001C3D] px-6 py-3 rounded-full font-bold">
          Log In
        </a>
      </div>
    </main>
  );
}