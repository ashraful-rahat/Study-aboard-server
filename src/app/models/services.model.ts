import mongoose, { Schema } from 'mongoose';
import { IService, IFAQItem } from '../interfaces/services.interface';

const faqSchema = new Schema<IFAQItem>(
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
    content: { type: String, required: true },

    coverImage: { type: String },
    faq: [faqSchema],
  },
  { timestamps: true },
);

const Service = mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema);

export default Service;
