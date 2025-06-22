import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId' });

const createApplicationSchema = z.object({
  body: z.object({
    user: objectId,
    course: objectId,
    university: objectId,
    documents: z.string().url().optional(),
    photo: z.string().url().optional(),
    status: z.enum(['pending', 'approved', 'rejected']).optional(),
    remarks: z.string().optional(),
  }),
});

const updateApplicationSchema = z.object({
  params: z.object({
    id: objectId,
  }),
  body: z.object({
    user: objectId.optional(),
    course: objectId.optional(),
    university: objectId.optional(),
    documents: z.string().url().optional(),
    photo: z.string().url().optional(),
    status: z.enum(['pending', 'approved', 'rejected']).optional(),
    remarks: z.string().optional(),
  }),
});

const getApplicationSchema = z.object({
  params: z.object({
    id: objectId,
  }),
});

export const ApplicationValidation = {
  createApplicationSchema,
  updateApplicationSchema,
  getApplicationSchema,
};
