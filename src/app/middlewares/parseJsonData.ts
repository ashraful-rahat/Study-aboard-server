// src/middlewares/parseJsonData.ts
import { RequestHandler } from 'express';

export const parseJsonData: RequestHandler = (req, res, next): void => {
  if (req.body.data) {
    try {
      const parsed = JSON.parse(req.body.data);
      req.body = { ...parsed, ...req.body };
      delete (req.body as any).data;
    } catch {
      // send and *return* to prevent falling through
      res.status(400).json({ status: 'fail', message: 'Invalid JSON data' });
      return;
    }
  }
  next();
};
