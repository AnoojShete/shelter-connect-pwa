import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware: check validation results and return errors if any.
 */
export function handleValidationErrors(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array(),
        });
        return;
    }
    next();
}

/**
 * Validation rules for user registration.
 */
export const validateRegister = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .trim(),
    handleValidationErrors,
];

/**
 * Validation rules for user login.
 */
export const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .trim(),
    handleValidationErrors,
];

/**
 * Validation rules for creating/updating a shelter.
 */
export const validateShelter = [
    body('id')
        .notEmpty()
        .withMessage('Shelter ID is required')
        .trim(),
    body('name')
        .notEmpty()
        .withMessage('Shelter name is required')
        .trim()
        .escape(),
    body('address')
        .notEmpty()
        .withMessage('Address is required')
        .trim()
        .escape(),
    body('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .trim(),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .trim()
        .escape(),
    handleValidationErrors,
];
