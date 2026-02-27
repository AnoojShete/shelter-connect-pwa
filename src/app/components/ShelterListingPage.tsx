import { useState } from 'react';
import { Search, List, Map, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router';
import { FilterChips } from './FilterChips';
import { ShelterCard } from './ShelterCard';
import { MapView } from './MapView';
import { mockShelters } from '../data/shelters';

export function ShelterListingPage() {
  const navigate = useNavigate();
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
    <div className="flex flex-col min-h-[calc(100vh-57px-56px)] bg-gray-50">
      {/* Search */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search shelters by name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl min-h-[48px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/30 focus:border-[#0F52BA]"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* View Toggle + Filter Row */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 pt-2 pb-1">
          <span className="text-sm text-gray-500">
            {filteredShelters.length} shelter{filteredShelters.length !== 1 ? 's' : ''} found
          </span>
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 flex items-center gap-1 min-h-[36px] transition-colors text-sm ${
                viewMode === 'list'
                  ? 'bg-[#0F52BA] text-white'
                  : 'text-gray-600'
              }`}
            >
              <List className="h-4 w-4" />
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 flex items-center gap-1 min-h-[36px] transition-colors text-sm ${
                viewMode === 'map'
                  ? 'bg-[#0F52BA] text-white'
                  : 'text-gray-600'
              }`}
            >
              <Map className="h-4 w-4" />
              Map
            </button>
          </div>
        </div>
        <div className="py-2">
          <FilterChips
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            variant="compact"
          />
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-20">
          {filteredShelters.length > 0 ? (
            filteredShelters.map((shelter) => (
              <ShelterCard key={shelter.id} shelter={shelter} variant="compact" />
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500" style={{ fontWeight: 500 }}>
                No shelters found
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                }}
                className="mt-4 text-[#0F52BA] text-sm min-h-[44px]"
                style={{ fontWeight: 500 }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 relative">
          <MapView
            shelters={filteredShelters}
            onShelterClick={(s) => navigate(`/shelter/${s.id}`)}
            height="h-full"
          />

          {/* Bottom peek cards */}
          <div className="absolute bottom-4 left-0 right-0 z-10">
            <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {filteredShelters.slice(0, 3).map((shelter) => (
                <button
                  key={shelter.id}
                  onClick={() => navigate(`/shelter/${shelter.id}`)}
                  className="bg-white rounded-xl p-3 shadow-lg min-w-[220px] shrink-0 text-left"
                >
                  <p className="text-gray-900 truncate" style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    {shelter.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{shelter.distance} away</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        shelter.isOpen
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {shelter.isOpen ? `${shelter.bedsAvailable} beds` : 'Full'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
