import { Destination } from '../models/destination.model';
import { IDestination } from '../interfaces/destination.interface';
import { cloudinary } from '../utils/cloudinary';

const createDestination = async (data: IDestination) => {
  try {
    return await Destination.create(data);
  } catch (error) {
    if (data.photo) {
      const publicId = data.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    throw error;
  }
};

const getDestinations = async (filters = {}, sort = '-createdAt') => {
  return await Destination.find(filters).sort(sort);
};

const getDestinationById = async (id: string) => {
  return await Destination.findById(id);
};

const updateDestination = async (id: string, data: Partial<IDestination>) => {
  try {
    return await Destination.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    if (data.photo) {
      const publicId = data.photo.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    throw error;
  }
};

const deleteDestination = async (id: string) => {
  const existing = await Destination.findById(id);
  if (!existing) return null;

  if (existing.photo) {
    const publicId = existing.photo.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  }

  return await Destination.findByIdAndDelete(id);
};

export const destinationService = {
  createDestination,
  getDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
};
