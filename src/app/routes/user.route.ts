import express from 'express';
import { UserValidation } from '../validations/user.validation';
import validateRequest from '../middlewares/validateRequest';
import { userController } from '../controllers/user.controller';
import { uploadSingle } from '../middlewares/upload';
import { parseJsonData } from '../middlewares/parseJsonData';
import { authMiddleware } from '../middlewares/auth';
import { authorizeRoles } from '../middlewares/authorize';

const router = express.Router();

// Admin-only routes below
router.use(authMiddleware);
// router.use(authorizeRoles('admin'));

router.post(
  '/create-user',
  uploadSingle,
  parseJsonData,
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
  uploadSingle,
  validateRequest(UserValidation.updateUserValidationSchema),
  userController.updateUser,
);

router.delete(
  '/:id',
  validateRequest(UserValidation.getUserValidationSchema),
  userController.deleteUser,
);

export const userRoutes = router;
