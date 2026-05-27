'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as 'signup' | null;

  if (!tokenHash || !type) {
    // No token — check if already logged in
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setStatus('success');
      else setStatus('error');
    });
    return;
  }

    supabase.auth.verifyOtp({ token_hash: tokenHash, type })
        .then(({ error }) => {
        if (error) {
            // Token may already be used — check if confirmed anyway
            supabase.auth.getSession().then(({ data }) => {
                if (data.session) setStatus('success');
                else setStatus('error');
            });
        } else {
            setStatus('success');
        }
        });
    }, [searchParams]);

  if (status === 'loading') {
    return <p className="text-[#FFF8F0]">Verifying your email...</p>;
  }

  if (status === 'error') {
    return (
      <div className="text-center px-6">
        <h1 className="text-3xl font-bold text-[#FFF8F0] mb-4">Link Expired</h1>
        <p className="text-[#FFF8F0]/70 mb-8">This confirmation link is invalid or has expired. Please sign up again.</p>
        <button onClick={() => router.push('/SignUp')} className="bg-[#FFF8F0] text-[#001C3D] px-6 py-3 rounded-full font-bold hover:opacity-90">
          Sign Up Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center px-6">
      <h1 className="text-3xl font-bold text-[#FFF8F0] mb-4">Email Confirmed!</h1>
      <p className="text-[#FFF8F0]/70 mb-8">Your account is active. You can now log in.</p>
      <button onClick={() => router.push('/LogIn')} className="bg-[#FFF8F0] text-[#001C3D] px-6 py-3 rounded-full font-bold hover:opacity-90">
        Log In
      </button>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <main className="min-h-screen bg-[#001C3D] flex items-center justify-center">
      <Suspense fallback={<p className="text-[#FFF8F0]">Loading...</p>}>
        <ConfirmContent />
      </Suspense>
    </main>
  );
}