import express from 'express';
import { applicationController } from '../controllers/application.controller';
import validateRequest from '../middlewares/validateRequest';
import { ApplicationValidation } from '../validations/application.validation';
import { uploadSingle } from '../middlewares/upload';
import { parseJsonData } from '../middlewares/parseJsonData';

const router = express.Router();

router.post(
  '/create-application',
  uploadSingle,
  parseJsonData,
  validateRequest(ApplicationValidation.createApplicationSchema),
  applicationController.createApplication,
);

router.get('/', applicationController.getAllApplications);
router.get(
  '/:id',
  validateRequest(ApplicationValidation.getApplicationSchema),
  applicationController.getSingleApplication,
);
router.patch(
  '/:id',
  uploadSingle,
  validateRequest(ApplicationValidation.updateApplicationSchema),
  applicationController.updateApplication,
);
router.delete(
  '/:id',
  validateRequest(ApplicationValidation.getApplicationSchema),
  applicationController.deleteApplication,
);

export const applicationRoutes = router;
