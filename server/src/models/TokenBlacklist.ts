import mongoose, { Schema, Document } from 'mongoose';

/**
 * TokenBlacklist Model — Practical 9
 * Stores revoked refresh tokens for logout / token revocation.
 * Uses a TTL index so expired entries are automatically removed by MongoDB.
 */
export interface ITokenBlacklist extends Document {
    token: string;       // The refresh token (hashed)
    userId: string;
    reason: string;      // 'logout' | 'refresh' | 'security'
    expiresAt: Date;
}

const TokenBlacklistSchema = new Schema<ITokenBlacklist>(
    {
        token: { type: String, required: true, unique: true, index: true },
        userId: { type: String, required: true, index: true },
        reason: {
            type: String,
            enum: ['logout', 'refresh', 'security'],
            default: 'logout',
        },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

// TTL index: MongoDB automatically deletes documents after expiresAt
TokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<ITokenBlacklist>('TokenBlacklist', TokenBlacklistSchema);
