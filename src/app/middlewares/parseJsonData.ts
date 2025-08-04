import { Request, Response, NextFunction } from 'express';

export const parseJsonData = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.data && typeof req.body.data === 'string') {
      req.body = JSON.parse(req.body.data);
    }
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid JSON in data field' });
  }
};
