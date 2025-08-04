import express from 'express';
import { serviceController } from '../controllers/services.controller';
import { uploadSingle } from '../middlewares/upload';

const router = express.Router();

router.get('/', serviceController.getAllServices);

router.post('/', uploadSingle, serviceController.createService);

router.get('/:id', serviceController.getSingleService);

router.patch('/:id', uploadSingle, serviceController.updateService);

router.delete('/:id', serviceController.deleteService);

export const serviceRoutes = router;
