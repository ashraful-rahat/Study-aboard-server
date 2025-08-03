import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ObjectId format',
});

const statusEnum = z.enum(['pending', 'approved', 'rejected']);
const backgroundEnum = z.enum(['science', 'commerce', 'arts']);
const fileURL = z.string().url({ message: 'Must be a valid URL' });

const createApplicationSchema = z.object({
  body: z.object({
    user: objectId,
    course: objectId,
    university: objectId,
    destination: objectId.optional(),

    sscResult: fileURL.optional(),
    hscResult: fileURL.optional(),
    ieltsResult: fileURL.optional(),

    photo: fileURL.optional(),
    status: statusEnum.optional(),
    remarks: z.string().nullable().optional(),
    background: backgroundEnum.optional(),
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
      destination: objectId.optional(),

      sscResult: fileURL.optional(),
      hscResult: fileURL.optional(),
      ieltsResult: fileURL.optional(),

      photo: fileURL.optional(),
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
