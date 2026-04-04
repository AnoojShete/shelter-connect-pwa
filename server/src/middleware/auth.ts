import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Auth Middleware — Practical 9 (Enhanced)
 * - Requires JWT_SECRET from environment (no hardcoded fallback)
 * - Verifies Bearer token from Authorization header
 * - Role-based authorization middleware
 */

// SECURITY: Require env var — no fallback
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error('❌ FATAL: JWT_SECRET environment variable is not set.');
    console.error('   Set JWT_SECRET in server/.env before starting the server.');
    process.exit(1);
}

/**
 * Extended Request interface to include user from JWT.
 */
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

/**
 * Middleware: Verify JWT token from Authorization header.
 * Attaches decoded user to req.user.
 */
export function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET!) as {
            id: string;
            email: string;
            role: string;
        };
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
}

/**
 * Middleware: Authorize by role.
 * Must be used after authenticateToken.
 */
export function authorizeRole(...roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions.',
            });
            return;
        }
        next();
    };
}
