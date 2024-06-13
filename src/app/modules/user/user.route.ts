import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  auth('admin'),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidations.loginValidationSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;
