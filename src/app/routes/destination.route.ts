import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { DestinationValidation } from '../validations/destination.validation';
import { destinationController } from '../controllers/destination.controller';
('../validations/destination.validation');
import { uploadSingle } from '../middlewares/upload';
import { parseJsonData } from '../middlewares/parseJsonData';

const router = express.Router();

router.post(
  '/create-destination',
  uploadSingle, // ← Cloudinary file upload
  parseJsonData, // ← Parse req.body.data
  validateRequest(DestinationValidation.destinationValidationSchema),
  destinationController.createDestination,
);

router.get('/', destinationController.getAllDestinations);

router.get(
  '/:id',
  validateRequest(DestinationValidation.getDestinationValidationSchema),
  destinationController.getSingleDestination,
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
