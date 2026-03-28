import { AlertTriangle } from 'lucide-react';
import { getEmergencyContacts, getSafetyTips } from '@/lib/shelters';
import { EmergencyPrimaryCTA } from '@/components/emergency/EmergencyPrimaryCTA';
import { EmergencyActionListServer } from '@/components/emergency/EmergencyActionList';

/**
 * Emergency page — Server Component (SSR).
 * Emergency contacts and safety tips are fetched on the server at request time.
 */
export default async function EmergencyPage() {
    const [contacts, tips] = await Promise.all([
        getEmergencyContacts(),
        getSafetyTips(),
    ]);

    return (
        <div className="flex flex-col min-h-[calc(100vh-61px-56px)] bg-gray-50/60">
            {/* Hero */}
            <div className="bg-white px-6 pt-8 pb-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-[#D32F2F]/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-8 w-8 text-[#D32F2F]" />
                </div>
                <h1 className="text-gray-900 mb-2" style={{ fontWeight: 700, fontSize: '1.375rem' }}>
                    Need Immediate Help?
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed">
                    If you&apos;re in danger, call 911 immediately.
                    <br />
                    Use the resources below for support.
                </p>
            </div>

            {/* Primary Actions */}
            <div className="px-5 pt-5">
                <EmergencyPrimaryCTA />
            </div>

            {/* Resource List */}
            <div className="px-5 pt-5 pb-20 flex-1">
                <p className="text-sm text-gray-400 mb-3" style={{ fontWeight: 500 }}>
                    Resources
                </p>
                <EmergencyActionListServer contacts={contacts} tips={tips} />
            </div>
        </div>
    );
}
