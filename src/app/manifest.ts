import type { MetadataRoute } from 'next';

/**
 * PWA Web App Manifest.
 * Enables "Add to Home Screen" and native-like app experience.
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'ShelterConnect',
        short_name: 'ShelterConnect',
        description: 'Find nearby shelters, emergency help, and community resources.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0F52BA',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
