import { Types } from 'mongoose';

export interface IApplication {
  user: Types.ObjectId;
  course: Types.ObjectId;
  university: Types.ObjectId;
  destination?: Types.ObjectId; // optional denormalized destination reference
  documents?: string;
  photo?: string;
  status?: 'pending' | 'approved' | 'rejected';
  remarks?: string | null;
}
