import { z } from "zod";

export const parentInfoSchema = z.object({
	name: z
		.string()
		.trim()
		// .min(2, { message: 'Name must be at least 2 characters' })
		.optional(),
	relation: z.string().optional(),
	email: z
		.string()
		.trim()
		// .email({ message: 'Invalid email format' })
		.optional(),
	phone: z
		.string()
		.trim()
		// .regex(/^\d{10}$/, { message: 'Invalid mobile number (10 digits)' })
		.optional(),
	qualification: z.string().trim().optional(),
	occupation: z.string().trim().optional(),
	workOrganizationName: z.string().trim().optional(),
	designation: z.string().trim().optional(),
	annualIncome: z
		.string()
		.trim()
		// .regex(/^\d+$/, { message: 'Invalid annual income (positive integer)' })
		.optional(),
});
