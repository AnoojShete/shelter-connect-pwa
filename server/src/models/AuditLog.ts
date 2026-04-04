import mongoose, { Schema, Document } from 'mongoose';

/**
 * AuditLog Model — Practical 10
 * Records security-relevant actions: logins, logouts, CRUD on shelters, etc.
 * TTL index auto-purges logs older than 90 days.
 */
export interface IAuditLog extends Document {
    correlationId: string;
    timestamp: Date;
    userId?: string;
    userEmail?: string;
    action: string;          // 'LOGIN' | 'LOGOUT' | 'REGISTER' | 'CREATE_SHELTER' | etc.
    resource: string;        // '/api/auth/login' etc.
    method: string;          // 'POST' | 'PUT' | 'DELETE'
    statusCode: number;
    ip: string;
    userAgent: string;
    details?: string;        // Additional context
}

const AuditLogSchema = new Schema<IAuditLog>(
    {
        correlationId: { type: String, required: true, index: true },
        timestamp: { type: Date, default: Date.now, index: true },
        userId: { type: String, index: true },
        userEmail: { type: String },
        action: { type: String, required: true, index: true },
        resource: { type: String, required: true },
        method: { type: String, required: true },
        statusCode: { type: Number, required: true },
        ip: { type: String, required: true },
        userAgent: { type: String },
        details: { type: String },
    },
    { timestamps: false }
);

// Auto-remove logs after 90 days
AuditLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
