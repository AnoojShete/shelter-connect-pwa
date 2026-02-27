import {
  ArrowLeft,
  Navigation,
  Phone,
  Bed,
  Wifi,
  UtensilsCrossed,
  MapPin,
  Clock,
  Stethoscope,
  Moon,
  ChevronRight,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { mockShelters } from '../data/shelters';
import { MapView } from './MapView';
import { ImageWithFallback } from './figma/ImageWithFallback';

const shelterImages: Record<string, string> = {
  'shelter-interior':
    'https://images.unsplash.com/photo-1697603899008-a4027a95fd95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVsdGVyJTIwaW50ZXJpb3IlMjBiZWRzfGVufDF8fHx8MTc3MDMxMTY2NHww&ixlib=rb-4.1.0&q=80&w=1080',
  'women-shelter':
    'https://images.unsplash.com/photo-1588335923756-d61f9b3b7c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzaGVsdGVyJTIwaG9tZXxlbnwxfHx8fDE3NzAzMTE2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'pet-friendly-shelter':
    'https://images.unsplash.com/photo-1769732169102-c997d8c334fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmcmllbmRseSUyMHNoZWx0ZXJ8ZW58MXx8fHwxNzcwMzExNjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'community-center':
    'https://images.unsplash.com/photo-1644124375863-4308cde38d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lbGVzcyUyMHNoZWx0ZXIlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTU3MTcxMXww&ixlib=rb-4.1.0&q=80&w=1080',
  'family-shelter':
    'https://images.unsplash.com/photo-1767884162402-683fdd430046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzaGVsdGVyJTIwZG9ybWl0b3J5JTIwYmVkc3xlbnwxfHx8fDE3NzE1NzE3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

export function ShelterDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const shelter = mockShelters.find((s) => s.id === id);

  if (!shelter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-gray-500 text-center" style={{ fontWeight: 500 }}>
          Shelter not found
        </p>
        <button
          onClick={() => navigate('/shelters')}
          className="mt-4 text-[#0F52BA] min-h-[44px]"
          style={{ fontWeight: 500 }}
        >
          Back to shelters
        </button>
      </div>
    );
  }

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shelter.address)}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${shelter.phone}`;
  };

  const amenities = [
    { key: 'beds', show: shelter.amenities.beds, icon: Bed, label: 'Beds', detail: `${shelter.bedsAvailable} available` },
    { key: 'food', show: shelter.amenities.food, icon: UtensilsCrossed, label: 'Food', detail: 'Meals provided' },
    { key: 'medical', show: shelter.amenities.medical, icon: Stethoscope, label: 'Medical', detail: 'Health services' },
    { key: 'nightStay', show: shelter.amenities.nightStay, icon: Moon, label: 'Night Stay', detail: 'Overnight shelter' },
    { key: 'wifi', show: shelter.amenities.wifi, icon: Wifi, label: 'WiFi', detail: 'Free internet' },
  ].filter((a) => a.show);

  return (
    <div className="flex flex-col min-h-[calc(100vh-57px)] bg-white">
      {/* Sub-header with back */}
      <div className="sticky top-[57px] z-40 bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="h-11 w-11 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h2 className="text-gray-900 flex-1 truncate" style={{ fontWeight: 600 }}>
          {shelter.name}
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-36">
        {/* Hero Image */}
        <div className="relative h-48 bg-gray-200">
          <ImageWithFallback
            src={shelterImages[shelter.imageUrl]}
            alt={shelter.name}
            className="w-full h-full object-cover"
          />
          {/* Distance overlay */}
          <div className="absolute bottom-3 left-3 bg-white/95 rounded-lg px-3 py-1.5 shadow-md flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-[#0F52BA]" />
            <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>
              Distance: {shelter.distance}
            </span>
          </div>
        </div>

        {/* Bed Availability Banner */}
        <div
          className={`px-4 py-3 flex items-center justify-between ${
            shelter.isOpen ? 'bg-green-50' : 'bg-gray-100'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                  shelter.isOpen
                    ? 'bg-green-200 text-green-900'
                    : 'bg-gray-300 text-gray-700'
                }`}
                style={{ fontWeight: 600 }}
              >
                {shelter.isOpen ? 'OPEN' : 'CLOSED'}
              </span>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {shelter.hours}
              </span>
            </div>
            <p className="text-gray-900" style={{ fontWeight: 600, fontSize: '1.125rem' }}>
              {shelter.bedsAvailable} / {shelter.totalBeds} Beds Available
            </p>
          </div>
        </div>

        {/* Facilities */}
        <div className="px-4 py-4 border-b border-gray-100">
          <p className="text-sm text-gray-500 mb-3">
            Facilities: {amenities.map((a) => a.label).join(', ')}
          </p>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={amenity.key}
                  className="flex items-center gap-2 px-3 py-2 bg-[#E0F7FA] rounded-lg"
                >
                  <Icon className="h-4 w-4 text-[#0F52BA]" />
                  <div>
                    <span className="text-sm text-gray-800" style={{ fontWeight: 500 }}>
                      {amenity.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shelter Details */}
        <div className="px-4 py-4 border-b border-gray-100">
          <h3 className="text-gray-900 mb-2" style={{ fontWeight: 600 }}>
            Shelter Details
          </h3>
          <p className="text-gray-600 leading-relaxed">{shelter.description}</p>
        </div>

        {/* Location & Map */}
        <div className="px-4 py-4 border-b border-gray-100">
          <h3 className="text-gray-900 mb-2 flex items-center gap-2" style={{ fontWeight: 600 }}>
            <MapPin className="h-5 w-5 text-[#0F52BA]" />
            Location
          </h3>
          <p className="text-gray-600 mb-3">{shelter.address}</p>

          <div className="rounded-xl overflow-hidden border border-gray-200">
            <MapView
              shelters={[shelter]}
              onShelterClick={() => handleNavigate()}
              height="h-[180px]"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="px-4 py-4">
          <h3 className="text-gray-900 mb-2 flex items-center gap-2" style={{ fontWeight: 600 }}>
            <Phone className="h-5 w-5 text-[#0F52BA]" />
            Contact
          </h3>
          <button
            onClick={handleCall}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors min-h-[48px]"
          >
            <span className="text-gray-700">{shelter.phone}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-[56px] left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-4 py-3 shadow-[0px_-4px_12px_rgba(0,0,0,0.08)] z-40">
        <div className="flex gap-3">
          <button
            onClick={handleNavigate}
            className="flex-1 bg-[#0F52BA] hover:bg-[#0F52BA]/90 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 min-h-[52px] transition-colors"
            style={{ fontWeight: 600 }}
          >
            <Navigation className="h-5 w-5" />
            Navigate
          </button>
          <button
            onClick={handleCall}
            className="flex-1 border-2 border-[#0F52BA] text-[#0F52BA] hover:bg-[#0F52BA] hover:text-white rounded-xl py-3.5 flex items-center justify-center gap-2 min-h-[52px] transition-colors"
            style={{ fontWeight: 600 }}
          >
            <Phone className="h-5 w-5" />
            Contact / Book
          </button>
        </div>
      </div>
    </div>
  );
}