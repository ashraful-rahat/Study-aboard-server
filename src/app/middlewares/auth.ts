import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(' ')[1]; // 'Bearer TOKEN'

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return; // return করে ফাংশন শেষ করতে হবে
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return; // return করতে হবে
  }
};
