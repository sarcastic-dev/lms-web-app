import { z } from "zod";

const indianMobileNumberRegex = /^\+?([0-9]{0,2})?(91)?(0)?([3-9])[0-9]{9}$/;

export const BasicInfoSchema = z.object({
    phone: z.string().regex(indianMobileNumberRegex, { message: "Invalid mobile number" }).optional(),
    email: z.string().email("Invalid email address").refine(value => value.trim() !== '', {
        message: "Email is required",
    }),
    enrolmentID: z.string().refine(value => value.trim() !== '', {
        message: "Enrolment ID is required",
    }),
    firstName: z.string().refine(value => value.trim() !== '', {
        message: "First Name is required",
    }),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    dob: z.string().optional(),
    gender: z.enum(["Male", "Female", "Other"], {
        required_error: "Gender is required"
    }).optional(),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
        required_error: "Blood Group is required"
    }).optional(),
});

export type BasicInfoSchemaType = z.infer<typeof BasicInfoSchema>;
