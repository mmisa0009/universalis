'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Mock user data — replace with real session/auth fetch
const MOCK_USER = {
    username: 'janedoe_001',
    email: 'j.doe@student.maastrichtuniversity.nl',
};

type PasswordField = 'current' | 'new' | 'confirm';

interface PasswordStrength {
    score: number;
    label: string;
    color: string;
    checks: { label: string; met: boolean }[];
}

function getPasswordStrength(password: string): PasswordStrength {
    const checks = [
        { label: 'At least 8 characters', met: password.length >= 8 },
        { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
        { label: 'Lowercase letter', met: /[a-z]/.test(password) },
        { label: 'Number', met: /[0-9]/.test(password) },
        { label: 'Special character', met: /[^A-Za-z0-9]/.test(password) },
    ];
    const score = checks.filter((c) => c.met).length;

    if (score <= 1) return { score, label: 'Weak', color: 'bg-red-400', checks };
    if (score <= 2) return { score, label: 'Fair', color: 'bg-orange-400', checks };
    if (score <= 3) return { score, label: 'Good', color: 'bg-yellow-500', checks };
    if (score === 4) return { score, label: 'Strong', color: 'bg-blue-500', checks };
    return { score, label: 'Very Strong', color: 'bg-green-500', checks };
}

function EyeIcon({ open }: { open: boolean }) {
    return open ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
    );
}

