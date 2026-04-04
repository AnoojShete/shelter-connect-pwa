import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { AuthProvider } from '@/components/AuthContext';
import './globals.css';

export const metadata: Metadata = {
    title: 'ShelterConnect - Find Nearby Shelters',
    description: 'Mobile-first PWA to find nearby shelters, emergency help, and community resources.',
    keywords: ['shelter', 'homeless', 'emergency', 'help', 'community', 'housing'],
    authors: [{ name: 'ShelterConnect Team' }],
    openGraph: {
        title: 'ShelterConnect - Find Nearby Shelters',
        description: 'Mobile-first PWA to find nearby shelters, emergency help, and community resources.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl relative">
                        <Header />
                        <main>
                            {children}
                        </main>
                        <BottomNav />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
