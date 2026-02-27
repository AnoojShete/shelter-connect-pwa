'use client';

import { Bed, Wifi, UtensilsCrossed, MapPin, Stethoscope, Moon, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Shelter } from '@/data/shelters';

interface ShelterCardProps {
    shelter: Shelter;
}

export function ShelterCard({ shelter }: ShelterCardProps) {
    const router = useRouter();

    const amenityIcons = [
        { key: 'food', show: shelter.amenities.food, icon: UtensilsCrossed, label: 'Food' },
        { key: 'beds', show: shelter.amenities.beds, icon: Bed, label: 'Beds' },
        { key: 'medical', show: shelter.amenities.medical, icon: Stethoscope, label: 'Medical' },
        { key: 'nightStay', show: shelter.amenities.nightStay, icon: Moon, label: 'Night Stay' },
        { key: 'wifi', show: shelter.amenities.wifi, icon: Wifi, label: 'WiFi' },
    ].filter((a) => a.show);

    return (
        <button
            onClick={() => router.push(`/shelters/${shelter.id}`)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-left flex items-center gap-3.5 min-h-[80px]"
        >
            <div className="w-14 h-14 rounded-xl bg-[#E0F7FA]/60 flex items-center justify-center shrink-0">
                <Bed className="h-6 w-6 text-[#0F52BA]" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-gray-900 truncate text-[0.95rem]" style={{ fontWeight: 600 }}>
                        {shelter.name}
                    </h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>{shelter.distance} away</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {amenityIcons.map((a) => a.label).join(' · ')}
                </p>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span
                    className={`text-xs px-2.5 py-1 rounded-full ${shelter.isOpen
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                    style={{ fontWeight: 500 }}
                >
                    {shelter.isOpen ? 'Open' : 'Full'}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-300" />
            </div>
        </button>
    );
}
