import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { applicationService } from '../services/application.service';

const createApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
    if (req.file) data.photo = req.file.path;
    const result = await applicationService.createApplication(data);
    res.status(httpStatus.CREATED).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

const getAllApplications = async (req: Request, res: Response, next: NextFunction) => {
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
      res.status(404).json({ status: 'fail', message: 'Application not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: result });
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
      res.status(404).json({ status: 'fail', message: 'Application not found' });
      return;
    }

    res.status(200).json({
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
      res.status(404).json({ status: 'fail', message: 'Application not found' });
      return;
    }

    res.status(200).json({ status: 'success', message: 'Application deleted successfully' });
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
