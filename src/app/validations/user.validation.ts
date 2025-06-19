import { z } from 'zod';

// Create schema for creating a user
const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim().min(1, 'Name cannot be empty'),

    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .toLowerCase()
      .min(1, 'Email cannot be empty')
      .email('Invalid email address'),

    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),

    role: z.enum(['admin', 'user']).optional().default('user'),
    status: z.enum(['active', 'inactive']).optional().default('active'),

    photo: z.string().url('Invalid URL format').nullable().optional().default(null),
    phone: z
      .string()
      .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number format')
      .nullable()
      .optional()
      .default(null),

    address: z.string().nullable().optional().default(null),
  }),
});

// Create schema for updating a user (partial)
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name cannot be empty').optional(),
    email: z.string().trim().toLowerCase().email('Invalid email address').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    role: z.enum(['admin', 'user']).optional(),
    status: z.enum(['active', 'inactive']).optional(),
    photo: z.string().url('Invalid URL format').nullable().optional(),
    phone: z
      .string()
      .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number format')
      .nullable()
      .optional(),
    address: z.string().nullable().optional(),
  }),
});

// Schema for validating just the user ID param (used in GET / PATCH / DELETE)
const getUserValidationSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'User ID is required'),
  }),
});

// Export all together
export const UserValidation = {
  userValidationSchema,
  updateUserValidationSchema,
  getUserValidationSchema,
};

// Optional types
export type UserInput = z.infer<typeof userValidationSchema>['body'];
export type UserUpdateInput = z.infer<typeof updateUserValidationSchema>['body'];
