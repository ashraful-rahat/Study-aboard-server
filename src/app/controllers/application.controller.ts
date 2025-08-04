import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { applicationService } from '../services/application.service';

// JWT auth middleware দ্বারা user সংযুক্ত করা হলে req.user থাকবে
interface AuthenticatedRequest extends Request {
  user?: { _id?: string };
}

const createApplication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.file) data.photo = req.file.path;

    const userId = req.user?._id; // <-- here

    if (!userId) {
      res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }

    data.user = userId;

    const result = await applicationService.createApplication(data);
    res.status(httpStatus.CREATED).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

const getAllApplications = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await applicationService.getAllApplications();
    res.status(httpStatus.OK).json({ status: 'success', results: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

const getSingleApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await applicationService.getSingleApplication(req.params.id);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({ status: 'fail', message: 'Application not found' });
      return;
    }

    res.status(httpStatus.OK).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

    if (req.file) {
      data.photo = req.file.path;
    }

    const result = await applicationService.updateApplication(id, data);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({ status: 'fail', message: 'Application not found' });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Application updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await applicationService.deleteApplication(req.params.id);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({ status: 'fail', message: 'Application not found' });
      return;
    }

    res
      .status(httpStatus.OK)
      .json({ status: 'success', message: 'Application deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const applicationController = {
  createApplication,
  getAllApplications,
  getSingleApplication,
  updateApplication,
  deleteApplication,
};
