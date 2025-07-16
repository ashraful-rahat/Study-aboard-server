// controllers/course.controller.ts

import { Request, Response, NextFunction } from 'express';
import { courseService } from '../services/course.service';
import httpStatus from 'http-status';
import { cloudinary } from '../utils/cloudinary';

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: 'courses',
      });
      data.photo = uploadedImage.secure_url;
    }

    const result = await courseService.createCourse(data);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Course created successfully',
      data: result,
    });
  } catch (error) {
    if (req.file) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`courses/${publicId}`);
      }
    }
    next(error);
  }
};

const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = req.query; // req.query থেকে সমস্ত ক্যুয়ারি প্যারামিটার গ্রহণ করুন

    // programType, category, searchQuery extract করুন এবং string বা undefined নিশ্চিত করুন
    const programType = filters.programType as string | undefined;
    const category = filters.category as string | undefined;
    const searchQuery = filters.searchQuery as string | undefined;

    // courseService.getAllCourses এ ফিল্টার অবজেক্টটি পাস করুন
    const result = await courseService.getAllCourses({ programType, category, searchQuery });

    res.status(httpStatus.OK).json({
      status: 'success',
      results: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await courseService.getSingleCourse(req.params.id);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Course not found',
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

const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const courseData = req.body;

    if (req.file) {
      const existing = await courseService.getSingleCourse(id);
      const oldImage = existing?.photo;
      const publicId = oldImage?.split('/').pop()?.split('.')[0];

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: 'courses',
      });
      courseData.photo = uploadedImage.secure_url;
    }

    const result = await courseService.updateCourse(id, courseData);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Course not found',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Course updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await courseService.getSingleCourse(req.params.id);

    if (!course) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Course not found',
      });
      return;
    }

    if (course.photo) {
      const publicId = course.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await courseService.deleteCourse(req.params.id);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Course deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const courseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
