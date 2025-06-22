import { Schema, model } from 'mongoose';
import { ICourse } from '../interfaces/course.interface';

const isValidURL = (value: string) => {
  if (!value) return true;
  return value.startsWith('http://') || value.startsWith('https://');
};

const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true }, // Example: '2 Years', '6 Months'
    tuitionFee: { type: Number, required: true },
    subject: { type: String },

    universityId: {
      type: Schema.Types.ObjectId,
      ref: 'University',
      required: true,
    },

    photo: {
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

export const Course = model<ICourse>('Course', courseSchema);
