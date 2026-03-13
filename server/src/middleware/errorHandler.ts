import { Request, Response, NextFunction } from 'express';

/**
 * Global error-handling middleware.
 * Catches any errors thrown in route handlers and returns a consistent JSON response.
 */
export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    console.error('Server Error:', err.message);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}
