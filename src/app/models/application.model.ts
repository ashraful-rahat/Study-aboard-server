import { Schema, model } from 'mongoose';
import { IApplication } from '../interfaces/application.interface';

const isValidEmail = (val: string) => {
  if (!val) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
};

const ApplicationSchema = new Schema<IApplication>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    university: { type: Schema.Types.ObjectId, ref: 'University', required: true },
    destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: false },

    sscResult: { type: String },
    hscResult: { type: String },
    ieltsResult: { type: String },

    studentNumber: { type: String },
    email: {
      type: String,
      validate: [isValidEmail, 'Email must be valid'],
    },

    photo: {
      type: String,
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
