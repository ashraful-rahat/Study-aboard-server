import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { DestinationValidation } from '../validations/destination.validation';
import { destinationController } from '../controllers/destination.controller';
import { uploadSingle } from '../middlewares/upload';
import { parseJsonData } from '../middlewares/parseJsonData';
import { authMiddleware } from '../middlewares/auth';
import { authorizeRoles } from '../middlewares/authorize';

const router = express.Router();

// 🟢 PUBLIC ROUTES (no auth)
router.get('/', destinationController.getAllDestinations);

router.get(
  '/:id',
  validateRequest(DestinationValidation.getDestinationValidationSchema),
  destinationController.getSingleDestination,
);

// 🛡️ PROTECTED ROUTES (admin only)
router.use(authMiddleware);
router.use(authorizeRoles('admin'));

router.post(
  '/create-destination',
  uploadSingle,
  parseJsonData,
  validateRequest(DestinationValidation.destinationValidationSchema),
  destinationController.createDestination,
);

router.patch(
  '/:id',
  uploadSingle,
  parseJsonData,
  validateRequest(DestinationValidation.updateDestinationValidationSchema),
  destinationController.updateDestination,
);

router.delete(
  '/:id',
  validateRequest(DestinationValidation.getDestinationValidationSchema),
  destinationController.deleteDestination,
);

export const destinationRoutes = router;
