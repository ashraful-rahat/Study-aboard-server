// models/course.model.ts
import { Schema, model } from 'mongoose';
import { ICourse } from '../interfaces/course.interface';

const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    universityId: {
      type: Schema.Types.ObjectId,
      ref: 'University',
      required: true,
    },
    universityName: { type: String, required: true },
    tuitionFee: { type: Number, required: true },
    photo: { type: String },
    programType: {
      type: String,
      enum: ['Bachelor', 'Master', 'Diploma'],
    },
    category: { type: String },
    subject: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Course = model<ICourse>('Course', courseSchema);
