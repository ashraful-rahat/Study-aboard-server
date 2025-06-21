import { Schema, model } from 'mongoose';
import { IUniversity } from '../interfaces/university.interface';

const universitySchema = new Schema<IUniversity>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    destinationId: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    establishedYear: { type: Number },
    website: { type: String },
  },
  { timestamps: true },
);

export const University = model<IUniversity>('University', universitySchema);
