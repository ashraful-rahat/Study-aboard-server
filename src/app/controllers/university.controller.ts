import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import * as universityService from '../services/university.service';

const createUniversity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await universityService.createUniversity(req.body);
    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'University created successfully',
      data: result,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(httpStatus.CONFLICT).json({
        status: 'fail',
        message: 'University already exists',
      });
    } else {
      next(error);
    }
  }
};

const getAllUniversities = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await universityService.getUniversities();
    res.status(httpStatus.OK).json({
      status: 'success',
      results: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUniversity = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await universityService.getUniversityById(id);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'University not found',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUniversity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await universityService.updateUniversity(id, req.body);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'University not found',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'University updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUniversity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await universityService.deleteUniversity(id);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'University not found',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'University deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const universityController = {
  createUniversity,
  getAllUniversities,
  getSingleUniversity,
  updateUniversity,
  deleteUniversity,
};
