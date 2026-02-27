'use client';

import { useState } from 'react';
import { Phone, Shield, Heart, ChevronRight, ChevronDown } from 'lucide-react';
import { emergencyContacts, safetyTips } from '@/data/shelters';

export function EmergencyActionList() {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="space-y-3">
            {/* Emergency Contacts */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                    onClick={() => toggleSection('contacts')}
                    className="w-full flex items-center justify-between px-4 py-4 min-h-[56px] hover:bg-gray-50/60 transition-colors duration-150"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#E0F7FA]/60 rounded-xl flex items-center justify-center">
                            <Phone className="h-4 w-4 text-[#0F52BA]" />
                        </div>
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
                    <div className="border-t border-gray-100">
                        {emergencyContacts.map((contact, index) => (
                            <a
                                key={contact.id}
                                href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                                className={`flex items-center gap-3 px-4 py-3 min-h-[60px] hover:bg-gray-50/60 transition-colors duration-150 ${index < emergencyContacts.length - 1 ? 'border-b border-gray-50' : ''
                                    }`}
                            >
                                <div className="w-10 h-10 bg-[#E0F7FA]/40 rounded-full flex items-center justify-center shrink-0">
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
                                <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Safety Tips */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                    onClick={() => toggleSection('safety')}
                    className="w-full flex items-center justify-between px-4 py-4 min-h-[56px] hover:bg-gray-50/60 transition-colors duration-150"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#E0F7FA]/60 rounded-xl flex items-center justify-center">
                            <Shield className="h-4 w-4 text-[#0F52BA]" />
                        </div>
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
                    <div className="border-t border-gray-100">
                        {safetyTips.map((tip, index) => (
                            <div
                                key={tip.id}
                                className={`px-4 py-3 ${index < safetyTips.length - 1 ? 'border-b border-gray-50' : ''
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
                                        <p className="text-xs text-gray-500 mt-0.5">{tip.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Know Your Rights */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                    onClick={() => toggleSection('rights')}
                    className="w-full flex items-center justify-between px-4 py-4 min-h-[56px] hover:bg-gray-50/60 transition-colors duration-150"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#E0F7FA]/60 rounded-xl flex items-center justify-center">
                            <Heart className="h-4 w-4 text-[#0F52BA]" />
                        </div>
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
                    <div className="border-t border-gray-100 px-4 py-3 space-y-3">
                        {[
                            'You have the right to emergency shelter regardless of your immigration status.',
                            'Shelters cannot turn you away based on race, religion, or gender identity.',
                            'You have the right to keep your personal belongings in shelter storage.',
                            'If denied service, you can file a complaint with the city\u2019s Department of Social Services.',
                        ].map((text, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#0F52BA] mt-1.5 shrink-0" />
                                <p className="text-sm text-gray-600">{text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
