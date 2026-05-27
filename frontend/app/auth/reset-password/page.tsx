'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function ResetContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const tokenHash = searchParams.get('token_hash');
        const type = searchParams.get('type');

        if (tokenHash && type === 'recovery') {
        supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'recovery' })
            .then(({ error }) => {
            if (error) setError('This reset link is invalid or has expired.');
            else setReady(true);
            });
        } else {
        setError('Invalid reset link.');
        }
    }, [searchParams]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (password !== confirm) {
        setError('Passwords do not match.');
        return;
        }
        if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
        }
        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
        setError(error.message);
        setLoading(false);
        } else {
        router.push('/LogIn');
        }
    }

    if (error) {
        return (
            <div className="text-center px-6">
                <h1 className="text-2xl font-bold text-[#FFF8F0] mb-4">Link Expired</h1>
                <p className="text-[#FFF8F0]/70 mb-8">{error}</p>
                <button onClick={() => router.push('/LogIn')} className="bg-[#FFF8F0] text-[#001C3D] px-6 py-3 rounded-full font-bold hover:opacity-90">
                Back to Log In
                </button>
            </div>
        );
    }

    if (!ready) {
        return <p className="text-[#FFF8F0]">Verifying reset link...</p>;
    }

    return (
        <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-[#FFF8F0] mb-8 text-center">Set New Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
            <label className="text-white text-sm mb-1 block">New Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-lg p-2 bg-white/80 text-black placeholder-black/30 focus:outline-none"
            />
            </div>
            <div>
            <label className="text-white text-sm mb-1 block">Confirm Password</label>
            <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-lg p-2 bg-white/80 text-black placeholder-black/30 focus:outline-none"
            />
            </div>
            {error && <p className="text-yellow-300 text-sm">{error}</p>}
            <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#FFF8F0] text-[#001C3D] rounded-lg py-2 text-sm font-bold hover:opacity-90 disabled:opacity-60"
            >
            {loading ? 'Updating...' : 'Update Password'}
            </button>
        </form>
        </div>
    );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-[#001C3D] flex items-center justify-center">
      <Suspense fallback={<p className="text-[#FFF8F0]">Loading...</p>}>
        <ResetContent />
      </Suspense>
    </main>
  );
}