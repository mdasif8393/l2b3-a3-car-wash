import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { serviceControllers } from './service.controller';
import { ServiceValidations } from './service.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  serviceControllers.createService,
);

router.get('/:id', serviceControllers.getSingleService);

router.get('/', serviceControllers.getAllServices);

router.put('/:id', auth(USER_ROLE.admin), serviceControllers.updateService);

router.delete('/:id', auth(USER_ROLE.admin), serviceControllers.deleteService);

export const ServiceRoutes = router;
