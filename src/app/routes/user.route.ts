import express from 'express';
import { UserValidation } from '../validations/user.validation';
import validateRequest from '../middlewares/validateRequest';
import { userController } from '../controllers/user.controller';
import { uploadSingle } from '../middlewares/upload';
import { parseJsonData } from '../middlewares/parseJsonData';

const router = express.Router();
router.post(
  '/create-user',
  uploadSingle, // 1) Multer
  parseJsonData, // 2) Properly‑typed JSON parser
  validateRequest(UserValidation.userValidationSchema), // 3) Zod
  userController.createUser, // 4) Controller
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
