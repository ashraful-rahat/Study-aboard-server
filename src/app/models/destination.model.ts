import { Schema, model } from 'mongoose';
import { IDestination } from '../interfaces/destination.interface';

const destinationSchema = new Schema<IDestination>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    country: { type: String, required: true },

    photo: {
      type: String,
      default: null,
      validate: {
        validator: (value: string) => {
          if (!value) return true;
          return value.startsWith('http') || value.startsWith('https');
        },
        message: 'Photo must be a valid URL',
      },
    },
    bestTimeToVisit: { type: String, default: null },
    visaRequirements: { type: String, default: null },

    studentVisa: { type: String, default: null }, // <-- Add this line
  },
  { timestamps: true },
);

export const Destination = model<IDestination>('Destination', destinationSchema);
