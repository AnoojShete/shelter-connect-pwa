'use client';

import { useRouter } from 'next/navigation';

export function Header() {
    const router = useRouter();

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
        </header>
    );
}
