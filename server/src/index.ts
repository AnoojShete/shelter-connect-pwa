import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import shelterRoutes from './routes/shelters';
import emergencyRoutes from './routes/emergency';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';
import { correlationId } from './middleware/correlationId';
import { auditLogger } from './middleware/auditLogger';

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Startup Validation ────────────────────────────────────
// Fail fast if critical environment variables are missing
const REQUIRED_ENV = ['JWT_SECRET'];
for (const key of REQUIRED_ENV) {
    if (!process.env[key]) {
        console.error(`❌ FATAL: Missing required environment variable: ${key}`);
        console.error(`   Copy .env.example to .env and set all required values.`);
        process.exit(1);
    }
}

// ─── Security Middleware ────────────────────────────────────
app.use(helmet({
    hsts: {
        maxAge: 31536000,     // 1 year
        includeSubDomains: true,
        preload: true,
    },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
        },
    },
}));

// CORS — restrict to frontend origin only
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,   // Allow cookies
    })
);

// ─── Request Processing Middleware ──────────────────────────
app.use(correlationId);                        // Attach correlation ID first
app.use(express.json({ limit: '10kb' }));      // Body parser with size limit
app.use(cookieParser());                       // Parse cookies (for refresh tokens)
app.use(morgan('dev'));                         // Request logging

// Rate limiting — max 100 requests per 15 minutes per IP (global)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// ─── Audit Logger ───────────────────────────────────────────
app.use('/api/', auditLogger as any);          // Log all mutating API requests

// ─── API Routes ─────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/shelters', shelterRoutes);
app.use('/api/emergency', emergencyRoutes);

// ─── Health Check ───────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        correlationId: (req as any).correlationId,
    });
});

// ─── Global Error Handler ───────────────────────────────────
app.use(errorHandler);

// ─── Connect to DB and Start Server ─────────────────────────
async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`\n🚀 ShelterConnect API server running on http://localhost:${PORT}`);
        console.log(`   Security: helmet ✓ | HSTS ✓ | rate-limit ✓ | CORS locked ✓ | morgan ✓`);
        console.log(`   Middleware: correlation-id ✓ | audit-logger ✓ | cookie-parser ✓`);
        console.log(`   Endpoints:`);
        console.log(`     POST /api/auth/register    (public, rate-limited)`);
        console.log(`     POST /api/auth/login       (public, rate-limited)`);
        console.log(`     POST /api/auth/refresh     (cookie-based)`);
        console.log(`     POST /api/auth/logout      (protected)`);
        console.log(`     GET  /api/auth/me          (protected)`);
        console.log(`     GET  /api/shelters`);
        console.log(`     GET  /api/shelters/:id`);
        console.log(`     POST /api/shelters          (admin)`);
        console.log(`     PUT  /api/shelters/:id       (admin)`);
        console.log(`     DELETE /api/shelters/:id     (admin)`);
        console.log(`     GET  /api/emergency/contacts`);
        console.log(`     GET  /api/emergency/tips`);
        console.log(`     GET  /api/health`);
    });
}

startServer();
