'use client';

import { List, Map } from 'lucide-react';

interface ViewToggleProps {
    viewMode: 'list' | 'map';
    onViewChange: (mode: 'list' | 'map') => void;
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
            <button
                onClick={() => onViewChange('list')}
                className={`px-3.5 py-1.5 flex items-center gap-1.5 rounded-lg text-sm min-h-[36px] transition-all duration-200 ${viewMode === 'list'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                style={{ fontWeight: viewMode === 'list' ? 600 : 400 }}
            >
                <List className="h-4 w-4" />
                List
            </button>
            <button
                onClick={() => onViewChange('map')}
                className={`px-3.5 py-1.5 flex items-center gap-1.5 rounded-lg text-sm min-h-[36px] transition-all duration-200 ${viewMode === 'map'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                style={{ fontWeight: viewMode === 'map' ? 600 : 400 }}
            >
                <Map className="h-4 w-4" />
                Map
            </button>
        </div>
    );
}
