import express from 'express';
import { applicationController } from '../controllers/application.controller';
import { uploadSingle } from '../middlewares/upload';
import { parseJsonData } from '../middlewares/parseJsonData';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post(
  '/create-application',
  authMiddleware,
  uploadSingle,
  parseJsonData,
  applicationController.createApplication,
);

router.get('/', applicationController.getAllApplications);

router.get('/:id', applicationController.getSingleApplication);

router.patch('/:id', uploadSingle, applicationController.updateApplication);

router.delete('/:id', applicationController.deleteApplication);

export const applicationRoutes = router;
