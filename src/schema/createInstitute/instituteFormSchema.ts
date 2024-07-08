// schemas.ts
import { z } from 'zod';

export const instituteSchema = z.object({
  name: z.string().min(1, "Institute name is required."),
  email: z.string().min(1, "Email is required."),
  phone: z.string().min(1, "Phone number is required."),
  city: z.string().min(1, "City is required."),
  type: z.string().min(1, "Institute type is required."),
  address: z.string().min(1, "Institute address is required."),
  boardUniversity: z.string().min(1, "Academic board is required"),
});

export type InstituteSchema = z.infer<typeof instituteSchema>;
