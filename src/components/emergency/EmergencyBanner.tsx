'use client';

import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function EmergencyBanner() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/emergency')}
            className="w-full bg-red-50/80 hover:bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.98] shadow-sm"
        >
            <div className="w-11 h-11 bg-[#D32F2F]/10 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-[#D32F2F]" />
            </div>
            <div className="flex-1 text-left">
                <span className="text-[#D32F2F] text-[0.9rem] tracking-wide" style={{ fontWeight: 600 }}>
                    Emergency Assistance
                </span>
                <p className="text-xs text-gray-400 mt-1">Crisis hotlines &amp; immediate help</p>
            </div>
            <svg className="h-4 w-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
}
