import { z } from 'zod';

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
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => {
        if (val === undefined || val === '') return undefined;
        const num = Number(val);
        if (isNaN(num)) {
          throw new Error('Invalid number format for establishedYear');
        }
        return num;
      }),
    website: z.string().url().optional(),
    photo: z.string().url().optional(),
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
    establishedYear: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => {
        if (val === undefined || val === '') return undefined;
        const num = Number(val);
        if (isNaN(num)) {
          throw new Error('Invalid number format for establishedYear');
        }
        return num;
      }),
    website: z.string().url().optional(),
    photo: z.string().url().optional(),
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
