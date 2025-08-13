import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    // এখানে req.user থেকে role চেক করা হচ্ছে
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      // যদি role মিলে না যায়, তাহলে অ্যাক্সেস ডিনাই করা হয়
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};
