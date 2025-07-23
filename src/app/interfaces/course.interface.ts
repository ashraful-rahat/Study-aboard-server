// interfaces/course.interface.ts
import { Types } from 'mongoose';

export interface ICourse {
  name: string;
  description: string;
  duration: string;
  universityId: Types.ObjectId; // reference
  universityName: string;
  tuitionFee: number;
  photo?: string;
  programType?: 'Bachelor' | 'Master' | 'Diploma';
  category?: string;
  subject?: string;
}
