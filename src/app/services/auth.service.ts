// auth.service.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error('User not found - please check your email');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('Incorrect password - please try again');
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '7d',
    },
  );

  return {
    accessToken: token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
    },
  };
};

const registerUser = async (
  name: string,
  email: string,
  password: string,
  age: number,
  photo?: string,
  // ✅ role parameter added here
  role?: string,
) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    age,
    photo,
    // ✅ This is where the fix is: use the provided role, or default to 'user'
    role: role || 'user',
  });

  const token = jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' },
  );

  return {
    accessToken: token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  };
};

export const authService = {
  loginUser,
  registerUser,
};
