import { MapPin } from 'lucide-react';
import type { Shelter } from '../data/shelters';

interface MapViewProps {
  shelters: Shelter[];
  onShelterClick: (shelter: Shelter) => void;
  height?: string;
}

export function MapView({ shelters, onShelterClick, height = 'h-[280px]' }: MapViewProps) {
  return (
    <div className={`relative w-full ${height} bg-gradient-to-br from-blue-50 to-teal-50 overflow-hidden`}>
      {/* Map grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(15, 82, 186, 0.08)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#mapGrid)" />

        {/* Roads */}
        <line x1="0" y1="120" x2="400" y2="150" stroke="rgba(15, 82, 186, 0.15)" strokeWidth="3" />
        <line x1="0" y1="200" x2="400" y2="180" stroke="rgba(15, 82, 186, 0.1)" strokeWidth="2" />
        <line x1="150" y1="0" x2="180" y2="300" stroke="rgba(15, 82, 186, 0.15)" strokeWidth="3" />
        <line x1="280" y1="0" x2="260" y2="300" stroke="rgba(15, 82, 186, 0.1)" strokeWidth="2" />
        
        {/* Diagonal roads */}
        <line x1="0" y1="0" x2="200" y2="300" stroke="rgba(15, 82, 186, 0.07)" strokeWidth="2" />
        <line x1="400" y1="50" x2="100" y2="300" stroke="rgba(15, 82, 186, 0.07)" strokeWidth="2" />

        {/* Park areas */}
        <ellipse cx="80" cy="70" rx="35" ry="28" fill="rgba(34, 197, 94, 0.12)" />
        <ellipse cx="340" cy="240" rx="40" ry="32" fill="rgba(34, 197, 94, 0.12)" />
        <ellipse cx="220" cy="60" rx="25" ry="20" fill="rgba(34, 197, 94, 0.08)" />
        
        {/* Water */}
        <ellipse cx="350" cy="80" rx="50" ry="35" fill="rgba(59, 130, 246, 0.06)" />
      </svg>

      {/* Shelter pins */}
      <div className="absolute inset-0">
        {shelters.map((shelter, index) => {
          const positions = [
            { top: '30%', left: '42%' },
            { top: '22%', left: '62%' },
            { top: '55%', left: '28%' },
            { top: '68%', left: '70%' },
            { top: '42%', left: '78%' },
          ];
          const position = positions[index % positions.length];

          return (
            <button
              key={shelter.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ top: position.top, left: position.left }}
              onClick={() => onShelterClick(shelter)}
              aria-label={`${shelter.name} - ${shelter.isOpen ? 'Open' : 'Closed'}`}
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                    shelter.isOpen
                      ? 'bg-[#0F52BA]'
                      : 'bg-gray-400'
                  }`}
                >
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                {shelter.isOpen && (
                  <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                <span>{shelter.name}</span>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Current location */}
      <div
        className="absolute"
        style={{ top: '48%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative">
          <div className="w-5 h-5 bg-blue-600 rounded-full border-3 border-white shadow-lg z-10 relative" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 bg-blue-400 rounded-full opacity-25 animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
}
