import { z } from 'zod';

export const healthInfoSchema = z.object({
  weightKg: z
    .string()
    .trim()
    .optional(), // Optional field
    heightCm: z
    .string()
    .trim()

    .optional(), // Optional field
  bmi: z.string().trim().optional(), // Body Mass Index (calculated, not user input)
  pulseRate: z
    .string()
    .trim()

    .optional(), // Optional field
  haemoglobin: z
    .string()
    .trim()

    .optional(), // Optional field
  allergies: z.string().trim().optional(), // Optional field
  reportIssueDate: z
    .string()
    .trim()

    .optional(), // Optional field
});
