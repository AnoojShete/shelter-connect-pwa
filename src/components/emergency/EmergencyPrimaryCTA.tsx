'use client';

import { Phone, MapPin } from 'lucide-react';

export function EmergencyPrimaryCTA() {
    const handleCallForHelp = () => {
        window.location.href = 'tel:911';
    };

    const handleShareLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    if (navigator.share) {
                        navigator.share({
                            title: 'My Location - Emergency',
                            text: `I need help. My location: ${latitude}, ${longitude}`,
                            url: `https://www.google.com/maps?q=${latitude},${longitude}`,
                        }).catch(() => { });
                    } else {
                        alert(`Location shared: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                    }
                },
                () => {
                    alert('Unable to get location. Please enable location services.');
                }
            );
        }
    };

    return (
        <div className="space-y-3">
            <button
                onClick={handleCallForHelp}
                className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/90 text-white rounded-2xl py-4 flex items-center justify-center gap-3 min-h-[56px] shadow-md transition-all duration-200 active:scale-[0.98]"
                style={{ fontWeight: 700, fontSize: '1.1rem' }}
            >
                <Phone className="h-6 w-6" />
                Call for Help
            </button>
            <button
                onClick={handleShareLocation}
                className="w-full border-2 border-[#D32F2F]/30 text-[#D32F2F] hover:bg-[#D32F2F]/5 rounded-2xl py-3.5 flex items-center justify-center gap-2 min-h-[52px] transition-all duration-200"
                style={{ fontWeight: 600 }}
            >
                <MapPin className="h-5 w-5" />
                Share My Location
            </button>
        </div>
    );
}
