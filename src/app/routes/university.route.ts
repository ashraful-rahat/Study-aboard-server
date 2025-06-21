import express from 'express';
import { UniversityValidation } from '../validations/university.validation';
import validateRequest from '../middlewares/validateRequest';
import { universityController } from '../controllers/university.controller';

const router = express.Router();

router.post(
  '/create-university',
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
  validateRequest(UniversityValidation.updateUniversitySchema),
  universityController.updateUniversity,
);

router.delete(
  '/:id',
  validateRequest(UniversityValidation.getSingleSchema),
  universityController.deleteUniversity,
);

export const universityRoutes = router;
