import { useState } from 'react';
import { Search, AlertTriangle, MapPin, List, Map } from 'lucide-react';
import { useNavigate } from 'react-router';
import { FilterChips } from './FilterChips';
import { MapView } from './MapView';
import { mockShelters } from '../data/shelters';

export function HomePage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');

  const filteredShelters = mockShelters.filter((shelter) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Food') return shelter.amenities.food;
    if (activeFilter === 'Medical') return shelter.amenities.medical;
    if (activeFilter === 'Night Stay') return shelter.amenities.nightStay;
    return shelter.filters.includes(activeFilter);
  });

  const openCount = mockShelters.filter((s) => s.isOpen).length;

  return (
    <div className="flex flex-col min-h-[calc(100vh-57px-56px)] bg-[#E0F7FA]/30">
      {/* Hero Section */}
      <div className="bg-white px-4 pt-5 pb-4">
        {/* Search / CTA */}
        <button
          onClick={() => navigate('/shelters')}
          className="w-full bg-[#0F52BA] text-white rounded-xl px-6 py-4 flex items-center justify-center gap-2 min-h-[52px] shadow-md hover:bg-[#0F52BA]/90 transition-colors active:scale-[0.98]"
        >
          <Search className="h-5 w-5" />
          <span style={{ fontWeight: 600 }}>Find Nearby Shelters</span>
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">
          {openCount} shelters open now near you
        </p>
      </div>

      {/* Quick Filter Chips */}
      <div className="bg-white py-3 border-b border-gray-100">
        <FilterChips
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          variant="compact"
        />
      </div>

      {/* Emergency Help Banner */}
      <div className="mx-4 mt-4">
        <div className="bg-white rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <h2 className="text-gray-900" style={{ fontWeight: 600 }}>
              Emergency Help
            </h2>
          </div>
          <button
            onClick={() => navigate('/emergency')}
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#D32F2F]/5 hover:bg-[#D32F2F]/10 transition-colors min-h-[52px] mb-2 mx-0"
          >
            <div className="w-10 h-10 bg-[#D32F2F] rounded-lg flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-[#D32F2F]" style={{ fontWeight: 600 }}>
                EMERGENCY ASSISTANCE
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                Immediate help & crisis hotlines
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 mt-4 relative">
        {/* View Toggle */}
        <div className="absolute top-3 right-3 z-10 bg-white rounded-lg shadow-md flex overflow-hidden border border-gray-200">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 flex items-center gap-1.5 min-h-[40px] transition-colors ${
              viewMode === 'list'
                ? 'bg-[#0F52BA] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <List className="h-4 w-4" />
            <span className="text-sm">List</span>
          </button>
          <div className="w-px bg-gray-200" />
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-2 flex items-center gap-1.5 min-h-[40px] transition-colors ${
              viewMode === 'map'
                ? 'bg-[#0F52BA] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Map className="h-4 w-4" />
            <span className="text-sm">Map</span>
          </button>
        </div>

        {viewMode === 'map' ? (
          <MapView
            shelters={filteredShelters}
            onShelterClick={(s) => navigate(`/shelter/${s.id}`)}
            height="h-full min-h-[280px]"
          />
        ) : (
          <div className="px-4 pb-4 space-y-3 bg-white/80">
            {filteredShelters.map((shelter) => (
              <button
                key={shelter.id}
                onClick={() => navigate(`/shelter/${shelter.id}`)}
                className="w-full flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left min-h-[60px]"
              >
                <MapPin className="h-5 w-5 text-[#0F52BA] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate" style={{ fontWeight: 500 }}>
                    {shelter.name}
                  </p>
                  <p className="text-xs text-gray-500">{shelter.distance}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    shelter.isOpen
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {shelter.isOpen ? 'Open' : 'Full'}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
