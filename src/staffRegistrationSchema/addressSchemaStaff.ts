import { z } from "zod";

export const addressSchema = z.object({
	addressLine1: z
		.string()
		.trim(),
	addressLine2: z.string().trim().optional(),
	city: z.string().trim(),
	state: z.string().trim(),
	pincode: z
		.string()
		.trim()
		
		.optional(),
	country: z.string().trim(),
});
export type AddressSchemaStaffType = z.infer<typeof addressSchema>;
