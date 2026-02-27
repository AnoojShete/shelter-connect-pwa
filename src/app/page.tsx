'use client';

import { Search, Map, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ShelterSummaryCard } from '@/components/shelter/ShelterSummaryCard';
import { EmergencyBanner } from '@/components/emergency/EmergencyBanner';
import { MapView } from '@/components/MapView';
import { mockShelters } from '@/data/shelters';

export default function HomePage() {
    const router = useRouter();
    const openShelters = mockShelters.filter((s) => s.isOpen);

    return (
        <div className="flex flex-col min-h-[calc(100vh-61px-56px)] bg-gray-50/60">

            {/* Status Card */}
            <div className="px-5 pt-5">
                <ShelterSummaryCard />
            </div>

            {/* Quick Actions */}
            <div className="px-5 pt-5">
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={() => router.push('/shelters')}
                        className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97] min-h-[88px]"
                    >
                        <div className="w-10 h-10 bg-[#0F52BA]/10 rounded-xl flex items-center justify-center">
                            <Search className="h-5 w-5 text-[#0F52BA]" />
                        </div>
                        <span className="text-xs text-gray-700" style={{ fontWeight: 500 }}>
                            Find Shelters
                        </span>
                    </button>

                    <button
                        onClick={() => router.push('/shelters')}
                        className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97] min-h-[88px]"
                    >
                        <div className="w-10 h-10 bg-[#0F52BA]/10 rounded-xl flex items-center justify-center">
                            <Map className="h-5 w-5 text-[#0F52BA]" />
                        </div>
                        <span className="text-xs text-gray-700" style={{ fontWeight: 500 }}>
                            View Map
                        </span>
                    </button>

                    <button
                        onClick={() => router.push('/emergency')}
                        className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97] min-h-[88px]"
                    >
                        <div className="w-10 h-10 bg-[#D32F2F]/10 rounded-xl flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-[#D32F2F]" />
                        </div>
                        <span className="text-xs text-gray-700" style={{ fontWeight: 500 }}>
                            Emergency
                        </span>
                    </button>
                </div>
            </div>

            {/* Emergency Banner */}
            <div className="px-5 pt-5">
                <EmergencyBanner />
            </div>

            {/* Map Preview */}
            <div className="px-5 pt-5 pb-5 flex-1 flex flex-col">
                <p className="text-sm text-gray-400 mb-3" style={{ fontWeight: 500 }}>
                    Shelters near you
                </p>
                <div className="flex-1 rounded-2xl overflow-hidden shadow-sm">
                    <MapView
                        shelters={openShelters}
                        onShelterClick={(s) => router.push(`/shelters/${s.id}`)}
                        height="h-full min-h-[240px]"
                    />
                </div>
            </div>
        </div>
    );
}
