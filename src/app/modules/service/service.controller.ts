import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceServices } from './service.service';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const result = await ServiceServices.getSingleService(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServices();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const result = await ServiceServices.updateService(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  });
});

export const serviceControllers = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
};
