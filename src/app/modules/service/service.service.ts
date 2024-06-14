import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
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
  return result;
};

const updateService = async (_id: string, payload: Partial<IService>) => {
  const service = await Service.findById(_id);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const result = Service.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteService = async (_id: string) => {
  const result = await Service.findByIdAndUpdate(
    _id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const ServiceServices = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
  deleteService,
};
