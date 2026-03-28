/**
 * Client-side authentication helpers.
 * Handles login, register, token storage, and auth state.
 */

const API_BASE = 'http://localhost:5000/api';

interface AuthResponse {
    success: boolean;
    data?: {
        token: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    };
    message?: string;
}

/**
 * Register a new user.
 */
export async function register(
    email: string,
    password: string
): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}

/**
 * Login and store the JWT token.
 */
export async function login(
    email: string,
    password: string
): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data: AuthResponse = await res.json();

    if (data.success && data.data?.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
    }

    return data;
}

/**
 * Logout — clear stored auth data.
 */
export function logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

/**
 * Get the stored JWT token.
 */
export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

/**
 * Check if a user is currently authenticated.
 */
export function isAuthenticated(): boolean {
    return !!getToken();
}

/**
 * Get the current user info.
 */
export function getCurrentUser(): { id: string; email: string; role: string } | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}
