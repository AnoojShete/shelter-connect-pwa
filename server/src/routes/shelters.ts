import { Router } from 'express';
import { getAllShelters, getShelterById, createShelter, updateShelter, deleteShelter } from '../controllers/shelterController';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import { validateShelter } from '../middleware/validate';

const router = Router();

/**
 * @route   GET /api/shelters
 * @desc    Get all shelters
 * @access  Public
 */
router.get('/', getAllShelters);

/**
 * @route   GET /api/shelters/:id
 * @desc    Get a single shelter by ID
 * @access  Public
 */
router.get('/:id', getShelterById);

/**
 * @route   POST /api/shelters
 * @desc    Create a new shelter
 * @access  Private (Admin only)
 */
router.post('/', authenticateToken, authorizeRole('admin'), validateShelter, createShelter);

/**
 * @route   PUT /api/shelters/:id
 * @desc    Update a shelter
 * @access  Private (Admin only)
 */
router.put('/:id', authenticateToken, authorizeRole('admin'), updateShelter);

/**
 * @route   DELETE /api/shelters/:id
 * @desc    Delete a shelter
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteShelter);

export default router;
