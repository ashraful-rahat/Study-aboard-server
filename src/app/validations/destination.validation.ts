import { z } from 'zod';

const destinationValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim().min(1, 'Name cannot be empty'),

    description: z
      .string({ required_error: 'Description is required' })
      .trim()
      .min(1, 'Description cannot be empty'),

    country: z
      .string({ required_error: 'Country is required' })
      .trim()
      .min(1, 'Country cannot be empty'),

    photo: z.string().optional().nullable(),

    bestTimeToVisit: z.string().optional().nullable(),

    visaRequirements: z.string().optional().nullable(),

    studentVisa: z.string().optional().nullable(), // <-- Add here
  }),
});

const updateDestinationValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name cannot be empty').optional(),
    description: z.string().trim().min(1, 'Description cannot be empty').optional(),
    country: z.string().trim().min(1, 'Country cannot be empty').optional(),
    photo: z.string().url().optional().nullable(),
    bestTimeToVisit: z.string().optional().nullable(),
    visaRequirements: z.string().optional().nullable(),
    studentVisa: z.string().optional().nullable(),
  }),
});

const getDestinationValidationSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Destination ID is required'),
  }),
});

export const DestinationValidation = {
  destinationValidationSchema,
  updateDestinationValidationSchema,
  getDestinationValidationSchema,
};

export type DestinationInput = z.infer<typeof destinationValidationSchema>['body'];
export type DestinationUpdateInput = z.infer<typeof updateDestinationValidationSchema>['body'];
