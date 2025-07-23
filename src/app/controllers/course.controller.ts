import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { courseService } from '../services/course.service';
import { cloudinary } from '../utils/cloudinary';

// CREATE
const createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  } catch (error: any) {
    // Cleanup uploaded image on error
    if (req.file) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`courses/${publicId}`);
      }
    }

    if (error.code === 11000) {
      res.status(httpStatus.CONFLICT).json({
        status: 'fail',
        message: 'Course already exists',
      });
      return;
    }

    next(error);
  }
};

// READ - All courses
const getAllCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { programType, category, searchQuery } = req.query;
    const result = await courseService.getAllCourses({
      programType: programType as string,
      category: category as string,
      searchQuery: searchQuery as string,
    });

    res.status(httpStatus.OK).json({
      status: 'success',
      results: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// READ - Single course
const getSingleCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await courseService.getSingleCourse(id);

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
  } catch (error: any) {
    if (error.name === 'CastError') {
      res.status(httpStatus.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid course ID format',
      });
      return;
    }
    next(error);
  }
};

// UPDATE
const updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const courseData = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.file) {
      const existing = await courseService.getSingleCourse(id);
      if (existing?.photo) {
        const publicId = existing.photo.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`courses/${publicId}`);
        }
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
  } catch (error: any) {
    if (req.file) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`courses/${publicId}`);
      }
    }

    if (error.code === 11000) {
      res.status(httpStatus.CONFLICT).json({
        status: 'fail',
        message: 'Course already exists',
      });
      return;
    }

    next(error);
  }
};

// DELETE
const deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const course = await courseService.getSingleCourse(id);

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
        await cloudinary.uploader.destroy(`courses/${publicId}`);
      }
    }

    await courseService.deleteCourse(id);

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
