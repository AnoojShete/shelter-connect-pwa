'use client';

import { UtensilsCrossed, Stethoscope, Moon, Heart, Dog, Users } from 'lucide-react';

interface FiltersProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

const filters = [
    { label: 'All', icon: null },
    { label: 'Food', icon: UtensilsCrossed },
    { label: 'Medical', icon: Stethoscope },
    { label: 'Night Stay', icon: Moon },
    { label: 'Women-Only', icon: Heart },
    { label: 'Pet-Friendly', icon: Dog },
    { label: 'Family', icon: Users },
];

export function Filters({ activeFilter, onFilterChange }: FiltersProps) {
    return (
        <div className="flex gap-2.5 overflow-x-auto pb-1 px-4 scrollbar-hide">
            {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.label;

                return (
                    <button
                        key={filter.label}
                        onClick={() => onFilterChange(filter.label)}
                        className={`
              flex items-center gap-1.5 rounded-full whitespace-nowrap transition-all duration-200 border
              px-4 py-2 min-h-[44px]
              ${isActive
                                ? 'bg-[#0F52BA] text-white border-[#0F52BA] shadow-sm'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-[#0F52BA]/40 hover:text-[#0F52BA]'
                            }
            `}
                        style={{ fontWeight: isActive ? 600 : 400 }}
                    >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span className="text-sm">{filter.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
