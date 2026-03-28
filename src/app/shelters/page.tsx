import { getAllShelters } from '@/lib/shelters';
import SheltersPageClient from './page.client';

/**
 * Shelters listing — Server Component (SSR).
 * Data is fetched on the server at request time and passed to the Client Component.
 */
export default async function SheltersPage() {
    const shelters = await getAllShelters();

    return <SheltersPageClient shelters={shelters} />;
}
