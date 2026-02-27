'use client';

import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
            <div className="w-16 h-16 bg-[#E0F7FA] rounded-full flex items-center justify-center mb-4">
                <Home className="h-8 w-8 text-[#0F52BA]" />
            </div>
            <h2 className="text-gray-900 mb-2" style={{ fontWeight: 600, fontSize: '1.25rem' }}>
                Page Not Found
            </h2>
            <p className="text-gray-500 text-sm mb-6">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <button
                onClick={() => router.push('/')}
                className="bg-[#0F52BA] text-white rounded-xl px-6 py-3 min-h-[48px] hover:bg-[#0F52BA]/90 transition-colors"
                style={{ fontWeight: 600 }}
            >
                Go Home
            </button>
        </div>
    );
}
