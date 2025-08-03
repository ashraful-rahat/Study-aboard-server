import { Schema, model } from 'mongoose';
import { IApplication } from '../interfaces/application.interface';

const isValidURL = (val: string) => {
  if (!val) return true;
  return val.startsWith('http://') || val.startsWith('https://');
};

const ApplicationSchema = new Schema<IApplication>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    university: {
      type: Schema.Types.ObjectId,
      ref: 'University',
      required: true,
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: 'Destination',
      required: false,
    },

    sscResult: {
      type: String,
      validate: [isValidURL, 'SSC result must be a valid URL'],
    },
    hscResult: {
      type: String,
      validate: [isValidURL, 'HSC result must be a valid URL'],
    },
    ieltsResult: {
      type: String,
      validate: [isValidURL, 'IELTS result must be a valid URL'],
    },

    photo: {
      type: String,
      validate: [isValidURL, 'Photo must be a valid URL'],
      default: null,
    },

    background: {
      type: String,
      enum: ['science', 'commerce', 'arts'],
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },

    remarks: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Application = model<IApplication>('Application', ApplicationSchema);
