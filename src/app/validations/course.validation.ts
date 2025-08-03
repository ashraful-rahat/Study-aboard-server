import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ObjectId',
});

const createCourseSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    duration: z.string().min(1), // now string (e.g., "2 Years")
    universityId: objectId,
    tuitionFee: z.coerce.number().min(0, 'Tuition fee must be >= 0'),
    subject: z.string().optional(),
    photo: z.string().url().optional(),
    programType: z.string().optional(),
    category: z.string().optional(),
  }),
});

const updateCourseSchema = z.object({
  params: z.object({
    id: objectId,
  }),
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    duration: z.string().optional(),
    universityId: objectId.optional(),
    tuitionFee: z
      .union([z.number(), z.string().regex(/^\d+(\.\d+)?$/)])
      .optional()
      .transform((val) => (typeof val === 'string' ? parseFloat(val) : val)),
    subject: z.string().optional(),
    photo: z.string().url().optional().nullable(),
    programType: z.string().optional(),
    category: z.string().optional(),
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
