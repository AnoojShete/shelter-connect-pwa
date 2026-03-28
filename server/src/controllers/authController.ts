import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'shelterconnect-secret-key-change-in-production';

/**
 * Generate a JWT token for a user.
 */
function generateToken(user: { _id: string; email: string; role: string }): string {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
}

/**
 * POST /api/auth/register
 * Register a new user and return a JWT token.
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

        const token = generateToken({
            _id: String(user._id),
            email: user.email,
            role: user.role,
        });


        res.status(201).json({
            success: true,
            data: {
                token,
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
 * Authenticate a user and return a JWT token.
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
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        const token = generateToken({
            _id: String(user._id),
            email: user.email,
            role: user.role,
        });


        res.json({
            success: true,
            data: {
                token,
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
