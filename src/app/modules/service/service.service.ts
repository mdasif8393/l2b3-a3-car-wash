import { IService } from './service.interface';
import { Service } from './service.model';

const createService = async (payload: Partial<IService>) => {
  const result = await Service.create(payload);

  return result;
};

const getSingleService = async (_id: string) => {
  const result = await Service.findById(_id);

  return result;
};

const getAllServices = async () => {
  const result = await Service.find({});
  console.log(result);
  return result;
};

export const ServiceServices = {
  createService,
  getSingleService,
  getAllServices,
};
