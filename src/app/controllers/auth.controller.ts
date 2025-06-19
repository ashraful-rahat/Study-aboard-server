import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, age, photo } = req.body;

    const result = await authService.registerUser(name, email, password, age, photo);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
