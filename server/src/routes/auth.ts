import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { register, login, refreshToken, logoutUser, getProfile } from '../controllers/authController';
import { validateRegister, validateLogin } from '../middleware/validate';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * Auth-specific rate limiter — Practical 9
 * Stricter limits on login/register to prevent brute-force attacks.
 * 5 requests per 15 minutes per IP.
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 5,
    message: {
        success: false,
        message: 'Too many authentication attempts. Please try again after 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public (rate limited)
 */
router.post('/register', authLimiter, validateRegister, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login and get JWT access token + refresh cookie
 * @access  Public (rate limited)
 */
router.post('/login', authLimiter, validateLogin, login);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token using httpOnly cookie
 * @access  Public (uses cookie)
 */
router.post('/refresh', refreshToken);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout and revoke refresh token
 * @access  Private (requires valid access token)
 */
router.post('/logout', authenticateToken, logoutUser);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private (requires valid access token)
 */
router.get('/me', authenticateToken, getProfile);

export default router;
