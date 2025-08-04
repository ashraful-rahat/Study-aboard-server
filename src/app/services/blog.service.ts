import Blog from '../models/blog.model';
import { IBlog } from '../interfaces/blog.interface';
import { cloudinary } from '../utils/cloudinary';

const createBlog = async (data: IBlog) => {
  try {
    return await Blog.create(data);
  } catch (error) {
    if (data.coverImage) {
      const publicId = data.coverImage.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    throw error;
  }
};

const getBlogs = async (filters = {}, sort = '-createdAt') => {
  return await Blog.find(filters).sort(sort);
};

const getBlogById = async (id: string) => {
  return await Blog.findById(id);
};

const updateBlog = async (id: string, data: Partial<IBlog>) => {
  try {
    return await Blog.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    if (data.coverImage) {
      const publicId = data.coverImage.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    throw error;
  }
};

const deleteBlog = async (id: string) => {
  const existing = await Blog.findById(id);
  if (!existing) return null;

  if (existing.coverImage) {
    const publicId = existing.coverImage.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  }

  return await Blog.findByIdAndDelete(id);
};

export const blogService = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
