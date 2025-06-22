import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ObjectId',
});

const createCourseSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    // FIX: Expect string from form-data, coerce to number
    duration: z.coerce.number().min(1, 'Duration must be at least 1'), // Assuming duration is a number (e.g., years)
    universityId: objectId,
    // FIX: Expect string from form-data, coerce to number
    tuitionFee: z.coerce.number().optional(), // Can still be optional, but will coerce if present
    image: z.string().url().optional(), // If you're sending a URL for an existing image
  }),
});

const updateCourseSchema = z.object({
  params: z.object({
    id: objectId,
  }),
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    // FIX: Expect string from form-data, coerce to number
    duration: z.coerce.number().optional(), // Make optional and coerce
    universityId: objectId.optional(),
    // FIX: Expect string from form-data, coerce to number
    tuitionFee: z.coerce.number().optional(), // Make optional and coerce
    photo: z.string().url().optional(), // Assuming 'photo' for update
  }),
});

const getCourseSchema = z.object({
  params: z.object({
    id: objectId,
  }),
});

export const CourseValidation = {
  createCourseSchema,
  updateCourseSchema,
  getCourseSchema,
};
