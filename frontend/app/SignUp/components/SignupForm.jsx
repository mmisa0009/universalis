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

      // Redirect to login after successful signup
      router.push('/LogIn');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
      {error && <p className="text-[#FFF8F0] text-sm">{error}</p>}
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
