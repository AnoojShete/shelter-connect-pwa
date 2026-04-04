import { Request, Response, NextFunction } from 'express';

/**
 * Global error-handling middleware — Practical 10 (Enhanced)
 * Catches any errors thrown in route handlers and returns a consistent JSON response.
 * Includes correlation ID for debugging and sanitizes error messages in production.
 */
export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    const correlationId = (req as any).correlationId || 'unknown';

    console.error(`[${correlationId}] Server Error:`, err.message);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    // In production, never leak internal error details
    const message =
        process.env.NODE_ENV === 'production' && statusCode === 500
            ? 'Internal Server Error'
            : err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        correlationId,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}
