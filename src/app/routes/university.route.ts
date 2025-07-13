// src/routes/university.routes.ts
import express from 'express';
import { UniversityValidation } from '../validations/university.validation';
import validateRequest from '../middlewares/validateRequest';
import { universityController } from '../controllers/university.controller';
import { uploadSingle } from '../middlewares/upload';
import { parseJsonData } from '../middlewares/parseJsonData';
import { authMiddleware } from '../middlewares/auth';
import { authorizeRoles } from '../middlewares/authorize';

const router = express.Router();

// ✅ PUBLIC ROUTES (for frontend)
router.get('/', universityController.getAllUniversities);

router.get(
  '/:id',
  validateRequest(UniversityValidation.getSingleSchema),
  universityController.getSingleUniversity,
);

// 🛡️ ADMIN ONLY (create/update/delete)
router.use(authMiddleware);
router.use(authorizeRoles('admin'));

router.post(
  '/create-university',
  uploadSingle,
  parseJsonData,
  validateRequest(UniversityValidation.createUniversitySchema),
  universityController.createUniversity,
);

router.patch(
  '/:id',
  uploadSingle,
  parseJsonData,
  validateRequest(UniversityValidation.updateUniversitySchema),
  universityController.updateUniversity,
);

router.delete(
  '/:id',
  validateRequest(UniversityValidation.getSingleSchema),
  universityController.deleteUniversity,
);

export const universityRoutes = router;
