import express from 'express';
import { login, register } from '../controllers/auth.controller';
import { uploadSingle } from '../middlewares/upload';
import { parseJsonData } from '../middlewares/parseJsonData';
import validateRequest from '../middlewares/validateRequest';
import { UserValidation } from '../validations/user.validation';

const router = express.Router();

router.post(
  '/register',
  uploadSingle,
  parseJsonData,
  validateRequest(UserValidation.userValidationSchema),
  register,
);

router.post('/login', login);

export const authRoutes = router;
