import { z } from 'zod';

export const programInfoSchema = z.object({
  class: z.string().trim().optional(),
  section: z.string().trim().optional(),
  rollNumber: z.string().optional(),
  admissionDate: z
    .string()
    .trim()
    .optional(),
  boardUniversity: z
    .string()
    .trim()

    .optional(),
});
