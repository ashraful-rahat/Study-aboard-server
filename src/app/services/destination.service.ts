import { Destination } from '../models/destination.model';
import { IDestination } from '../interfaces/destination.interface';

const createDestination = async (data: IDestination) => {
  return await Destination.create(data);
};

const getDestinations = async (filters = {}, sort = '-createdAt') => {
  return await Destination.find(filters).sort(sort);
};

const getDestinationById = async (id: string) => {
  return await Destination.findById(id);
};

const updateDestination = async (id: string, data: Partial<IDestination>) => {
  return await Destination.findByIdAndUpdate(id, data, { new: true });
};

const deleteDestination = async (id: string) => {
  return await Destination.findByIdAndDelete(id);
};

export const destinationService = {
  createDestination,
  getDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
};
