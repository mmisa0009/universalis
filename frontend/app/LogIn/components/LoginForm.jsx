'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import InputField from './InputField';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      const token = data.session.access_token;
      const meRes = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const meData = await meRes.json();

      login(token, meData.user);
      router.back();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleForgot(e) {
    e.preventDefault();
    setForgotLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      setForgotSent(true);
    } finally {
      setForgotLoading(false);
    }
  }

  if (showForgot) {
    return (
      <div className="flex flex-col gap-4">
        {forgotSent ? (
          <div className="text-center py-2">
            <p className="text-white font-semibold mb-2">Check your inbox!</p>
            <p className="text-white/80 text-sm mb-4">If that email exists, we sent a password reset link.</p>
            <button onClick={() => { setShowForgot(false); setForgotSent(false); }} className="text-white/70 text-sm underline">
              Back to Log In
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgot} className="flex flex-col gap-4">
            <p className="text-white text-sm">Enter your email and we'll send you a reset link.</p>
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              id="forgot-email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              disabled={forgotLoading}
            />
            <button
              type="submit"
              disabled={forgotLoading}
              className="bg-[#001C3D] text-[#FFF8F0] rounded-lg py-2 text-sm hover:text-[#001C3D] hover:bg-[#FFF8F0] disabled:opacity-60"
            >
              {forgotLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <button type="button" onClick={() => setShowForgot(false)} className="text-white/70 text-sm underline">
              Back to Log In
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        id="email"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
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
        {loading ? 'Logging in…' : 'Log In'}
      </button>
      <button
        type="button"
        onClick={() => setShowForgot(true)}
        className="text-white/70 text-sm underline text-center"
      >
        Forgot password?
      </button>
    </form>
  );
}