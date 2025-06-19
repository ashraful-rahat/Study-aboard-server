import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      //   select: false,
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },

    photo: {
      type: String,
      default: null,
    },

    phone: {
      type: String,
      default: null,
    },

    address: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUser>('User', UserSchema);
