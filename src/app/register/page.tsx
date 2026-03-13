'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/auth';
import { UserPlus, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const result = await register(email, password);
            if (result.success) {
                router.push('/login');
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
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="text-sm text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]/40 transition-all duration-200 min-h-[48px]"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]/40 transition-all duration-200 min-h-[48px]"
                                placeholder="Minimum 6 characters"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]/40 transition-all duration-200 min-h-[48px]"
                            placeholder="Re-enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
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
