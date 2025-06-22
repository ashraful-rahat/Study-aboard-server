import { Types } from 'mongoose';

export interface IUniversity {
  name: string;
  description: string;
  location: string;
  destinationId: Types.ObjectId;
  establishedYear?: number;
  website?: string;
  photo?: string; // ← added image field
}
