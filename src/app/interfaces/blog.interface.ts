import { Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  author: string;
  shortDescription: string;
  content: string;
  coverImage?: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: Date;
}
