import { Course } from '../models/course.model';
import { ICourse } from '../interfaces/course.interface';
import { cloudinary } from '../utils/cloudinary';

const createCourse = async (data: ICourse) => {
  return await Course.create(data);
};

const getAllCourses = async () => {
  return await Course.find().populate('universityId').sort('-createdAt');
};
const getSingleCourse = async (id: string) => {
  return await Course.findById(id).populate('universityId', 'name');
};

const updateCourse = async (id: string, data: Partial<ICourse>) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

const deleteCourse = async (id: string) => {
  const course = await Course.findById(id);
  if (!course) return null;

  if (course.photo) {
    const parts = course.photo.split('/');
    const lastPart = parts.pop(); // e.g., "abc123.jpg"
    const publicId = lastPart?.split('.')[0]; // e.g., "abc123"

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  }

  return await Course.findByIdAndDelete(id);
};

export const courseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