export default function Account() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState<Record<PasswordField, boolean>>({
        current: false,
        new: false,
        confirm: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<PasswordField | 'match', string>>>({});

    const strength = newPassword ? getPasswordStrength(newPassword) : null;

    function toggleShow(field: PasswordField) {
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));
    }

    function validate(): boolean {
        const errors: Partial<Record<PasswordField | 'match', string>> = {};
        if (!currentPassword) errors.current = 'Current password is required.';
        if (!newPassword) {
            errors.new = 'New password is required.';
        } else if (newPassword.length < 8) {
            errors.new = 'Password must be at least 8 characters.';
        } else if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
            errors.new = 'Password must include uppercase, lowercase, and a number.';
        }
        if (!confirmPassword) {
            errors.confirm = 'Please confirm your new password.';
        } else if (newPassword && confirmPassword !== newPassword) {
            errors.match = 'Passwords do not match.';
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus(null);
        if (!validate()) return;

        setIsLoading(true);
        try {
            // TODO: replace with real API call, e.g.:
            // await fetch('/api/account/change-password', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ currentPassword, newPassword }),
            // });
            await new Promise((r) => setTimeout(r, 800)); // simulated network delay

            setStatus({ type: 'success', message: 'Password updated successfully.' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setFieldErrors({});
        } catch {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#fff8f1] text-[#1e1b17] font-sans flex flex-col selection:bg-[#fed65b]">
            <Navbar />

            <main className="flex-grow flex items-start md:items-center justify-center px-4 py-0 md:p-16 w-full">
                <div className="max-w-2xl w-full mx-auto pt-16 pb-2 md:py-28">

                    {/* Header */}
                    <div className="mb-3 md:mb-12 text-center">
                        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#735c00] font-bold mb-1 md:mb-4 block">
                            My Account
                        </span>
                        <h1 className="font-serif text-3xl md:text-5xl text-[#000105] tracking-tighter mb-2">
                            Account Settings
                        </h1>
                        <p className="hidden sm:block font-sans text-sm text-[#44474e] opacity-70">
                            Review your information and manage your access credentials.
                        </p>
                    </div>

                    {/* Profile Info */}
                    <div className="bg-[#f9f3eb] border border-[#c4c6cf]/20 p-4 md:p-10 mb-3 md:mb-6">
                        <h2 className="font-sans text-xs uppercase tracking-[0.25em] text-[#735c00] font-bold mb-3 md:mb-6">
                            Profile
                        </h2>
                        <div className="space-y-2 md:space-y-6">
                            <div className="space-y-1">
                                <label className="font-sans text-xs uppercase tracking-widest text-[#44474e]">
                                    Username
                                </label>
                                <div className="w-full border-b border-[#c4c6cf] py-1.5 md:py-3 font-sans text-base md:text-lg text-[#44474e]/60 bg-transparent select-all">
                                    {MOCK_USER.username}
                                </div>
                                <p className="hidden sm:block text-[10px] italic text-[#44474e]/60">
                                    Username is tied to your archival identifier and cannot be changed.
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="font-sans text-xs uppercase tracking-widest text-[#44474e]">
                                    Registered Email
                                </label>
                                <div className="w-full border-b border-[#c4c6cf] py-1.5 md:py-3 font-sans text-base md:text-lg text-[#44474e]/60 bg-transparent select-all">
                                    {MOCK_USER.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="bg-[#f9f3eb] border border-[#c4c6cf]/20 p-4 md:p-10">
                        <h2 className="font-sans text-xs uppercase tracking-[0.25em] text-[#735c00] font-bold mb-3 md:mb-6">
                            Change Password
                        </h2>

                        {status && (
                            <div
                                role="alert"
                                className={`mb-6 px-4 py-3 text-sm font-sans border-l-2 ${
                                    status.type === 'success'
                                        ? 'border-green-600 bg-green-50 text-green-800'
                                        : 'border-red-500 bg-red-50 text-red-800'
                                }`}
                            >
                                {status.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="space-y-3 md:space-y-8">

                            {/* Current Password */}
                            <div className="space-y-1">
                                <label htmlFor="current-password" className="font-sans text-xs uppercase tracking-widest text-[#44474e]">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="current-password"
                                        type={show.current ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        value={currentPassword}
                                        onChange={(e) => {
                                            setCurrentPassword(e.target.value);
                                            if (fieldErrors.current) setFieldErrors((p) => ({ ...p, current: undefined }));
                                        }}
                                        className={`w-full bg-transparent border-b-2 py-2 md:py-3 pr-10 font-sans text-base md:text-lg text-[#000105] outline-none transition-colors ${
                                            fieldErrors.current ? 'border-red-400' : 'border-[#c4c6cf] focus:border-[#000105]'
                                        }`}
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        aria-label={show.current ? 'Hide password' : 'Show password'}
                                        onClick={() => toggleShow('current')}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#44474e]/50 hover:text-[#44474e] transition-colors"
                                        tabIndex={-1}
                                    >
                                        <EyeIcon open={show.current} />
                                    </button>
                                </div>
                                {fieldErrors.current && (
                                    <p role="alert" className="text-[11px] text-red-500 mt-1">{fieldErrors.current}</p>
                                )}
                            </div>

                            {/* New Password */}
                            <div className="space-y-1">
                                <label htmlFor="new-password" className="font-sans text-xs uppercase tracking-widest text-[#44474e]">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="new-password"
                                        type={show.new ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        value={newPassword}
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                            if (fieldErrors.new) setFieldErrors((p) => ({ ...p, new: undefined }));
                                            if (fieldErrors.match) setFieldErrors((p) => ({ ...p, match: undefined }));
                                        }}
                                        className={`w-full bg-transparent border-b-2 py-2 md:py-3 pr-10 font-sans text-base md:text-lg text-[#000105] outline-none transition-colors ${
                                            fieldErrors.new ? 'border-red-400' : 'border-[#c4c6cf] focus:border-[#000105]'
                                        }`}
                                        placeholder="Min. 8 characters"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        aria-label={show.new ? 'Hide password' : 'Show password'}
                                        onClick={() => toggleShow('new')}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#44474e]/50 hover:text-[#44474e] transition-colors"
                                        tabIndex={-1}
                                    >
                                        <EyeIcon open={show.new} />
                                    </button>
                                </div>
                                {fieldErrors.new && (
                                    <p role="alert" className="text-[11px] text-red-500 mt-1">{fieldErrors.new}</p>
                                )}

                                {/* Strength meter */}
                                {strength && (
                                    <div className="mt-3 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1 bg-[#c4c6cf]/30 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                                                    style={{ width: `${(strength.score / 5) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-sans uppercase tracking-widest text-[#44474e]/70 w-20 text-right">
                                                {strength.label}
                                            </span>
                                        </div>
                                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                                            {strength.checks.map((check) => (
                                                <li key={check.label} className={`flex items-center gap-1.5 text-[10px] font-sans ${check.met ? 'text-green-700' : 'text-[#44474e]/50'}`}>
                                                    <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${check.met ? 'bg-green-500' : 'bg-[#c4c6cf]'}`} />
                                                    {check.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1">
                                <label htmlFor="confirm-password" className="font-sans text-xs uppercase tracking-widest text-[#44474e]">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirm-password"
                                        type={show.confirm ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            if (fieldErrors.confirm || fieldErrors.match)
                                                setFieldErrors((p) => ({ ...p, confirm: undefined, match: undefined }));
                                        }}
                                        className={`w-full bg-transparent border-b-2 py-2 md:py-3 pr-10 font-sans text-base md:text-lg text-[#000105] outline-none transition-colors ${
                                            fieldErrors.confirm || fieldErrors.match ? 'border-red-400' : 'border-[#c4c6cf] focus:border-[#000105]'
                                        }`}
                                        placeholder="Re-enter new password"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        aria-label={show.confirm ? 'Hide password' : 'Show password'}
                                        onClick={() => toggleShow('confirm')}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#44474e]/50 hover:text-[#44474e] transition-colors"
                                        tabIndex={-1}
                                    >
                                        <EyeIcon open={show.confirm} />
                                    </button>
                                </div>
                                {(fieldErrors.confirm || fieldErrors.match) && (
                                    <p role="alert" className="text-[11px] text-red-500 mt-1">
                                        {fieldErrors.confirm ?? fieldErrors.match}
                                    </p>
                                )}
                                {!fieldErrors.confirm && !fieldErrors.match && confirmPassword && newPassword && confirmPassword === newPassword && (
                                    <p className="text-[11px] text-green-600 mt-1">Passwords match.</p>
                                )}
                            </div>

                            {/* Submit */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full md:w-auto px-12 bg-[#001c3d] text-[#ffffff] py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#735c00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>


                </div>
            </main>

            <Footer />
        </div>
    );
}
