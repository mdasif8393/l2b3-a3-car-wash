import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { BookingControllers } from './booking.controller';
import { BookingValidations } from './booking.validation';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

export const GetSingleBookingRoute = router.get(
  '/',
  auth(USER_ROLE.user),
  BookingControllers.getSingleBooking,
);

export const BookingRoutes = router;
