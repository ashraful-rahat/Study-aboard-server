import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { destinationService } from '../services/destination.service';
import { cloudinary } from '../utils/cloudinary';

// CREATE
const createDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const destinationData =
      typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.file) {
      destinationData.photo = req.file.path;
    }

    const result = await destinationService.createDestination(destinationData);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Destination created successfully',
      data: result,
    });
  } catch (error: any) {
    if (req.file) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    if (error.code === 11000) {
      res.status(httpStatus.CONFLICT).json({
        status: 'fail',
        message: 'Destination already exists',
      });
      return;
    }

    next(error);
  }
};

// READ - All
const getAllDestinations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await destinationService.getDestinations();
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
const getSingleDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await destinationService.getDestinationById(id);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Destination not found',
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
        message: 'Invalid destination ID format',
      });
      return;
    }
    next(error);
  }
};

// UPDATE
const updateDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.file) {
      // Delete old photo
      const existing = await destinationService.getDestinationById(id);
      if (existing?.photo) {
        const publicId = existing.photo.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }
      updateData.photo = req.file.path;
    }

    const result = await destinationService.updateDestination(id, updateData);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Destination not found',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Destination updated successfully',
      data: result,
    });
  } catch (error: any) {
    if (req.file) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    if (error.code === 11000) {
      res.status(httpStatus.CONFLICT).json({
        status: 'fail',
        message: 'Destination already exists',
      });
      return;
    }
    next(error);
  }
};

// DELETE
const deleteDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await destinationService.deleteDestination(id);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Destination not found',
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Destination deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const destinationController = {
  createDestination,
  getAllDestinations,
  getSingleDestination,
  updateDestination,
  deleteDestination,
};
