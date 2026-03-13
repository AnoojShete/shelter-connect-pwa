import { Router } from 'express';
import { getEmergencyContacts, getSafetyTips } from '../controllers/emergencyController';

const router = Router();

/**
 * @route   GET /api/emergency/contacts
 * @desc    Get all emergency contacts
 * @access  Public
 */
router.get('/contacts', getEmergencyContacts);

/**
 * @route   GET /api/emergency/tips
 * @desc    Get all safety tips
 * @access  Public
 */
router.get('/tips', getSafetyTips);

export default router;
