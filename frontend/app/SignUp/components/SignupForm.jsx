'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from './InputField';

export default function SignupForm() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Sign up failed.');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-4">
        <p className="text-white font-semibold text-lg mb-2">Check your inbox!</p>
        <p className="text-white/80 text-sm mb-6">
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
        </p>
        <button
          onClick={() => router.push('/LogIn')}
          className="bg-[#001C3D] text-[#FFF8F0] px-6 py-2 rounded-lg text-sm hover:bg-[#FFF8F0] hover:text-[#001C3D]"
        >
          Go to Log In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputField
        label="Username"
        placeholder="Enter your username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      {error && <p className="text-yellow-300 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-[#001C3D] text-[#FFF8F0] rounded-lg py-2 text-sm hover:text-[#001C3D] hover:bg-[#FFF8F0] disabled:opacity-60"
      >
        {loading ? 'Creating account…' : 'Sign Up'}
      </button>
    </form>
  );
}