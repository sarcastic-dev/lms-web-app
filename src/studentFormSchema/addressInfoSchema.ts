import { z } from 'zod';

export const addressSchema = z.object({
  addressLine1: z.string().trim().min(1, { message: 'Address Line 1 is required' }),
  addressLine2: z.string().trim().optional(),
  cityTown: z.string().trim().min(1, { message: 'City/Town is required' }),
  state: z.string().trim().min(1, { message: 'State is required' }),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, { message: 'Invalid pincode (6 digits)' })
    .optional(),
  country: z.string().trim().min(1, { message: 'Country is required' }),
});
