/**
 * Server-side data service layer.
 * These async functions fetch data from the Express API server (Practical 7+).
 * They fall back to local seed data if the API server is not running.
 */

import type { Shelter } from '@/data/shelters';
import {
    shelterSeedData,
    emergencyContactsSeedData,
    safetyTipsSeedData,
} from '@/data/shelters';

const API_BASE = process.env.API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch helper with fallback.
 * Attempts to fetch from the Express API; falls back to local data on failure.
 */
async function fetchFromAPI<T>(endpoint: string, fallback: T): Promise<T> {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            cache: 'no-store', // Always fetch fresh data (dynamic SSR)
        });
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const json = await res.json();
        return json.data as T;
    } catch {
        console.warn(`⚠ API fetch failed for ${endpoint}, using local fallback data`);
        return fallback;
    }
}

/** Fetch all shelters (server-side) */
export async function getAllShelters(): Promise<Shelter[]> {
    return fetchFromAPI<Shelter[]>('/shelters', shelterSeedData);
}

/** Fetch a single shelter by ID (server-side) */
export async function getShelterById(
    id: string
): Promise<Shelter | undefined> {
    try {
        const res = await fetch(`${API_BASE}/shelters/${id}`, {
            cache: 'no-store',
        });
        if (!res.ok) {
            if (res.status === 404) return undefined;
            throw new Error(`API returned ${res.status}`);
        }
        const json = await res.json();
        return json.data as Shelter;
    } catch {
        console.warn(`⚠ API fetch failed for /shelters/${id}, using local fallback`);
        return shelterSeedData.find((s) => s.id === id);
    }
}

/** Fetch all emergency contacts (server-side) */
export async function getEmergencyContacts() {
    return fetchFromAPI('/emergency/contacts', emergencyContactsSeedData);
}

/** Fetch all safety tips (server-side) */
export async function getSafetyTips() {
    return fetchFromAPI('/emergency/tips', safetyTipsSeedData);
}
