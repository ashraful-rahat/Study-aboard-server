import express from 'express';
import {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
} from '../controllers/services.controller';
import { upload } from '../utils/cloudinary';

const router = express.Router();

router.post('/', upload.single('coverImage'), createService);
router.get('/', getAllServices);
router.get('/:id', getSingleService);
router.patch('/:id', upload.single('coverImage'), updateService);
router.delete('/:id', deleteService);

export default router;
