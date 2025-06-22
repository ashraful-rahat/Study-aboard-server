import { Types } from 'mongoose';

export interface IApplication {
  user: Types.ObjectId;
  course: Types.ObjectId;
  university: Types.ObjectId;
  documents?: string;
  photo?: string;
  status?: 'pending' | 'approved' | 'rejected';
  remarks?: string;
}
