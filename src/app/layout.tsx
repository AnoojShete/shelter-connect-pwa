import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import './globals.css';

export const metadata: Metadata = {
    title: 'ShelterConnect - Find Nearby Shelters',
    description: 'Mobile-first PWA to find nearby shelters, emergency help, and community resources.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl relative">
                    <Header />
                    <main>
                        {children}
                    </main>
                    <BottomNav />
                </div>
            </body>
        </html>
    );
}
