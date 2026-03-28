import mongoose from 'mongoose';

/**
 * Connect to MongoDB.
 * Uses the MONGODB_URI environment variable.
 */
export async function connectDB(): Promise<void> {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shelterconnect';

    try {
        await mongoose.connect(uri);
        console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}
