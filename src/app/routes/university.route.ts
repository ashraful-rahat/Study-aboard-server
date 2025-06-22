import express from 'express';
import { UniversityValidation } from '../validations/university.validation';
import validateRequest from '../middlewares/validateRequest';
import { universityController } from '../controllers/university.controller';
import { uploadSingle } from '../middlewares/upload';
import { parseJsonData } from '../middlewares/parseJsonData';

const router = express.Router();

router.post(
  '/create-university',
  uploadSingle, // ← multer with Cloudinary
  parseJsonData, // ← to handle JSON data + image
  validateRequest(UniversityValidation.createUniversitySchema),
  universityController.createUniversity,
);

router.get('/', universityController.getAllUniversities);

router.get(
  '/:id',
  validateRequest(UniversityValidation.getSingleSchema),
  universityController.getSingleUniversity,
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
