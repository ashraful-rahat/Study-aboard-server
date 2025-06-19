import express from 'express';
import { UserValidation } from '../validations/user.validation';
import validateRequest from '../middlewares/validateRequest';
import { userController } from '../controllers/user.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser,
);

router.get('/', userController.allUser);

router.get(
  '/:id',
  validateRequest(UserValidation.getUserValidationSchema),
  userController.getSingleUser,
);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserValidationSchema),
  userController.updateUser,
);

router.delete(
  '/:id',
  validateRequest(UserValidation.getUserValidationSchema),
  userController.deleteUser,
);

export const userRoutes = router;
