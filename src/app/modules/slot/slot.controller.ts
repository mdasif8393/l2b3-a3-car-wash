import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlot(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slots created successfully',
    data: result,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlots(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'available slots retrieve successfully',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getAllSlots,
};
