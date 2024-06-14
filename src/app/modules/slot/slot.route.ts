import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { SlotControllers } from './slot.controller';
import { SlotValidations } from './slot.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot,
);

export const SlotRoutes = router;

export const GetAllSlotsRoute = router.get('/', SlotControllers.getAllSlots);
