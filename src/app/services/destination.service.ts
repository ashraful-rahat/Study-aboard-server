import { Destination } from '../models/destination.model';
import { IDestination } from '../interfaces/destination.interface';

// CREATE
export const createDestination = async (data: IDestination) => {
  return await Destination.create(data);
};

// READ - All
export const getDestinations = async (filters = {}, sort = '-createdAt') => {
  return await Destination.find(filters).sort(sort);
};

// READ - Single by ID
export const getDestinationById = async (id: string) => {
  return await Destination.findById(id);
};

// UPDATE
export const updateDestination = async (id: string, data: Partial<IDestination>) => {
  return await Destination.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
export const deleteDestination = async (id: string) => {
  return await Destination.findByIdAndDelete(id);
};
