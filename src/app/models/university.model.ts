import { Schema, model } from 'mongoose';
import { IUniversity } from '../interfaces/university.interface';

const isValidURL = (value: string) => {
  if (!value) return true;
  return value.startsWith('http://') || value.startsWith('https://');
};

const universitySchema = new Schema<IUniversity>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    destinationId: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    establishedYear: { type: Number },

    website: {
      type: String,
      default: null,
      validate: {
        validator: isValidURL,
        message: 'Website must be a valid URL',
      },
    },

    image: {
      type: String,
      default: null,
      validate: {
        validator: isValidURL,
        message: 'Image must be a valid URL',
      },
    },
  },
  { timestamps: true },
);

export const University = model<IUniversity>('University', universitySchema);
