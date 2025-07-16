// validations/course.validation.ts
import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ObjectId',
});

const createCourseSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),

    duration: z.coerce.number().min(1, 'Duration must be at least 1'),
    universityId: objectId,

    tuitionFee: z.coerce.number().optional(),
    photo: z.string().url().optional(),

    programType: z.enum(['Bachelor', 'Master', 'Diploma']).optional(),
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

    duration: z.coerce.number().optional(),
    universityId: objectId.optional(),

    tuitionFee: z.coerce.number().optional(),
    photo: z.string().url().optional(),

    programType: z.enum(['Bachelor', 'Master', 'Diploma']).optional(),
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
