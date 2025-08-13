import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { applicationService } from '../services/application.service';

// JWT auth middleware দ্বারা user সংযুক্ত করা হলে req.user থাকবে
interface AuthenticatedRequest extends Request {
  user?: { id?: string };
}

const createApplication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    console.log('🟢 createApplication controller started...');

    const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
    if (req.file) data.photo = req.file.path;

    console.log('🔍 Value of req.user:', req.user);

    const userId = req.user?.id; // ⭐⭐ এখানে "_id" এর বদলে "id" ব্যবহার করো ⭐⭐

    console.log('🔍 Extracted userId:', userId);

    if (!userId) {
      console.log('❌ Error: userId is missing, sending 401 Unauthorized');
      res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }

    data.user = userId;
    console.log('✅ Data to be sent to service:', data);

    const result = await applicationService.createApplication(data);
    console.log('🎉 Application created successfully!');

    res.status(httpStatus.CREATED).json({ status: 'success', data: result });
  } catch (error) {
    console.log('❗ An error occurred in createApplication:', error);
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
  } catch (error: any) {
    if (error.name === 'CastError') {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'fail', message: 'Invalid application ID format' });
      return;
    }
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
