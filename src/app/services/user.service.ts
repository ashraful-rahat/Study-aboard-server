import { IUser } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { FilterQuery, QueryOptions } from 'mongoose';
import { cloudinary } from '../utils/cloudinary';

const createUser = async (userData: IUser): Promise<IUser> => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Create new user
    const newUser = await UserModel.create({
      ...userData,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    // If there's a photo URL and creation failed, clean up from Cloudinary
    if (userData.photo) {
      const publicId = userData.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    throw error;
  }
};

const allUser = async (query?: FilterQuery<IUser>, options?: QueryOptions): Promise<IUser[]> => {
  try {
    // Default to empty query if not provided
    const filter = query || {};
    // Default options: sort by newest and exclude password
    const defaultOptions = {
      sort: '-createdAt',
      select: '-password',
      ...options,
    };

    return await UserModel.find(filter, null, defaultOptions);
  } catch (error) {
    throw error;
  }
};

const getSingleUser = async (id: string, options?: QueryOptions): Promise<IUser | null> => {
  try {
    // Default options: exclude password
    const defaultOptions = {
      select: '-password',
      ...options,
    };

    return await UserModel.findById(id, null, defaultOptions);
  } catch (error) {
    throw error;
  }
};

const updateUser = async (
  id: string,
  updateData: Partial<IUser>,
  options?: QueryOptions,
): Promise<IUser | null> => {
  try {
    // If updating password, hash the new one
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    // Default options: return updated doc and run validators
    const defaultOptions = {
      new: true,
      runValidators: true,
      select: '-password',
      ...options,
    };

    return await UserModel.findByIdAndUpdate(id, updateData, defaultOptions);
  } catch (error) {
    // If there's a new photo URL and update failed, clean up from Cloudinary
    if (updateData.photo) {
      const publicId = updateData.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    throw error;
  }
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  try {
    // First get the user to handle photo cleanup
    const user = await UserModel.findById(id);
    if (!user) return null;

    // Delete photo from Cloudinary if exists
    if (user.photo) {
      const publicId = user.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Delete the user
    return await UserModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await UserModel.findOne({ email }).select('+password');
  } catch (error) {
    throw error;
  }
};

export const userServices = {
  createUser,
  allUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
