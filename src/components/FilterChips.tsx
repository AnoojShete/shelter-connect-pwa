'use client';

import { UtensilsCrossed, Stethoscope, Moon, Heart, Dog, Users } from 'lucide-react';

interface FilterChipsProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    variant?: 'default' | 'compact';
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

export function FilterChips({ activeFilter, onFilterChange, variant = 'default' }: FilterChipsProps) {
    const isCompact = variant === 'compact';

    return (
        <div className="flex gap-2 overflow-x-auto pb-1 px-4 scrollbar-hide">
            {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.label;

                return (
                    <button
                        key={filter.label}
                        onClick={() => onFilterChange(filter.label)}
                        className={`
              flex items-center gap-1.5 rounded-full whitespace-nowrap transition-all border
              ${isCompact ? 'px-3 py-1.5 min-h-[36px]' : 'px-4 py-2.5 min-h-[44px]'}
              ${isActive
                                ? 'bg-[#0F52BA] text-white border-[#0F52BA] shadow-md'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#0F52BA] hover:text-[#0F52BA]'
                            }
            `}
                    >
                        {Icon && <Icon className={`${isCompact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />}
                        <span>{filter.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
