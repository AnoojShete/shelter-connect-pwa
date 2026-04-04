'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { LogIn, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                router.push('/');
            } else {
                setError(result.message || 'Login failed');
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
                        <LogIn className="h-8 w-8 text-[#0F52BA]" />
                    </div>
                    <h1 className="text-gray-900 text-xl" style={{ fontWeight: 700 }}>
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3" role="alert">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="login-email" className="text-sm text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>
                            Email
                        </label>
                        <input
                            id="login-email"
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
                        <label htmlFor="login-password" className="text-sm text-gray-700 mb-1.5 block" style={{ fontWeight: 500 }}>
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]/40 transition-all duration-200 min-h-[48px]"
                                placeholder="Your password"
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
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0F52BA] hover:bg-[#0F52BA]/90 disabled:opacity-50 text-white rounded-xl py-3.5 min-h-[52px] flex items-center justify-center gap-2 transition-colors"
                        style={{ fontWeight: 600 }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-[#0F52BA]" style={{ fontWeight: 500 }}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
