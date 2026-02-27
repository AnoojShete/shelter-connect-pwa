'use client';

import { Bed, Wifi, UtensilsCrossed, MapPin, Stethoscope, Moon, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Shelter } from '@/data/shelters';

interface ShelterCardProps {
    shelter: Shelter;
    variant?: 'default' | 'compact';
}

export function ShelterCard({ shelter, variant = 'default' }: ShelterCardProps) {
    const router = useRouter();
    const isCompact = variant === 'compact';

    const amenityIcons = [
        { key: 'food', show: shelter.amenities.food, icon: UtensilsCrossed, label: 'Food' },
        { key: 'beds', show: shelter.amenities.beds, icon: Bed, label: 'Beds' },
        { key: 'medical', show: shelter.amenities.medical, icon: Stethoscope, label: 'Medical' },
        { key: 'nightStay', show: shelter.amenities.nightStay, icon: Moon, label: 'Night Stay' },
        { key: 'wifi', show: shelter.amenities.wifi, icon: Wifi, label: 'WiFi' },
    ].filter((a) => a.show);

    if (isCompact) {
        return (
            <button
                onClick={() => router.push(`/shelters/${shelter.id}`)}
                className="w-full bg-white rounded-2xl p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0px_4px_16px_rgba(0,0,0,0.1)] transition-all text-left flex items-center gap-3 min-h-[80px]"
            >
                {/* Thumbnail placeholder */}
                <div className="w-14 h-14 rounded-xl bg-[#E0F7FA] flex items-center justify-center shrink-0">
                    <Bed className="h-6 w-6 text-[#0F52BA]" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-gray-900 truncate" style={{ fontWeight: 600 }}>
                            {shelter.name}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-500">{shelter.distance} away</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                        Facilities: {amenityIcons.map((a) => a.label).join(', ')}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${shelter.isOpen
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                        style={{ fontWeight: 500 }}
                    >
                        {shelter.isOpen ? 'Open' : 'Full'}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
            </button>
        );
    }

    return (
        <div
            className="bg-white rounded-2xl p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] cursor-pointer hover:shadow-[0px_6px_16px_rgba(0,0,0,0.12)] transition-shadow"
            onClick={() => router.push(`/shelters/${shelter.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && router.push(`/shelters/${shelter.id}`)}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 mb-1 truncate" style={{ fontWeight: 600 }}>
                        {shelter.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span>{shelter.distance} away</span>
                    </div>
                </div>
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs shrink-0 ml-2 ${shelter.isOpen
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                    style={{ fontWeight: 500 }}
                >
                    {shelter.isOpen ? 'Open' : 'Full'}
                </span>
            </div>

            <div className="flex items-center gap-3 mb-3 flex-wrap">
                {amenityIcons.slice(0, 4).map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                        <div
                            key={amenity.key}
                            className="flex items-center gap-1 text-gray-600"
                        >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{amenity.label}</span>
                        </div>
                    );
                })}
            </div>

            {shelter.isOpen && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                        {shelter.bedsAvailable} beds available
                    </span>
                    <span className="text-sm text-[#0F52BA] flex items-center gap-1" style={{ fontWeight: 500 }}>
                        View Details
                        <ChevronRight className="h-4 w-4" />
                    </span>
                </div>
            )}
        </div>
    );
}
