import { Response } from 'express';
import Shelter from '../models/Shelter';
import { AuthRequest } from '../middleware/auth';

/**
 * GET /api/shelters
 * Returns all shelters from MongoDB.
 */
export async function getAllShelters(_req: AuthRequest, res: Response): Promise<void> {
    try {
        const shelters = await Shelter.find({}).lean();
        res.json({ success: true, count: shelters.length, data: shelters });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch shelters' });
    }
}

/**
 * GET /api/shelters/:id
 * Returns a single shelter by its custom ID field.
 */
export async function getShelterById(req: AuthRequest, res: Response): Promise<void> {
    try {
        const shelter = await Shelter.findOne({ id: req.params.id }).lean();

        if (!shelter) {
            res.status(404).json({ success: false, message: 'Shelter not found' });
            return;
        }

        res.json({ success: true, data: shelter });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch shelter' });
    }
}

/**
 * POST /api/shelters
 * Create a new shelter. Admin only.
 */
export async function createShelter(req: AuthRequest, res: Response): Promise<void> {
    try {
        const shelter = await Shelter.create(req.body);
        res.status(201).json({ success: true, data: shelter });
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: 'Shelter with this ID already exists' });
            return;
        }
        res.status(500).json({ success: false, message: 'Failed to create shelter' });
    }
}

/**
 * PUT /api/shelters/:id
 * Update a shelter by ID. Admin only.
 */
export async function updateShelter(req: AuthRequest, res: Response): Promise<void> {
    try {
        const shelter = await Shelter.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        ).lean();

        if (!shelter) {
            res.status(404).json({ success: false, message: 'Shelter not found' });
            return;
        }

        res.json({ success: true, data: shelter });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update shelter' });
    }
}

/**
 * DELETE /api/shelters/:id
 * Delete a shelter by ID. Admin only.
 */
export async function deleteShelter(req: AuthRequest, res: Response): Promise<void> {
    try {
        const shelter = await Shelter.findOneAndDelete({ id: req.params.id });

        if (!shelter) {
            res.status(404).json({ success: false, message: 'Shelter not found' });
            return;
        }

        res.json({ success: true, message: 'Shelter deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete shelter' });
    }
}
