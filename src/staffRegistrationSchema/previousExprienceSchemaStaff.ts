import { z } from "zod";

export const previousExperienceSchema = z.object({
	instituteName: z.string().trim(),
	jobTitle: z.string().trim(),
	joiningDate: z.string().trim().optional(), // Assuming date validation is not required here
	relievingDate: z.string().trim().optional(), // Assuming date validation is not required here
	location: z.string().trim().optional(),
	referenceName: z.string().trim().optional(),
	referenceNumber: z
	.string(),
});

export default previousExperienceSchema;
export type PreviousExperienceSchemaStaffType = z.infer<
	typeof previousExperienceSchema
>;
