import { Types } from 'mongoose';

export interface ICourse {
  name: string;
  description: string;
  duration: string;
  tuitionFee: number;
  universityId: Types.ObjectId;
  subject?: string;
  photo?: string;
  programType?: 'Bachelor' | 'Master' | 'Diploma';

  category?: string; // Optional field for course category
}
