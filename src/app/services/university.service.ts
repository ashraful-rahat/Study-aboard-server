import { University } from '../models/university.model';
import { IUniversity } from '../interfaces/university.interface';

// CREATE
export const createUniversity = async (data: IUniversity) => {
  return await University.create(data);
};

// READ - All
export const getUniversities = async (filters = {}, sort = '-createdAt') => {
  return await University.find(filters).populate('destinationId').sort(sort);
};

// READ - Single
export const getUniversityById = async (id: string) => {
  return await University.findById(id).populate('destinationId');
};

// UPDATE
export const updateUniversity = async (id: string, data: Partial<IUniversity>) => {
  return await University.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
export const deleteUniversity = async (id: string) => {
  return await University.findByIdAndDelete(id);
};
