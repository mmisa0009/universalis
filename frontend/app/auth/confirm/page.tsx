'use client';
import { useRouter } from 'next/navigation';

export default function ConfirmPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-[#001C3D] flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-3xl font-bold text-[#FFF8F0] mb-4">Email Confirmed!</h1>
        <p className="text-[#FFF8F0]/70 mb-8">Your account is active. You can now log in.</p>
        <button
          onClick={() => router.push('/LogIn')}
          className="bg-[#FFF8F0] text-[#001C3D] px-6 py-3 rounded-full font-bold hover:opacity-90"
        >
          Log In
        </button>
      </div>
    </main>
  );
}