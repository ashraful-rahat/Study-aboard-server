import { z } from 'zod';

// Create schema for creating a destination
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

    images: z.array(z.string().url('Invalid URL format')).optional().default([]),

    bestTimeToVisit: z.string().optional().nullable(),

    visaRequirements: z.string().optional().nullable(),
  }),
});

// Create schema for updating a destination (partial)
const updateDestinationValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name cannot be empty').optional(),
    description: z.string().trim().min(1, 'Description cannot be empty').optional(),
    country: z.string().trim().min(1, 'Country cannot be empty').optional(),
    images: z.array(z.string().url('Invalid URL format')).optional(),
    bestTimeToVisit: z.string().optional().nullable(),
    visaRequirements: z.string().optional().nullable(),
  }),
});

// Schema for validating just the destination ID param (used in GET / PATCH / DELETE)
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

// Optional types for use in TS types elsewhere
export type DestinationInput = z.infer<typeof destinationValidationSchema>['body'];
export type DestinationUpdateInput = z.infer<typeof updateDestinationValidationSchema>['body'];
