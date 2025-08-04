import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  content: string; // HTML string from rich text editor
  icon?: string;
  coverImage?: string;
  faq?: {
    question: string;
    answer: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true }, // rich HTML
    icon: { type: String },
    coverImage: { type: String },
    faq: [faqSchema],
  },
  {
    timestamps: true,
  },
);

const Service = mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema);

export default Service;
