import { Application } from '../models/application.model';
import { IApplication } from '../interfaces/application.interface';

const createApplication = async (data: IApplication) => await Application.create(data);

const getAllApplications = async () => await Application.find().populate('user course university');

const getSingleApplication = async (id: string) =>
  await Application.findById(id).populate('user course university');

const updateApplication = async (id: string, data: Partial<IApplication>) =>
  await Application.findByIdAndUpdate(id, data, { new: true });

const deleteApplication = async (id: string) => await Application.findByIdAndDelete(id);

export const applicationService = {
  createApplication,
  getAllApplications,
  getSingleApplication,
  updateApplication,
  deleteApplication,
};
