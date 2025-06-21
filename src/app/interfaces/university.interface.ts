import { Types } from 'mongoose';

export interface IUniversity {
  name: string;
  description: string;
  location: string;
  destinationId: Types.ObjectId; // ← updated this line
  establishedYear?: number;
  website?: string;
}
