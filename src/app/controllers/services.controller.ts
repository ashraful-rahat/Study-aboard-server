// controllers/services.controller.ts
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { cloudinary } from '../utils/cloudinary';
import { serviceService } from '../services/services.service';

const createService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const serviceData = {
      ...req.body,
      faq: JSON.parse(req.body.faq),
    };

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'image',
      });
      serviceData.coverImage = uploadResult.secure_url;
    }

    const result = await serviceService.createService(serviceData);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Service created successfully',
      data: result,
    });
  } catch (error: any) {
    if (req.file && req.file.path) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error('Cloudinary error during cleanup:', cloudinaryError);
        }
      }
    }

    if (error.code === 11000) {
      res.status(httpStatus.CONFLICT).json({
        status: 'fail',
        message: 'Service already exists',
      });
      return;
    }

    next(error);
  }
};

const getAllServices = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await serviceService.getAllServices();
    res.status(httpStatus.OK).json({
      status: 'success',
      results: result.length,
      data: result,
    });
  } catch (error) {
    next(error); // ⭐ ত্রুটি হ্যান্ডলিং যোগ করা হয়েছে
  }
};

const getSingleService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    console.log('Searching for slug:', slug); // ⭐ এইখানে console.log যোগ করুন

    const result = await serviceService.getServiceBySlug(slug);

    console.log('Database query result:', result); // ⭐ এটি কি null দেখাচ্ছে?

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Service not found',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      faq: JSON.parse(req.body.faq),
    };

    if (req.file) {
      const existing = await serviceService.getServiceById(id);
      if (existing?.coverImage) {
        const publicId = existing.coverImage.split('/').pop()?.split('.')[0];
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (cloudinaryError) {
            console.error('Cloudinary error during old image deletion:', cloudinaryError);
          }
        }
      }
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'image',
      });
      updateData.coverImage = uploadResult.secure_url;
    }

    const result = await serviceService.updateService(id, updateData);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Service not found',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Service updated successfully',
      data: result,
    });
  } catch (error: any) {
    if (req.file && req.file.path) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error('Cloudinary error during new image deletion:', cloudinaryError);
        }
      }
    }

    if (error.code === 11000) {
      res.status(httpStatus.CONFLICT).json({
        status: 'fail',
        message: 'Slug already exists',
      });
      return;
    }

    next(error);
  }
};

const deleteService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existing = await serviceService.getServiceById(req.params.id);
    if (existing?.coverImage) {
      const publicId = existing.coverImage.split('/').pop()?.split('.')[0];
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error('Cloudinary error during image deletion:', cloudinaryError);
        }
      }
    }

    const result = await serviceService.deleteService(req.params.id);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Service not found',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Service deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const serviceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
