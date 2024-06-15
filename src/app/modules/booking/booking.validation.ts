import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    customer: z.string().optional(),
    service: z.string(),
    slot: z.string(),
    vehicleType: z.enum([
      'car',
      'truck',
      'SUV',
      'van',
      'motorcycle',
      'bus',
      'electricVehicle',
      'hybridVehicle',
      'bicycle',
      'tractor',
    ]),
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number(),
    registrationPlate: z.string(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
