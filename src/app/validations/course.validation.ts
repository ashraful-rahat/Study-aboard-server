import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ObjectId',
});

const createCourseSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    duration: z.string().min(1),
    universityId: objectId,
    tuitionFee: z.number().optional(),
    image: z.string().url().optional(),
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
    tuitionFee: z.number().optional(),
    photo: z.string().url().optional(),
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
