'use client';

import { MapPin, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Shelter } from '@/data/shelters';

interface ShelterListProps {
    shelters: Shelter[];
}

export function ShelterList({ shelters }: ShelterListProps) {
    const router = useRouter();

    if (shelters.length === 0) {
        return (
            <div className="text-center py-12 px-4">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MapPin className="h-5 w-5 text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm" style={{ fontWeight: 500 }}>
                    No shelters found
                </p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-100/80">
            {shelters.map((shelter) => (
                <button
                    key={shelter.id}
                    onClick={() => router.push(`/shelters/${shelter.id}`)}
                    className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-gray-50/60 transition-colors duration-150 text-left min-h-[64px]"
                >
                    <div className="w-10 h-10 rounded-xl bg-[#E0F7FA]/60 flex items-center justify-center shrink-0">
                        <MapPin className="h-[18px] w-[18px] text-[#0F52BA]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-gray-900 truncate text-[0.9rem]" style={{ fontWeight: 500 }}>
                            {shelter.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{shelter.distance}</p>
                    </div>
                    <span
                        className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${shelter.isOpen
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                        style={{ fontWeight: 500 }}
                    >
                        {shelter.isOpen ? 'Open' : 'Full'}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
                </button>
            ))}
        </div>
    );
}
