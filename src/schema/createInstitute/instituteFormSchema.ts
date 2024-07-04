// schemas.ts
import { z } from 'zod';

export const instituteSchema = z.object({
  instituteName: z.string().min(1, "Institute name is required."),
  address: z.string().min(1, "Address is required."),
  phoneNumber: z.string().min(1, "Phone number is required."),
  city: z.string().min(1, "City is required."),
  instituteType: z.string().min(1, "Institute type is required."),
  instituteAddress: z.string().min(1, "Institute address is required."),
  academicBoard: z.string().min(1, "Academic board is required"),
});

export type InstituteSchema = z.infer<typeof instituteSchema>;
