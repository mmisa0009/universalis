'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import InputField from './InputField';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      const token = data.session.access_token;

      // Fetch user profile (username + role)
      const meRes = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const meData = await meRes.json();

      login(token, meData.user);
      router.push('/Documents');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      {error && <p className="text-red-300 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-[#001C3D] text-[#FFF8F0] rounded-lg py-2 text-sm hover:text-[#001C3D] hover:bg-[#FFF8F0] disabled:opacity-60"
      >
        {loading ? 'Logging in…' : 'Log In'}
      </button>
    </form>
  );
}
