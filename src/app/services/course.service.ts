import { Course } from '../models/course.model';
import { ICourse } from '../interfaces/course.interface';
import { cloudinary } from '../utils/cloudinary';

const createCourse = async (data: ICourse) => {
  return await Course.create(data);
};

const getAllCourses = async (filters: {
  programType?: string;
  category?: string;
  searchQuery?: string;
}) => {
  const { programType, category, searchQuery } = filters;
  const query: any = {};

  if (programType) {
    query.programType = programType;
  }

  if (category) {
    query.category = category;
  }

  if (searchQuery) {
    const searchRegex = new RegExp(searchQuery, 'i');

    query.$or = [
      { name: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
      { subject: { $regex: searchRegex } },
    ];
  }

  return await Course.find(query).populate('universityId').sort('-createdAt');
};

const getSingleCourse = async (id: string) => {
  return await Course.findById(id).populate('universityId');
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
