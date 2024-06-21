import { z } from 'zod';

export const parentInfoSchema = z.object({
  parentName: z
    .string()
    .trim()
    // .min(2, { message: 'Name must be at least 2 characters' })
    .optional(),
  relation: z
    .enum(["Father", "Mother", "Guardian"], )
    .optional(),
  parentEmail: z
    .string()
    .trim()
    // .email({ message: 'Invalid email format' })
    .optional(),
  parentPhone: z
    .string()
    .trim()
    // .regex(/^\d{10}$/, { message: 'Invalid mobile number (10 digits)' })
    .optional(),
  parentQualification: z.string().trim().optional(),
  parentOccupation: z.string().trim().optional(),
  workOrganization: z.string().trim().optional(),
  designation: z.string().trim().optional(),
  annualIncome: z
    .string()
    .trim()
    // .regex(/^\d+$/, { message: 'Invalid annual income (positive integer)' })
    .optional(),
});
