import { useState } from 'react';
import {
  AlertTriangle,
  Phone,
  ChevronRight,
  ChevronDown,
  Shield,
  Heart,
  MapPin,
} from 'lucide-react';
import { emergencyContacts, safetyTips } from '../data/shelters';

export function EmergencyHelpPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

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
            }).catch(() => {});
          } else {
            alert(
              `Location shared: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            );
          }
        },
        () => {
          alert('Unable to get location. Please enable location services.');
        }
      );
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-57px-56px)] bg-white">
      {/* Emergency Hero */}
      <div className="bg-gradient-to-b from-[#D32F2F]/5 to-white px-6 pt-8 pb-6 text-center">
        <div className="w-16 h-16 bg-[#D32F2F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-8 w-8 text-[#D32F2F]" />
        </div>
        <h1 className="text-gray-900 mb-2" style={{ fontWeight: 700, fontSize: '1.375rem' }}>
          Need Immediate Assistance?
        </h1>
        <p className="text-gray-500 text-sm">
          If you're in danger, call 911 immediately.
          <br />
          For non-emergency help, use the resources below.
        </p>
      </div>

      {/* Call For Help Button */}
      <div className="px-6 pb-4">
        <button
          onClick={handleCallForHelp}
          className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/90 text-white rounded-xl py-4 flex items-center justify-center gap-3 min-h-[56px] shadow-lg transition-colors active:scale-[0.98]"
          style={{ fontWeight: 700, fontSize: '1.125rem' }}
        >
          <Phone className="h-6 w-6" />
          CALL FOR HELP
        </button>
      </div>

      {/* Share Location */}
      <div className="px-6 pb-4">
        <button
          onClick={handleShareLocation}
          className="w-full border-2 border-[#D32F2F] text-[#D32F2F] hover:bg-[#D32F2F]/5 rounded-xl py-3 flex items-center justify-center gap-2 min-h-[52px] transition-colors"
          style={{ fontWeight: 600 }}
        >
          <MapPin className="h-5 w-5" />
          Share My Location
        </button>
      </div>

      {/* Sections */}
      <div className="flex-1 px-6 pb-20">
        {/* Emergency Contacts */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-3">
          <button
            onClick={() => toggleSection('contacts')}
            className="w-full flex items-center justify-between px-4 py-4 min-h-[56px] hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#0F52BA]" />
              <span className="text-gray-900" style={{ fontWeight: 600 }}>
                Emergency Contacts
              </span>
            </div>
            {expandedSection === 'contacts' ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {expandedSection === 'contacts' && (
            <div className="border-t border-gray-200">
              {emergencyContacts.map((contact, index) => (
                <a
                  key={contact.id}
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className={`flex items-center gap-3 px-4 py-3 min-h-[60px] hover:bg-[#E0F7FA]/50 transition-colors ${
                    index < emergencyContacts.length - 1
                      ? 'border-b border-gray-100'
                      : ''
                  }`}
                >
                  <div className="w-10 h-10 bg-[#E0F7FA] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-[#0F52BA]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
                      {contact.name}
                    </p>
                    <p className="text-xs text-[#0F52BA]" style={{ fontWeight: 500 }}>
                      {contact.phone}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {contact.description}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Safety Tips */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-3">
          <button
            onClick={() => toggleSection('safety')}
            className="w-full flex items-center justify-between px-4 py-4 min-h-[56px] hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-[#0F52BA]" />
              <span className="text-gray-900" style={{ fontWeight: 600 }}>
                Safety Tips
              </span>
            </div>
            {expandedSection === 'safety' ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {expandedSection === 'safety' && (
            <div className="border-t border-gray-200">
              {safetyTips.map((tip, index) => (
                <div
                  key={tip.id}
                  className={`px-4 py-3 ${
                    index < safetyTips.length - 1
                      ? 'border-b border-gray-100'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#E0F7FA] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs text-[#0F52BA]" style={{ fontWeight: 700 }}>
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
                        {tip.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Know Your Rights */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('rights')}
            className="w-full flex items-center justify-between px-4 py-4 min-h-[56px] hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-[#0F52BA]" />
              <span className="text-gray-900" style={{ fontWeight: 600 }}>
                Know Your Rights
              </span>
            </div>
            {expandedSection === 'rights' ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {expandedSection === 'rights' && (
            <div className="border-t border-gray-200 px-4 py-3 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#0F52BA] mt-2 shrink-0" />
                <p className="text-sm text-gray-600">
                  You have the right to emergency shelter regardless of your
                  immigration status.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#0F52BA] mt-2 shrink-0" />
                <p className="text-sm text-gray-600">
                  Shelters cannot turn you away based on race, religion, or
                  gender identity.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#0F52BA] mt-2 shrink-0" />
                <p className="text-sm text-gray-600">
                  You have the right to keep your personal belongings in shelter
                  storage.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#0F52BA] mt-2 shrink-0" />
                <p className="text-sm text-gray-600">
                  If denied service, you can file a complaint with the city's
                  Department of Social Services.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
