'use client';

import { Home, Search, AlertTriangle, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

export function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    const tabs = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/shelters', label: 'Shelters', icon: Search },
        { path: '/emergency', label: 'Emergency', icon: AlertTriangle, isEmergency: true },
        { path: isAuthenticated ? '/profile' : '/login', label: isAuthenticated ? 'Profile' : 'Login', icon: User },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 max-w-md mx-auto" aria-label="Main navigation">
            <div className="flex items-stretch">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = pathname === tab.path ||
                        (tab.path === '/shelters' && pathname.startsWith('/shelters')) ||
                        (tab.path === '/profile' && pathname === '/profile');

                    return (
                        <button
                            key={tab.label}
                            onClick={() => router.push(tab.path)}
                            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[56px] transition-colors relative ${tab.isEmergency && isActive
                                    ? 'text-[#D32F2F]'
                                    : isActive
                                        ? 'text-[#0F52BA]'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            aria-label={tab.label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <Icon className={`h-6 w-6 ${tab.isEmergency && !isActive ? 'text-[#D32F2F]/70' : ''}`} />
                            <span className="text-xs">{tab.label}</span>
                            {isActive && (
                                <div
                                    className={`absolute top-0 h-0.5 w-12 rounded-b ${tab.isEmergency ? 'bg-[#D32F2F]' : 'bg-[#0F52BA]'
                                        }`}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
