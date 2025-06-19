export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  photo?: string;
  phone?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
