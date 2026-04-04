import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Correlation ID Middleware — Practical 10
 * Generates a unique X-Correlation-ID for every incoming request.
 * Attaches it to both the request object and the response headers
 * so it can be used for end-to-end tracing and debugging.
 */
export function correlationId(req: Request, res: Response, next: NextFunction): void {
    const id = (req.headers['x-correlation-id'] as string) || uuidv4();

    // Attach to request for downstream use
    (req as any).correlationId = id;

    // Echo in response headers for client-side debugging
    res.setHeader('X-Correlation-ID', id);

    next();
}
