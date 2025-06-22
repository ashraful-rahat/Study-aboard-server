import { z } from 'zod';

// Helper to validate a MongoDB ObjectId (24 hex characters)
const objectIdValidator = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ObjectId',
});

const createUniversitySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    location: z.string().min(1, 'Location is required'),
    destinationId: objectIdValidator,
    establishedYear: z
      .string()
      .optional()
      .transform((val) => {
        if (val === undefined) return undefined;
        const num = Number(val);
        if (isNaN(num)) {
          throw new Error('Invalid number format for establishedYear'); // Or handle with .pipe()
        }
        return num;
      }),
    website: z.string().url().optional(),
    photo: z.string().url().optional(), // ✅ added image validation
  }),
});

const getSingleSchema = z.object({
  params: z.object({
    id: objectIdValidator,
  }),
});

const updateUniversitySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    destinationId: objectIdValidator.optional(),
    establishedYear: z.number().optional(),
    website: z.string().url().optional(),
    photo: z.string().url().optional(), // ✅ added image validation
  }),
  params: z.object({
    id: objectIdValidator,
  }),
});

export const UniversityValidation = {
  createUniversitySchema,
  getSingleSchema,
  updateUniversitySchema,
};
