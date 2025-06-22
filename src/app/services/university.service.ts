import { University } from '../models/university.model';
import { IUniversity } from '../interfaces/university.interface';
import { cloudinary } from '../utils/cloudinary';

// CREATE
export const createUniversity = async (data: IUniversity): Promise<IUniversity> => {
  try {
    const newUniversity = await University.create(data);
    return newUniversity;
  } catch (error) {
    // Rollback uploaded image if create fails
    if (data.photo) {
      const publicId = data.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    throw error;
  }
};

// READ - All
export const getUniversities = async (
  filters = {},
  sort = '-createdAt',
): Promise<IUniversity[]> => {
  return await University.find(filters).populate('destinationId').sort(sort);
};

// READ - Single
export const getUniversityById = async (id: string): Promise<IUniversity | null> => {
  return await University.findById(id).populate('destinationId');
};

// UPDATE
export const updateUniversity = async (
  id: string,
  data: Partial<IUniversity>,
): Promise<IUniversity | null> => {
  try {
    // If there's a new image, delete the old one first
    if (data.photo) {
      const existing = await University.findById(id);
      if (existing?.photo) {
        const publicId = existing.photo.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }
    }

    return await University.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    // If new image was uploaded and update failed, delete the new image from Cloudinary
    if (data.photo) {
      const publicId = data.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    throw error;
  }
};

// DELETE
export const deleteUniversity = async (id: string): Promise<IUniversity | null> => {
  try {
    const existing = await University.findById(id);
    if (!existing) return null;

    // Remove image from Cloudinary
    if (existing.photo) {
      const publicId = existing.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    return await University.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
