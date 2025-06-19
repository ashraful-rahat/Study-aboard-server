import { IUser } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';

const createUser = async (payload: IUser): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const newUser = new UserModel({ ...payload, password: hashedPassword });
  return newUser.save();
};

const allUser = async (): Promise<IUser[]> => {
  return UserModel.find();
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  return UserModel.findById(id);
};

const updateUser = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  return UserModel.findByIdAndDelete(id);
};

export const userServices = {
  createUser,
  allUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
