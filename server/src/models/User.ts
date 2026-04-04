import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Model — Practical 9 (Enhanced)
 * Features: bcrypt hashing (salt 12), account lockout after 5 failed attempts,
 * role-based access control (user/admin).
 */
export interface IUser extends Document {
    email: string;
    password: string;
    role: 'user' | 'admin';
    loginAttempts: number;
    lockUntil: Date | null;
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    isLocked(): boolean;
    incrementLoginAttempts(): Promise<void>;
    resetLoginAttempts(): Promise<void>;
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000; // 15 minutes

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        loginAttempts: {
            type: Number,
            default: 0,
        },
        lockUntil: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

// Index for quick lookups
UserSchema.index({ email: 1 });

/**
 * Pre-save hook: hash the password before saving to DB.
 * Uses salt rounds of 12 for stronger hashing.
 */
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Instance method: compare a candidate password with the hashed password.
 */
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Instance method: check if account is currently locked.
 */
UserSchema.methods.isLocked = function (): boolean {
    if (this.lockUntil && this.lockUntil > new Date()) {
        return true;
    }
    return false;
};

/**
 * Instance method: increment failed login attempts.
 * Locks the account after MAX_LOGIN_ATTEMPTS consecutive failures.
 */
UserSchema.methods.incrementLoginAttempts = async function (): Promise<void> {
    // If there was a previous lock that has expired, reset attempts
    if (this.lockUntil && this.lockUntil <= new Date()) {
        this.loginAttempts = 1;
        this.lockUntil = null;
    } else {
        this.loginAttempts += 1;
        // Lock the account if max attempts exceeded
        if (this.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            this.lockUntil = new Date(Date.now() + LOCK_TIME_MS);
        }
    }
    await this.save();
};

/**
 * Instance method: reset login attempts on successful login.
 */
UserSchema.methods.resetLoginAttempts = async function (): Promise<void> {
    this.loginAttempts = 0;
    this.lockUntil = null;
    await this.save();
};

export default mongoose.model<IUser>('User', UserSchema);
