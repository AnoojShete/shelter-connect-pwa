/**
 * Database seed script.
 * Populates MongoDB with initial shelter, emergency contact, and safety tip data.
 *
 * Usage: npx ts-node src/scripts/seed.ts
 */

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Shelter from '../models/Shelter';
import EmergencyContact from '../models/EmergencyContact';
import SafetyTip from '../models/SafetyTip';
import { shelters, emergencyContacts, safetyTips } from '../data/seed';

async function seed() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shelterconnect';

    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Shelter.deleteMany({});
        await EmergencyContact.deleteMany({});
        await SafetyTip.deleteMany({});
        console.log('🗑  Cleared existing collections');

        // Insert seed data
        await Shelter.insertMany(shelters);
        console.log(`📦 Seeded ${shelters.length} shelters`);

        await EmergencyContact.insertMany(emergencyContacts);
        console.log(`📦 Seeded ${emergencyContacts.length} emergency contacts`);

        await SafetyTip.insertMany(safetyTips);
        console.log(`📦 Seeded ${safetyTips.length} safety tips`);

        console.log('\n✨ Database seeded successfully!');
    } catch (error) {
        console.error('❌ Seed error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Disconnected from MongoDB');
    }
}

seed();
