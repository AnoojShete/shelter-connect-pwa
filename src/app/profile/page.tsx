'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { User, Shield, Clock, LogOut, ArrowLeft, Mail, Key } from 'lucide-react';

/**
 * Profile Page — Practical 9
 * Protected page showing user profile info.
 * Redirects to /login if not authenticated.
 */
export default function ProfilePage() {
    const router = useRouter();
    const { isAuthenticated, user, logout, isLoading } = useAuth();
    const [memberSince, setMemberSince] = useState('');

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        // Format a readable "member since" date
        if (user) {
            setMemberSince(new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
            }));
        }
    }, [user]);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-[calc(100vh-61px-56px)] bg-gray-50/60 items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#0F52BA] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated || !user) return null;

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

            {/* Profile Header */}
            <div className="px-6 pt-4 pb-6 text-center">
                <div className="w-20 h-20 bg-[#0F52BA]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-[#0F52BA]" />
                </div>
                <h1 className="text-gray-900 text-xl" style={{ fontWeight: 700 }}>
                    My Profile
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    {user.role === 'admin' ? 'Administrator' : 'Member'}
                </p>
            </div>

            {/* Profile Info Cards */}
            <div className="px-5 space-y-3 pb-8">
                {/* Email */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0F52BA]/10 rounded-xl flex items-center justify-center shrink-0">
                            <Mail className="h-5 w-5 text-[#0F52BA]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-400" style={{ fontWeight: 500 }}>Email</p>
                            <p className="text-gray-900 text-sm truncate" style={{ fontWeight: 600 }}>{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Role */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                            <Shield className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400" style={{ fontWeight: 500 }}>Role</p>
                            <p className="text-gray-900 text-sm capitalize" style={{ fontWeight: 600 }}>{user.role}</p>
                        </div>
                    </div>
                </div>

                {/* Member Since */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                            <Clock className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400" style={{ fontWeight: 500 }}>Member Since</p>
                            <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{memberSince}</p>
                        </div>
                    </div>
                </div>

                {/* Security Info */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                            <Key className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400" style={{ fontWeight: 500 }}>Authentication</p>
                            <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>Secure JWT + httpOnly Cookie</p>
                            <p className="text-xs text-gray-400 mt-0.5">Token auto-refreshes every 15 minutes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="px-5 pb-20">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl py-3.5 min-h-[52px] transition-colors"
                    style={{ fontWeight: 600 }}
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
