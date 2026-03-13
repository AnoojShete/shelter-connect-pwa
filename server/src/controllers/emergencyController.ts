import { Request, Response } from 'express';
import EmergencyContact from '../models/EmergencyContact';
import SafetyTip from '../models/SafetyTip';

/**
 * GET /api/emergency/contacts
 * Returns all emergency contacts from MongoDB.
 */
export async function getEmergencyContacts(_req: Request, res: Response): Promise<void> {
    try {
        const contacts = await EmergencyContact.find({}).lean();
        res.json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch emergency contacts' });
    }
}

/**
 * GET /api/emergency/tips
 * Returns all safety tips from MongoDB.
 */
export async function getSafetyTips(_req: Request, res: Response): Promise<void> {
    try {
        const tips = await SafetyTip.find({}).lean();
        res.json({ success: true, count: tips.length, data: tips });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch safety tips' });
    }
}
