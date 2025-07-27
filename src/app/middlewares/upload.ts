import multer, { FileFilterCallback } from 'multer';
import { storage } from '../utils/cloudinary';
import { Request } from 'express';

const fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => void = (
  req,
  file,
  cb,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, jpeg, png, webp)'));
  }
};

const upload = multer({
  storage, // ✅ cloudinaryStorage
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter,
});

// ✅ Middleware exports
export const uploadSingle = upload.single('photo');
export const uploadMultiple = upload.array('photo', 10);
