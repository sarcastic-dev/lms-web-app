import { z } from "zod";

const indianMobileNumberRegex = /^\+?([0-9]{0,2})?(91)?(0)?([3-9])[0-9]{9}$/;

export const AuthSchema = z.object({
  email_or_phone_number: z.string().nonempty("Email or phone number is required"),
  password: z.string().optional(),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
