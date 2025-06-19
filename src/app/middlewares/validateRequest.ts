import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodEffects, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: 'fail',
          message: 'Validation failed',
          errors: error.errors,
        });
        return;
      }
      next(error);
    }
  };

export default validateRequest;
