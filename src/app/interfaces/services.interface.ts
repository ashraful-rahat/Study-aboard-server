import { Document } from 'mongoose';

export interface IFAQItem {
  question: string;
  answer: string;
}

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  content: string;

  coverImage?: string;
  faq?: IFAQItem[];
}

export type ICreateServiceInput = Omit<IService, '_id' | 'createdAt' | 'updatedAt' | '__v'>;
