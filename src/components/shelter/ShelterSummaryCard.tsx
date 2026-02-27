'use client';

import { mockShelters } from '@/data/shelters';

export function ShelterSummaryCard() {
    const openCount = mockShelters.filter((s) => s.isOpen).length;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm transition-all duration-200">
            <div className="flex items-baseline gap-2">
                <span
                    className="text-[2.25rem] leading-none text-[#0F52BA] tracking-tight"
                    style={{ fontWeight: 700 }}
                >
                    {openCount}
                </span>
                <span className="text-gray-900 text-lg" style={{ fontWeight: 600 }}>
                    Open Shelters
                </span>
            </div>
            <p className="text-sm text-gray-400 mt-1.5">Available near you right now</p>
        </div>
    );
}
