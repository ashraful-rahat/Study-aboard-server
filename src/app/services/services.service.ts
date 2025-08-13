import { IService } from '../interfaces/services.interface';
import Service from '../models/services.model';

const createService = async (data: IService) => await Service.create(data);

const getAllServices = async () => await Service.find();

const getServiceById = async (id: string) => await Service.findById(id);
const getServiceBySlug = async (slug: string) => {
  // ✅ এখানে { slug: slug } অথবা শুধু { slug } ব্যবহার করুন
  return await Service.findOne({ slug });
};
const updateService = async (id: string, data: Partial<IService>) =>
  await Service.findByIdAndUpdate(id, data, { new: true });

const deleteService = async (id: string) => await Service.findByIdAndDelete(id);

export const serviceService = {
  createService,
  getAllServices,
  getServiceBySlug,
  getServiceById,
  updateService,
  deleteService,
};
