import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBooking(
    req.headers.authorization as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is created succesfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookings();

  if (result.length <= 0) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings are retrieved succesfully',
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getSingleBooking(
    req.headers.authorization as string,
  );

  if (result.length <= 0) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved succesfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getSingleBooking,
};
