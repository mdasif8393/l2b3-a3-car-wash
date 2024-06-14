import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { serviceControllers } from './service.controller';
import { ServiceValidations } from './service.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidations.createServiceValidationSchema),
  auth(USER_ROLE.admin),
  serviceControllers.createService,
);

router.get('/:id', serviceControllers.getSingleService);

router.get('/', serviceControllers.getAllServices);

export const ServiceRoutes = router;
