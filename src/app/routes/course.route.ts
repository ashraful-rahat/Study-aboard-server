import express from 'express';
import { courseController } from '../controllers/course.controller';
import validateRequest from '../middlewares/validateRequest';
import { CourseValidation } from '../validations/course.validation';
import { uploadSingle } from '../middlewares/upload';
import { parseJsonData } from '../middlewares/parseJsonData';

const router = express.Router();

router.post(
  '/create-course',
  uploadSingle,
  parseJsonData,
  validateRequest(CourseValidation.createCourseSchema),
  courseController.createCourse,
);

router.get('/', courseController.getAllCourses);

router.get(
  '/:id',
  validateRequest(CourseValidation.getCourseSchema),
  courseController.getSingleCourse,
);

router.patch(
  '/:id',
  uploadSingle,
  validateRequest(CourseValidation.updateCourseSchema),
  courseController.updateCourse,
);

router.delete(
  '/:id',
  validateRequest(CourseValidation.getCourseSchema),
  courseController.deleteCourse,
);

export const courseRoutes = router;
