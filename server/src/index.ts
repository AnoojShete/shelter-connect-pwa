import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { connectDB } from './config/db';
import shelterRoutes from './routes/shelters';
import emergencyRoutes from './routes/emergency';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security Middleware ────────────────────────────────────
app.use(helmet()); // Set security HTTP headers

// CORS — restrict to frontend origin only
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
    })
);

// Rate limiting — max 100 requests per 15 minutes per IP
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

// ─── General Middleware ─────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // Body parser with size limit
app.use(morgan('dev')); // Request logging

// ─── API Routes ─────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/shelters', shelterRoutes);
app.use('/api/emergency', emergencyRoutes);

// ─── Health Check ───────────────────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Global Error Handler ───────────────────────────────────
app.use(errorHandler);

// ─── Connect to DB and Start Server ─────────────────────────
async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 ShelterConnect API server running on http://localhost:${PORT}`);
        console.log(`   Security: helmet ✓ | rate-limit ✓ | CORS locked ✓ | morgan ✓`);
        console.log(`   Endpoints:`);
        console.log(`     POST /api/auth/register`);
        console.log(`     POST /api/auth/login`);
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
