// validations/course.validation.ts
import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createCourseSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    duration: z.string().min(1, 'Duration is required'),
    universityName: z.string().min(1, 'University name is required'),
    universityId: z.string().regex(objectIdRegex, 'Invalid ObjectId'),
    tuitionFee: z.coerce.number().min(0, 'Tuition fee must be a positive number'),
    photo: z.string().url().optional(),
    programType: z.enum(['Bachelor', 'Master', 'Diploma']).optional(),
    category: z.string().optional(),
    subject: z.string().optional(),
  }),
});

const updateCourseSchema = z.object({
  params: z.object({
    id: z.string().regex(objectIdRegex, 'Invalid ObjectId'),
  }),
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    duration: z.string().optional(),
    universityName: z.string().optional(),
    universityId: z.string().regex(objectIdRegex, 'Invalid ObjectId').optional(),
    tuitionFee: z.coerce.number().optional(),
    photo: z.string().url().optional(),
    programType: z.enum(['Bachelor', 'Master', 'Diploma']).optional(),
    category: z.string().optional(),
    subject: z.string().optional(),
  }),
});

const getCourseSchema = z.object({
  params: z.object({
    id: z.string().regex(objectIdRegex, 'Invalid ObjectId'),
  }),
});

export const CourseValidation = {
  createCourseSchema,
  updateCourseSchema,
  getCourseSchema,
};
