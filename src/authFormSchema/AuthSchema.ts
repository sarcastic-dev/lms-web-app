import { z } from "zod";

const indianMobileNumberRegex = /^\+?([0-9]{0,2})?(91)?(0)?([3-9])[0-9]{9}$/;

export const AuthSchema = z.object({
  phone: z
    .string()
    .regex(indianMobileNumberRegex, { message: "Invalid mobile number" })
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .refine((value) => value.trim() !== "", {
      message: "Email is required",
    }),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
