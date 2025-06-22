import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import * as universityService from '../services/university.service';
import { cloudinary } from '../utils/cloudinary';

const createUniversity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const universityData = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.file) {
      universityData.photo = req.file.path; // ✅ ঠিক ফিল্ডে সেট করছেন
    }

    const result = await universityService.createUniversity(universityData);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'University created successfully',
      data: result,
    });
  } catch (error: any) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }

    if (error.code === 11000) {
      res.status(httpStatus.CONFLICT).json({
        status: 'fail',
        message: 'University already exists',
      });
      return;
    }

    next(error);
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
    const updateData = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.file) {
      updateData.photo = req.file.path; // ✅ Correct field
    }

    const result = await universityService.updateUniversity(req.params.id, updateData);

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
    const existing = await universityService.getUniversityById(id);

    // Delete image from cloudinary if exists
    if (existing?.photo) {
      const publicId = existing.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

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
