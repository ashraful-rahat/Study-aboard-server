import express from 'express';
import { blogController } from '../controllers/blog.controller';
import { uploadSingle } from '../middlewares/upload';
import catchAsync from '../utils/catchAsync';

const router = express.Router();

router.get('/', catchAsync(blogController.getAllBlogs));
router.get('/:id', catchAsync(blogController.getSingleBlog));
router.post('/create-blog', uploadSingle, catchAsync(blogController.createBlog));
router.patch('/:id', uploadSingle, catchAsync(blogController.updateBlog));
router.delete('/:id', catchAsync(blogController.deleteBlog));

// Change export to default
export default router;
