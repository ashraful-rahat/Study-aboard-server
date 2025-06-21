import multer, { FileFilterCallback } from 'multer';
import { storage } from '../utils/cloudinary';
import { Request } from 'express';

// Strongly typed file filter
const fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => void = (
  req,
  file,
  cb,
) => {
  // Accept only image mimetypes
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, jpeg, png, webp)'));
  }
};

// Configure multer instance with Cloudinary storage
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});

// Single file upload middleware (field name: 'photo')
export const uploadSingle = upload.single('photo');

// Multiple files upload middleware (field name: 'photo', max 10 files)
export const uploadMultiple = upload.array('photo', 10);
