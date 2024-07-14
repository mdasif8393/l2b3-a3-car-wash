/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { Slot } from '../slot/slot.model';
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

  const isSlotExists = await Slot.findOne({ _id: payload.slot });

  if (!isSlotExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Can not find slot');
  }

  if (
    isSlotExists.isBooked === 'booked' ||
    isSlotExists.isBooked === 'canceled'
  ) {
    throw new AppError(
      httpStatus.CONFLICT,
      'The slot is not available for booking',
    );
  }

  const payloadSlotWithUserId = payload;

  payloadSlotWithUserId['customer'] = userId;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // booked slot
    const updateSlot = await Slot.findOneAndUpdate(
      { _id: payload.slot },
      { isBooked: 'booked' },
    );
    if (!updateSlot) {
      throw new AppError(httpStatus.NOT_MODIFIED, 'Failed to update slot');
    }

    //crate booking
    const bookedSlot = await Booking.create([payloadSlotWithUserId], {
      session,
    });

    if (!bookedSlot) {
      throw new AppError(
        httpStatus.NOT_IMPLEMENTED,
        'Failed to create booked slot',
      );
    }
    await session.commitTransaction();
    await session.endSession();

    return bookedSlot;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllBookings = async () => {
  const result = await Booking.find({}).populate('customer');

  return result;
};

const getSingleBooking = async (tokenWithBearer: string) => {
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

  const result = await Booking.find({ customer: user._id });
  return result;
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  getSingleBooking,
};
