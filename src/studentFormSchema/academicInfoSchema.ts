import { z } from 'zod';

export const programInfoSchema = z.object({
  programClass: z.string().trim().min(1, { message: 'Program/Class is required*' }),
  section: z.string().trim().min(1, { message: 'Section is required*' }),
  admissionYear: z
    .string()
    .trim()
    .regex(/^\d{4}$/, { message: 'Invalid admission year (YYYY)' })
    .min(1, { message: 'Admission Year is required*' }),
  boardUniversity: z
    .string()
    .trim()
    .min(1, { message: 'Board/University is required*' }),
});
