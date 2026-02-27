'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Filters } from '@/components/shelter/Filters';
import { ShelterCard } from '@/components/shelter/ShelterCard';
import { ViewToggle } from '@/components/shelter/ViewToggle';
import { MapView } from '@/components/MapView';
import { mockShelters } from '@/data/shelters';

export default function SheltersPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    const filteredShelters = mockShelters.filter((shelter) => {
        const matchesSearch =
            searchQuery === '' ||
            shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shelter.address.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesFilter = true;
        if (activeFilter === 'Food') matchesFilter = shelter.amenities.food;
        else if (activeFilter === 'Medical') matchesFilter = shelter.amenities.medical;
        else if (activeFilter === 'Night Stay') matchesFilter = shelter.amenities.nightStay;
        else if (activeFilter !== 'All') matchesFilter = shelter.filters.includes(activeFilter);

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex flex-col min-h-[calc(100vh-61px-56px)] bg-gray-50/60">
            {/* Search */}
            <div className="bg-white px-5 py-4 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search shelters..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl min-h-[48px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA]/40 transition-all duration-200"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors duration-150">
                        <SlidersHorizontal className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-b border-gray-100 py-3">
                <Filters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>

            {/* Toggle + Count */}
            <div className="flex items-center justify-between px-5 py-3">
                <p className="text-sm text-gray-400" style={{ fontWeight: 500 }}>
                    {filteredShelters.length} shelter{filteredShelters.length !== 1 ? 's' : ''} found
                </p>
                <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
            </div>

            {/* Content */}
            <div className="flex-1 px-5 pb-20">
                {viewMode === 'list' ? (
                    <div className="space-y-3">
                        {filteredShelters.length > 0 ? (
                            filteredShelters.map((shelter) => (
                                <ShelterCard key={shelter.id} shelter={shelter} />
                            ))
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                    <Search className="h-6 w-6 text-gray-300" />
                                </div>
                                <p className="text-gray-500" style={{ fontWeight: 500 }}>
                                    No shelters found
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    Try adjusting your search or filters
                                </p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                                    className="mt-4 text-[#0F52BA] text-sm min-h-[44px]"
                                    style={{ fontWeight: 500 }}
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4" style={{ minHeight: 'calc(100vh - 320px)' }}>
                        <div className="flex-1 rounded-2xl overflow-hidden shadow-sm">
                            <MapView
                                shelters={filteredShelters}
                                onShelterClick={(s) => router.push(`/shelters/${s.id}`)}
                                height="h-full min-h-[300px]"
                            />
                        </div>

                        {/* Bottom peek cards */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {filteredShelters.slice(0, 3).map((shelter) => (
                                <button
                                    key={shelter.id}
                                    onClick={() => router.push(`/shelters/${shelter.id}`)}
                                    className="bg-white rounded-2xl p-3.5 shadow-sm min-w-[200px] shrink-0 text-left hover:shadow-md transition-all duration-200"
                                >
                                    <p className="text-gray-900 truncate text-sm" style={{ fontWeight: 600 }}>
                                        {shelter.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{shelter.distance} away</p>
                                    <div className="mt-2">
                                        <span
                                            className={`text-xs px-2.5 py-1 rounded-full ${shelter.isOpen
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}
                                            style={{ fontWeight: 500 }}
                                        >
                                            {shelter.isOpen ? `${shelter.bedsAvailable} beds` : 'Full'}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
