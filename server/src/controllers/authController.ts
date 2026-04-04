import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import TokenBlacklist from '../models/TokenBlacklist';
import { AuthRequest } from '../middleware/auth';

/**
 * Auth Controller — Practical 9 (Enhanced)
 * Features:
 * - Short-lived access token (15 min) + long-lived refresh token (7 days)
 * - Refresh token stored in httpOnly secure cookie
 * - Logout with token revocation (blacklist)
 * - Account lockout after 5 failed login attempts (15-min cooldown)
 * - GET /me for profile retrieval
 */

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET || JWT_SECRET + '-refresh';
const ACCESS_EXPIRY = process.env.JWT_EXPIRY || '15m';
const REFRESH_EXPIRY = process.env.REFRESH_EXPIRY || '7d';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Generate a short-lived access token (sent in response body).
 */
function generateAccessToken(user: { _id: string; email: string; role: string }): string {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: ACCESS_EXPIRY } as jwt.SignOptions
    );
}

/**
 * Generate a long-lived refresh token (sent as httpOnly cookie).
 */
function generateRefreshToken(user: { _id: string; email: string; role: string }): string {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        REFRESH_SECRET,
        { expiresIn: REFRESH_EXPIRY } as jwt.SignOptions
    );
}

/**
 * Hash a refresh token before storing in blacklist (security best practice).
 */
function hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Set refresh token as httpOnly cookie.
 */
function setRefreshCookie(res: Response, token: string): void {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: IS_PRODUCTION,      // true in production (HTTPS only)
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/api/auth',           // Only sent to auth endpoints
    });
}

/**
 * Clear refresh token cookie.
 */
function clearRefreshCookie(res: Response): void {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: 'strict',
        path: '/api/auth',
    });
}

/**
 * POST /api/auth/register
 * Register a new user and return an access token + set refresh cookie.
 */
export async function register(req: Request, res: Response): Promise<void> {
    try {
        const { email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'Email already registered' });
            return;
        }

        // Create new user (password is hashed via pre-save hook)
        const user = await User.create({
            email,
            password,
            role: role || 'user',
        });

        const accessToken = generateAccessToken({
            _id: String(user._id),
            email: user.email,
            role: user.role,
        });

        const refreshToken = generateRefreshToken({
            _id: String(user._id),
            email: user.email,
            role: user.role,
        });

        // Set httpOnly cookie for refresh token
        setRefreshCookie(res, refreshToken);

        res.status(201).json({
            success: true,
            data: {
                token: accessToken,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((e: any) => e.message);
            res.status(400).json({ success: false, message: messages.join(', ') });
            return;
        }
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
}

/**
 * POST /api/auth/login
 * Authenticate a user, return access token + set refresh cookie.
 * Implements account lockout after 5 consecutive failures.
 */
export async function login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required' });
            return;
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            // Generic message to prevent user enumeration
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        // Check if account is locked
        if (user.isLocked()) {
            const lockRemaining = Math.ceil(
                ((user.lockUntil as Date).getTime() - Date.now()) / 60000
            );
            res.status(423).json({
                success: false,
                message: `Account is temporarily locked. Try again in ${lockRemaining} minute(s).`,
            });
            return;
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            // Increment failed attempts
            await user.incrementLoginAttempts();
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        // Successful login — reset attempts
        await user.resetLoginAttempts();

        const accessToken = generateAccessToken({
            _id: String(user._id),
            email: user.email,
            role: user.role,
        });

        const refreshToken = generateRefreshToken({
            _id: String(user._id),
            email: user.email,
            role: user.role,
        });

        // Set httpOnly cookie for refresh token
        setRefreshCookie(res, refreshToken);

        res.json({
            success: true,
            data: {
                token: accessToken,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch {
        res.status(500).json({ success: false, message: 'Login failed' });
    }
}

/**
 * POST /api/auth/refresh
 * Verify refresh token from httpOnly cookie and issue a new access token.
 * Also rotates the refresh token (old one is blacklisted).
 */
export async function refreshToken(req: Request, res: Response): Promise<void> {
    try {
        const token = req.cookies?.refreshToken;

        if (!token) {
            res.status(401).json({ success: false, message: 'No refresh token provided' });
            return;
        }

        // Check if token is blacklisted
        const hashedToken = hashToken(token);
        const blacklisted = await TokenBlacklist.findOne({ token: hashedToken });
        if (blacklisted) {
            clearRefreshCookie(res);
            res.status(403).json({ success: false, message: 'Token has been revoked' });
            return;
        }

        // Verify the refresh token
        const decoded = jwt.verify(token, REFRESH_SECRET) as {
            id: string;
            email: string;
            role: string;
            exp: number;
        };

        // Blacklist the old refresh token (token rotation)
        await TokenBlacklist.create({
            token: hashedToken,
            userId: decoded.id,
            reason: 'refresh',
            expiresAt: new Date(decoded.exp * 1000),
        });

        // Issue new tokens
        const newAccessToken = generateAccessToken({
            _id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        });

        const newRefreshToken = generateRefreshToken({
            _id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        });

        setRefreshCookie(res, newRefreshToken);

        res.json({
            success: true,
            data: { token: newAccessToken },
        });
    } catch {
        clearRefreshCookie(res);
        res.status(403).json({ success: false, message: 'Invalid or expired refresh token' });
    }
}

/**
 * POST /api/auth/logout
 * Revoke the refresh token (blacklist it) and clear the cookie.
 */
export async function logoutUser(req: AuthRequest, res: Response): Promise<void> {
    try {
        const token = req.cookies?.refreshToken;

        if (token) {
            // Decode to get expiry, then blacklist
            try {
                const decoded = jwt.verify(token, REFRESH_SECRET) as { id: string; exp: number };
                await TokenBlacklist.create({
                    token: hashToken(token),
                    userId: decoded.id,
                    reason: 'logout',
                    expiresAt: new Date(decoded.exp * 1000),
                });
            } catch {
                // Token might be expired already — that's fine, just clear it
            }
        }

        clearRefreshCookie(res);
        res.json({ success: true, message: 'Logged out successfully' });
    } catch {
        res.status(500).json({ success: false, message: 'Logout failed' });
    }
}

/**
 * GET /api/auth/me
 * Return the current authenticated user's profile.
 */
export async function getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Not authenticated' });
            return;
        }

        const user = await User.findById(req.user.id).select('-password -loginAttempts -lockUntil');
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        res.json({
            success: true,
            data: {
                id: user._id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
        });
    } catch {
        res.status(500).json({ success: false, message: 'Failed to fetch profile' });
    }
}
