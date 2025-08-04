import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { blogService } from '../services/blog.service';
import { cloudinary } from '../utils/cloudinary';

export const blogController = {
  createBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogData = req.body;

      // Check if required fields are present before saving to avoid Mongoose validation errors
      if (
        !blogData.title ||
        !blogData.slug ||
        !blogData.author ||
        !blogData.shortDescription ||
        !blogData.content
      ) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: 'fail',
          message:
            'Missing required fields: title, slug, author, shortDescription, and content are mandatory.',
        });
      }

      // Access uploaded file from req.file. If no file, set coverImage to null
      if (req.file) {
        blogData.coverImage = req.file.path;
      } else {
        blogData.coverImage = null;
      }

      // Parse tags gracefully. If not a string, it becomes an empty array.
      if (typeof blogData.tags === 'string') {
        blogData.tags = blogData.tags.split(',').map((tag: string) => tag.trim());
      } else {
        blogData.tags = [];
      }

      const result = await blogService.createBlog(blogData);

      res.status(httpStatus.CREATED).json({
        status: 'success',
        message: 'Blog created successfully',
        data: result,
      });
    } catch (error: any) {
      console.error('Error creating blog:', error); // Log the actual error

      // If an error occurs after file upload, delete the uploaded file from Cloudinary
      if (req.file) {
        const publicId = req.file.path.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      if (error.code === 11000) {
        return res.status(httpStatus.CONFLICT).json({
          status: 'fail',
          message: 'Blog with this slug already exists. Please use a different slug.',
        });
      }
      // Pass the error to the global error handler
      next(error);
    }
  },
  getAllBlogs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await blogService.getBlogs();
      res.status(httpStatus.OK).json({
        status: 'success',
        results: result.length,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  getSingleBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await blogService.getBlogById(id);

      if (!result) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: 'fail',
          message: 'Blog not found',
        });
      }

      res.status(httpStatus.OK).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      if (error.name === 'CastError') {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: 'fail',
          message: 'Invalid blog ID format',
        });
      }
      next(error);
    }
  },

  updateBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Handle file upload for update
      if (req.file) {
        const existing = await blogService.getBlogById(id);
        if (existing?.coverImage) {
          const publicId = existing.coverImage.split('/').pop()?.split('.')[0];
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        }
        updateData.coverImage = req.file.path;
      }

      // Parse tags gracefully
      if (typeof updateData.tags === 'string') {
        updateData.tags = updateData.tags.split(',').map((tag: string) => tag.trim());
      }

      const result = await blogService.updateBlog(id, updateData);

      if (!result) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: 'fail',
          message: 'Blog not found',
        });
      }

      res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Blog updated successfully',
        data: result,
      });
    } catch (error: any) {
      console.error('Error updating blog:', error);

      // If an error occurs after new file upload, delete the new file
      if (req.file) {
        const publicId = req.file.path.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      if (error.code === 11000) {
        return res.status(httpStatus.CONFLICT).json({
          status: 'fail',
          message: 'Blog with this slug already exists. Please use a different slug.',
        });
      }
      next(error);
    }
  },

  deleteBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await blogService.deleteBlog(id);

      if (!result) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: 'fail',
          message: 'Blog not found',
        });
      }

      res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Blog deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
