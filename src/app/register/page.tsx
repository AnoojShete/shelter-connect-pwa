'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { UserPlus, Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';
import Link from 'next/link';

/**
 * Password strength checker — Practical 9
 * Checks: length ≥ 8, uppercase, lowercase, digit, special character
 */
function getPasswordStrength(password: string) {
    const checks = [
        { label: 'At least 8 characters', met: password.length >= 8 },
        { label: 'Uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
        { label: 'Lowercase letter (a-z)', met: /[a-z]/.test(password) },
        { label: 'Number (0-9)', met: /[0-9]/.test(password) },
        { label: 'Special character (!@#$%^&*)', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];
    const score = checks.filter((c) => c.met).length;
    const level =
        score <= 1 ? 'Weak' : score <= 3 ? 'Fair' : score <= 4 ? 'Good' : 'Strong';
    const color =
        score <= 1 ? 'bg-red-500' : score <= 3 ? 'bg-yellow-500' : score <= 4 ? 'bg-blue-500' : 'bg-green-500';

    return { checks, score, level, color };
}

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const strength = useMemo(() => getPasswordStrength(password), [password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (strength.score < 5) {
            setError('Please meet all password requirements');
            return;
        }

        setLoading(true);

        try {
            const result = await register(email, password);
            if (result.success) {
                router.push('/');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch {
            setError('Network error. Is the API server running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-61px-56px)] bg-gray-50/60">
            {/* Back button */}
            <div className="px-4 pt-4">
                <button
                    onClick={() => router.back()}
                    className="h-11 w-11 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-5 w-5 text-gray-700" />
                </button>
            </div>

            {/* Form */}
            <div className="flex-1 flex flex-col justify-center px-6 pb-12">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#0F52BA]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="h-8 w-8 text-[#0F52BA]" />
                    </div>
                    <h1 className="text-gray-900 text-xl" style={{ fontWeight: 700 }}>
                        Create Account
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Sign up for ShelterConnect</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3" role="alert">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="register-email" className="text-sm text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>
                            Email
                        </label>
                        <input
                            id="register-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]/40 transition-all duration-200 min-h-[48px]"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="register-password" className="text-sm text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="register-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]/40 transition-all duration-200 min-h-[48px]"
                                placeholder="Create a strong password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {password && (
                            <div className="mt-3 space-y-2">
                                {/* Strength Bar */}
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                                            style={{ width: `${(strength.score / 5) * 100}%` }}
                                        />
                                    </div>
                                    <span className={`text-xs ${
                                        strength.score <= 1 ? 'text-red-500' :
                                        strength.score <= 3 ? 'text-yellow-600' :
                                        strength.score <= 4 ? 'text-blue-600' : 'text-green-600'
                                    }`} style={{ fontWeight: 500 }}>
                                        {strength.level}
                                    </span>
                                </div>

                                {/* Requirement Checklist */}
                                <div className="space-y-1">
                                    {strength.checks.map((check) => (
                                        <div key={check.label} className="flex items-center gap-2">
                                            {check.met ? (
                                                <Check className="h-3.5 w-3.5 text-green-500" />
                                            ) : (
                                                <X className="h-3.5 w-3.5 text-gray-300" />
                                            )}
                                            <span className={`text-xs ${check.met ? 'text-green-600' : 'text-gray-400'}`}>
                                                {check.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="register-confirm" className="text-sm text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>
                            Confirm Password
                        </label>
                        <input
                            id="register-confirm"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                            className={`w-full px-4 py-3 bg-white border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]/40 transition-all duration-200 min-h-[48px] ${
                                confirmPassword && confirmPassword !== password
                                    ? 'border-red-300'
                                    : confirmPassword && confirmPassword === password
                                    ? 'border-green-300'
                                    : 'border-gray-200'
                            }`}
                            placeholder="Re-enter password"
                        />
                        {confirmPassword && confirmPassword !== password && (
                            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || strength.score < 5}
                        className="w-full bg-[#0F52BA] hover:bg-[#0F52BA]/90 disabled:opacity-50 text-white rounded-xl py-3.5 min-h-[52px] flex items-center justify-center gap-2 transition-colors"
                        style={{ fontWeight: 600 }}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#0F52BA]" style={{ fontWeight: 500 }}>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
