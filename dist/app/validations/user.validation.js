"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
// Create schema for creating a user
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).trim().min(1, 'Name cannot be empty'),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .trim()
            .toLowerCase()
            .min(1, 'Email cannot be empty')
            .email('Invalid email address'),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be at least 6 characters'),
        role: zod_1.z.enum(['admin', 'user']).optional().default('user'),
        status: zod_1.z.enum(['active', 'inactive']).optional().default('active'),
        photo: zod_1.z.string().url('Invalid URL format').nullable().optional().default(null),
        phone: zod_1.z
            .string()
            .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number format')
            .nullable()
            .optional()
            .default(null),
        address: zod_1.z.string().nullable().optional().default(null),
    }),
});
// Create schema for updating a user (partial)
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(1, 'Name cannot be empty').optional(),
        email: zod_1.z.string().trim().toLowerCase().email('Invalid email address').optional(),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters').optional(),
        role: zod_1.z.enum(['admin', 'user']).optional(),
        status: zod_1.z.enum(['active', 'inactive']).optional(),
        photo: zod_1.z.string().url('Invalid URL format').nullable().optional(),
        phone: zod_1.z
            .string()
            .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number format')
            .nullable()
            .optional(),
        address: zod_1.z.string().nullable().optional(),
    }),
});
// Schema for validating just the user ID param (used in GET / PATCH / DELETE)
const getUserValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'User ID is required'),
    }),
});
// Export all together
exports.UserValidation = {
    userValidationSchema,
    updateUserValidationSchema,
    getUserValidationSchema,
};
