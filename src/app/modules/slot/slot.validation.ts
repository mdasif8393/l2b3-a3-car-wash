import { z } from 'zod';

const timeSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24 hours format',
  },
);

const createSlotValidationSchema = z.object({
  body: z.object({
    service: z.string({
      required_error: 'service is required',
      invalid_type_error: 'service must be string',
    }),
    date: z.string(),
    startTime: timeSchema,
    endTime: timeSchema,
    isBooked: z.enum(['available', 'booked', 'canceled']).optional(),
  }),
});

export const SlotValidations = {
  createSlotValidationSchema,
};
