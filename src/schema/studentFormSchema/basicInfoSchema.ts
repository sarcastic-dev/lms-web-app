import { z } from "zod";

const indianMobileNumberRegex = /^\+?([0-9]{0,2})?(91)?(0)?([3-9])[0-9]{9}$/;

export const BasicInfoSchema = z.object({
    phone: z.string().regex(indianMobileNumberRegex, { message: "Invalid mobile number" }).optional(),
    email: z.string().email("Invalid email address").refine(value => value.trim() !== '', {
        message: "Email is required",
    }),
    firstName: z.string().refine(value => value.trim() !== '', {
        message: "First Name is required",
    }),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    dob: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    role:z.string().optional()
});

export type BasicInfoSchemaType = z.infer<typeof BasicInfoSchema>;
