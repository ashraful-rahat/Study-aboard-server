import { z } from 'zod';

const createUniversitySchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    location: z.string().min(1),
    destinationId: z.string().min(1), // should be a valid ObjectId
    establishedYear: z.number().optional(),
    website: z.string().url().optional(),
  }),
});

const getSingleSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

const updateUniversitySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    destinationId: z.string().optional(),
    establishedYear: z.number().optional(),
    website: z.string().url().optional(),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
});

export const UniversityValidation = {
  createUniversitySchema,
  getSingleSchema,
  updateUniversitySchema,
};
