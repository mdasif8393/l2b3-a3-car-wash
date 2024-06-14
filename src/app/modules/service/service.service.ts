import { IService } from './service.interface';
import { Service } from './service.model';

const createService = async (payload: Partial<IService>) => {
  const result = await Service.create(payload);

  return result;
};

export const ServiceServices = {
  createService,
};
