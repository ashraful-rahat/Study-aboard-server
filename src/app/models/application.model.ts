import { Schema, model } from 'mongoose';
import { IApplication } from '../interfaces/application.interface';

const isValidURL = (val: string) => !val || val.startsWith('http://') || val.startsWith('https://');

const ApplicationSchema = new Schema<IApplication>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
    documents: {
      type: String,
      validate: { validator: isValidURL, message: 'Documents must be a valid URL' },
    },
    photo: {
      type: String,
      validate: { validator: isValidURL, message: 'Photo must be a valid URL' },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    remarks: { type: String, default: null },
  },
  { timestamps: true },
);

export const Application = model<IApplication>('Application', ApplicationSchema);
