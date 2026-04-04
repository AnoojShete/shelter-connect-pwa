'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { LogIn, LogOut, User } from 'lucide-react';

export function Header() {
    const router = useRouter();
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <header className="bg-white/95 backdrop-blur-sm px-5 py-4 flex items-center sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2.5 min-h-[44px]"
                aria-label="Go to home"
            >
                <div className="w-9 h-9 bg-[#0F52BA] rounded-xl flex items-center justify-center shadow-sm">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 2L3 7V17H8V12H12V17H17V7L10 2Z"
                            fill="white"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <span className="text-gray-900 tracking-tight" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                    ShelterConnect
                </span>
            </button>

            {/* Auth Button */}
            <div className="ml-auto flex items-center gap-2">
                {isAuthenticated ? (
                    <>
                        <button
                            onClick={() => router.push('/profile')}
                            className="flex items-center gap-1.5 h-9 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="View profile"
                        >
                            <div className="w-7 h-7 bg-[#0F52BA]/10 rounded-full flex items-center justify-center">
                                <User className="h-3.5 w-3.5 text-[#0F52BA]" />
                            </div>
                            <span className="text-xs text-gray-500 hidden min-[360px]:inline truncate max-w-[80px]">
                                {user?.email}
                            </span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                            aria-label="Logout"
                        >
                            <LogOut className="h-4.5 w-4.5" />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => router.push('/login')}
                        className="h-9 px-3 flex items-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 text-sm"
                        style={{ fontWeight: 500 }}
                    >
                        <LogIn className="h-4 w-4" />
                        <span className="hidden min-[360px]:inline">Login</span>
                    </button>
                )}
            </div>
        </header>
    );
}
