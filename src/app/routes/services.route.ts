// src/app/routes/services.route.ts
import express from 'express';
import { serviceController } from '../controllers/services.controller';
import { upload } from '../utils/cloudinary';

const router = express.Router();

router.post('/', upload.single('coverImage'), serviceController.createService);
router.get('/', serviceController.getAllServices);

router.get('/:slug', (req, res, next) => {
  // ⭐ id এর বদলে slug ব্যবহার করা হয়েছে
  console.log('✅ Request is hitting the dynamic route for URL:', req.originalUrl);
  serviceController.getSingleService(req, res, next);
});

router.patch('/:id', upload.single('coverImage'), serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

export default router;
