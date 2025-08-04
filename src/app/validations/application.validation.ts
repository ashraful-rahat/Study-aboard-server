import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ObjectId format',
});

const statusEnum = z.enum(['pending', 'approved', 'rejected']);
const backgroundEnum = z.enum(['science', 'commerce', 'arts']);

// Score fields (as numbers in string format)
const scoreString = z.string().regex(/^\d+(\.\d{1,2})?$/, {
  message: 'Must be a valid number (e.g. 5.00 or 6.5)',
});

const createApplicationSchema = z.object({
  course: objectId,
  university: objectId,
  user: objectId,
  destination: objectId.optional(),
  sscResult: scoreString.optional(),
  hscResult: scoreString.optional(),
  ieltsResult: scoreString.optional(),
  studentNumber: z.string().optional(),
  email: z.string().email({ message: 'Email must be valid' }).optional(),
  photo: z.string().optional(),
  status: statusEnum.optional(),
  remarks: z.string().nullable().optional(),
  background: backgroundEnum.optional(),
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
      destination: objectId.optional(),

      sscResult: scoreString.optional(),
      hscResult: scoreString.optional(),
      ieltsResult: scoreString.optional(),

      studentNumber: z.string().optional(),
      email: z.string().email({ message: 'Email must be valid' }).optional(),

      photo: z.string().optional(),
      status: statusEnum.optional(),
      remarks: z.string().nullable().optional(),
      background: backgroundEnum.optional(),
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
