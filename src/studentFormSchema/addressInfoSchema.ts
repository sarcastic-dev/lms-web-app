import { z } from "zod";

export const addressSchema = z.object({
    addressLine1: z
        .string()
        .trim()

        .optional(),
    addressLine2: z.string().trim().optional(),
    city: z
        .string()
        .trim()

        .optional(),
    state: z
        .string()
        .trim()

        .optional(),
    pinCode: z
        .string()
        .trim()

        .optional(),
    country: z
        .string()
        .trim()

        .optional(),
});
