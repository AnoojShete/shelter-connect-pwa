import { getAllShelters } from '@/lib/shelters';
import HomePageClient from './page.client';

/**
 * Homepage — Server Component (SSR).
 * Data is fetched on the server at request time and passed to the Client Component.
 */
export default async function HomePage() {
    const shelters = await getAllShelters();
    const openCount = shelters.filter((s) => s.isOpen).length;

    return <HomePageClient shelters={shelters} openCount={openCount} />;
}
