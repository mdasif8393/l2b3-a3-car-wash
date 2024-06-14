import { z } from 'zod';

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'name must be string',
    }),
    description: z.string({
      required_error: 'description is required',
      invalid_type_error: 'description must be string',
    }),
    price: z.number({
      required_error: 'price is required',
      invalid_type_error: 'price must be number',
    }),
    duration: z.number({
      required_error: 'duration is required',
      invalid_type_error: 'duration must be number',
    }),
    isDeleted: z.boolean({
      invalid_type_error: 'isDeleted must be boolean',
    }),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required',
        invalid_type_error: 'name must be string',
      })
      .optional(),
    description: z
      .string({
        required_error: 'description is required',
        invalid_type_error: 'description must be string',
      })
      .optional(),
    price: z
      .number({
        required_error: 'price is required',
        invalid_type_error: 'price must be number',
      })
      .optional(),
    duration: z
      .number({
        required_error: 'duration is required',
        invalid_type_error: 'duration must be number',
      })
      .optional(),
    isDeleted: z
      .boolean({
        invalid_type_error: 'isDeleted must be boolean',
      })
      .optional(),
  }),
});

export const ServiceValidations = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};
