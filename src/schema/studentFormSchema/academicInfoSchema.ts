import { z } from "zod";

export const programInfoSchema = z.object({
  registrationNumber: z.string().refine((value) => value.trim() !== "", {
    message: "Registration number is required",
  }),
  serialNumber: z.string().refine((value) => value.trim() !== "", {
    message: "Serial number is required",
  }),
  class: z.string().trim().optional(),
  section: z.string().trim().optional(),
  rollNumber: z.string().optional(),
  admissionDate: z.string().trim().optional(),
  boardUniversity: z
    .string()
    .trim()

    .optional(),
});
