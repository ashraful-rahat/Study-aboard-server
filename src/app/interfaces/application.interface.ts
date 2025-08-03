import { Types } from 'mongoose';

export interface IApplication {
  user: Types.ObjectId;
  course: Types.ObjectId;
  university: Types.ObjectId;
  destination?: Types.ObjectId;
  sscResult?: string;
  hscResult?: string;
  ieltsResult?: string;
  photo?: string;
  status?: 'pending' | 'approved' | 'rejected';
  remarks?: string | null;
  background?: 'science' | 'commerce' | 'arts';
}
