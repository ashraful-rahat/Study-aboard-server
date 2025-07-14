import { z } from 'zod';

// Custom ObjectId validator (MongoDB 24-char hex)
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ObjectId format',
});

// Shared status enum
const statusEnum = z.enum(['pending', 'approved', 'rejected']);

const createApplicationSchema = z.object({
  body: z.object({
    user: objectId,
    course: objectId,
    university: objectId,
    documents: z.string().url({ message: 'Documents must be a valid URL' }).optional(),
    photo: z.string().url({ message: 'Photo must be a valid URL' }).optional(),
    status: statusEnum.optional(),
    remarks: z.string().nullable().optional(),
  }),
});

const updateApplicationSchema = z.object({
  params: z.object({
    id: objectId,
  }),
  body: z
    .object({
      user: objectId.optional(),
      course: objectId.optional(),
      university: objectId.optional(),
      documents: z.string().url({ message: 'Documents must be a valid URL' }).optional(),
      photo: z.string().url({ message: 'Photo must be a valid URL' }).optional(),
      status: statusEnum.optional(),
      remarks: z.string().nullable().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided for update',
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
