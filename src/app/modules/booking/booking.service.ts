import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (
  tokenWithBearer: string,
  payload: Partial<IBooking>,
) => {
  const token = tokenWithBearer.split(' ')[1];

  // decode token and get user
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const userId = user._id;

  const payloadSlotWithUserId = payload;

  payloadSlotWithUserId['customer'] = userId;

  const result = await Booking.create(payloadSlotWithUserId);

  return result;
};

const getAllBookings = async () => {
  const result = await Booking.find({});

  return result;
};

export const BookingServices = {
  createBooking,
  getAllBookings,
};
