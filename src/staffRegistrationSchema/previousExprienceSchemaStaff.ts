import { z } from "zod";

export const previousExperienceSchema = z.object({
	instituteName: z.string().trim().min(1, "Institute Name is required"),
	jobTitle: z.string().trim().min(1, "Job Title is required"),
	joiningDate: z.string().trim().optional(), // Assuming date validation is not required here
	relievingDate: z.string().trim().optional(), // Assuming date validation is not required here
	location: z.string().trim().optional(),
	referenceName: z.string().trim().optional(),
	countryCode: z.string().trim().optional(),
	referenceNumber: z
	.string()
	.regex(
		/^\+?([0-9]{0,2})?(91)?(0)?([3-9])[0-9]{9}$/,
		"Invalid mobile number format (10 digits only)"
	)
});

export default previousExperienceSchema;
export type PreviousExperienceSchemaStaffType = z.infer<
	typeof previousExperienceSchema
>;
