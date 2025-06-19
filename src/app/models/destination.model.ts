import { Schema, model } from 'mongoose';
import { IDestination } from '../interfaces/destination.interface';

const destinationSchema = new Schema<IDestination>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    images: [{ type: String }],
    bestTimeToVisit: { type: String },
    visaRequirements: { type: String },
  },
  { timestamps: true },
);

export const Destination = model<IDestination>('Destination', destinationSchema);
