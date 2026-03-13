import { notFound } from 'next/navigation';
import { getShelterById, getAllShelters } from '@/lib/shelters';
import ShelterDetailClient from './page.client';
import type { Metadata } from 'next';

interface ShelterDetailPageProps {
    params: Promise<{ id: string }>;
}

/**
 * Generates dynamic metadata (page title) based on the shelter name.
 */
export async function generateMetadata({
    params,
}: ShelterDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const shelter = await getShelterById(id);

    if (!shelter) {
        return { title: 'Shelter Not Found — ShelterConnect' };
    }

    return {
        title: `${shelter.name} — ShelterConnect`,
        description: shelter.description,
    };
}

/**
 * Shelter detail — Server Component (SSR).
 * Data is fetched on the server at request time using the dynamic [id] param.
 */
export default async function ShelterDetailPage({
    params,
}: ShelterDetailPageProps) {
    const { id } = await params;
    const shelter = await getShelterById(id);

    if (!shelter) {
        notFound();
    }

    return <ShelterDetailClient shelter={shelter} />;
}
