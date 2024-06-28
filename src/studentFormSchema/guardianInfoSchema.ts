import { z } from 'zod';

export const generalInfoSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required*' }),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, { message: 'Invalid mobile number (10 digits)' })
    .optional(),
  emailID: z.string().trim().email({ message: 'Invalid email format' }).optional(),
  relationship: z
    .string()
    .trim(),
  educationalQualification: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  workOrganizationName: z.string().trim().optional(),
  designation: z.string().trim().optional(),
  annualIncome: z
    .string()
    .trim()
    .regex(/^\d+$/, { message: 'Invalid annual income (positive integer)' })
    .optional(),
});
