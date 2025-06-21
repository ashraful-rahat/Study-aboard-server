import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { DestinationValidation } from '../validations/destination.validation';
import { destinationController } from '../controllers/destination.controller';
('../validations/destination.validation');

const router = express.Router();

router.post(
  '/create-destination',
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
  validateRequest(DestinationValidation.updateDestinationValidationSchema),
  destinationController.updateDestination,
);

router.delete(
  '/:id',
  validateRequest(DestinationValidation.getDestinationValidationSchema),
  destinationController.deleteDestination,
);

export const destinationRoutes = router;
