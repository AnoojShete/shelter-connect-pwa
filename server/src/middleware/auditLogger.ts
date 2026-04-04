import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import AuditLog from '../models/AuditLog';

/**
 * Audit Logger Middleware — Practical 10
 * Logs all mutating requests (POST, PUT, DELETE) and auth-related GETs.
 * Captures: user info, action, resource, status code, IP, correlation ID.
 */

// Map method + route pattern to a human-readable action
function resolveAction(method: string, path: string): string {
    const upper = method.toUpperCase();
    if (path.includes('/auth/login')) return 'LOGIN';
    if (path.includes('/auth/register')) return 'REGISTER';
    if (path.includes('/auth/logout')) return 'LOGOUT';
    if (path.includes('/auth/refresh')) return 'TOKEN_REFRESH';
    if (path.includes('/auth/me')) return 'VIEW_PROFILE';
    if (path.includes('/shelters')) {
        if (upper === 'POST') return 'CREATE_SHELTER';
        if (upper === 'PUT') return 'UPDATE_SHELTER';
        if (upper === 'DELETE') return 'DELETE_SHELTER';
    }
    return `${upper}_${path.replace(/[^a-zA-Z]/g, '_').toUpperCase()}`;
}

export function auditLogger(req: AuthRequest, res: Response, next: NextFunction): void {
    // Only log mutating requests + auth endpoints
    const shouldLog =
        ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method.toUpperCase()) ||
        req.path.includes('/auth/');

    if (!shouldLog) {
        next();
        return;
    }

    // Capture the original res.json to intercept the status code
    const originalJson = res.json.bind(res);
    res.json = function (body: any) {
        // Fire-and-forget: write audit log after response
        const logEntry = {
            correlationId: (req as any).correlationId || 'unknown',
            timestamp: new Date(),
            userId: req.user?.id,
            userEmail: req.user?.email,
            action: resolveAction(req.method, req.originalUrl),
            resource: req.originalUrl,
            method: req.method.toUpperCase(),
            statusCode: res.statusCode,
            ip: req.ip || req.socket.remoteAddress || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown',
            details: res.statusCode >= 400 ? (body?.message || '') : undefined,
        };

        AuditLog.create(logEntry).catch((err) => {
            console.error('Audit log write failed:', err.message);
        });

        return originalJson(body);
    };

    next();
}
