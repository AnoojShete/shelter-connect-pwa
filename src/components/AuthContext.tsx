'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

/**
 * AuthContext — Practical 9 (Frontend)
 * Provides global auth state (user, token, isAuthenticated) across all components.
 * Handles login, register, logout, and automatic token refresh.
 */

const API_BASE = 'http://localhost:5000/api';

interface User {
    id: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    register: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    refreshAccessToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    // Try to refresh the access token from the httpOnly cookie
    const refreshAccessToken = useCallback(async (): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE}/auth/refresh`, {
                method: 'POST',
                credentials: 'include', // Send httpOnly cookie
            });
            const data = await res.json();
            if (data.success && data.data?.token) {
                setToken(data.data.token);
                localStorage.setItem('token', data.data.token);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }, []);

    // Login
    const login = useCallback(async (email: string, password: string) => {
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Receive httpOnly cookie
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (data.success && data.data) {
                setToken(data.data.token);
                setUser(data.data.user);
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                return { success: true };
            }
            return { success: false, message: data.message || 'Login failed' };
        } catch {
            return { success: false, message: 'Network error. Is the API server running?' };
        }
    }, []);

    // Register
    const register = useCallback(async (email: string, password: string) => {
        try {
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (data.success && data.data) {
                setToken(data.data.token);
                setUser(data.data.user);
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                return { success: true };
            }
            return { success: false, message: data.message || 'Registration failed' };
        } catch {
            return { success: false, message: 'Network error. Is the API server running?' };
        }
    }, []);

    // Logout
    const logout = useCallback(async () => {
        try {
            await fetch(`${API_BASE}/auth/logout`, {
                method: 'POST',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                credentials: 'include',
            });
        } catch {
            // Silent fail — still clear local state
        }
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }, [token]);

    // Auto-refresh token before expiry (every 12 minutes for 15-min tokens)
    useEffect(() => {
        if (!token) return;

        const interval = setInterval(() => {
            refreshAccessToken();
        }, 12 * 60 * 1000); // 12 minutes

        return () => clearInterval(interval);
    }, [token, refreshAccessToken]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token && !!user,
                isLoading,
                login,
                register,
                logout,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
