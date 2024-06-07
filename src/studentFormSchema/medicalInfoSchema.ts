import { z } from 'zod';

export const healthInfoSchema = z.object({
  weight: z
    .string()
    .trim()
    .regex(/^\d+(\.\d+)?$/, { message: 'Invalid weight format (positive number)' })
    .optional(), // Optional field
  height: z
    .string()
    .trim()
    .regex(/^\d+$/, { message: 'Invalid height format (positive integer)' })
    .optional(), // Optional field
  bmi: z.string().trim().optional(), // Body Mass Index (calculated, not user input)
  pulseRate: z
    .string()
    .trim()
    .regex(/^\d+$/, { message: 'Invalid pulse rate format (positive integer)' })
    .optional(), // Optional field
  haemoglobin: z
    .string()
    .trim()
    .regex(/^\d+(\.\d+)?$/, { message: 'Invalid haemoglobin format (positive number)' })
    .optional(), // Optional field
  allergies: z.string().trim().optional(), // Optional field
  issuedDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid issued date format (YYYY-MM-DD)' })
    .optional(), // Optional field
});
