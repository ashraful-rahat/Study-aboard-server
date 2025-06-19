import { Request, Response, NextFunction } from 'express';
import { userServices } from '../services/user.service';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../interfaces/user.interface';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.createUser(req.body);
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        status: 'fail',
        message: 'Email already exists',
      });
      return;
    }
    next(error);
  }
};

const allUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.allUser();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await userServices.getSingleUser(id);

    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: 'User not found',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    if (error.name === 'CastError') {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Invalid user ID format',
      });
      return;
    }
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userData: Partial<IUser> = req.body;
    const result = await userServices.updateUser(id, userData);

    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: 'User not found',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        status: 'fail',
        message: 'Email already exists',
      });
      return;
    }
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await userServices.deleteUser(id);

    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: 'User not found',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
  allUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
