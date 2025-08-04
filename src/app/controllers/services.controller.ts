import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import { cloudinary } from '../utils/cloudinary';
import { serviceService } from '../services/services.service';

// CREATE
const createService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.file) {
      data.coverImage = req.file.path;
    }

    const result = await serviceService.createService(data);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Service created successfully',
      data: result,
    });
  } catch (error: any) {
    if (req.file) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) await cloudinary.uploader.destroy(publicId);
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

// READ - All
const getAllServices = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await serviceService.getAllServices();
    res.status(httpStatus.OK).json({
      status: 'success',
      results: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// READ - Single
const getSingleService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await serviceService.getServiceById(req.params.id);

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
    if (error.name === 'CastError') {
      res.status(httpStatus.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid service ID format',
      });
      return;
    }
    next(error);
  }
};

// UPDATE
const updateService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.file) {
      const existing = await serviceService.getServiceById(id);
      if (existing?.coverImage) {
        const publicId = existing.coverImage.split('/').pop()?.split('.')[0];
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
      updateData.coverImage = req.file.path;
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
    if (req.file) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) await cloudinary.uploader.destroy(publicId);
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

// DELETE
const deleteService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existing = await serviceService.getServiceById(req.params.id);
    if (existing?.coverImage) {
      const publicId = existing.coverImage.split('/').pop()?.split('.')[0];
      if (publicId) await cloudinary.uploader.destroy(publicId);
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
