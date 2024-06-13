import { z } from "zod";

const additionalEmployeeDetailsSchema = z.object({
	aadharNumber: z.string().trim().optional(),
	panNumber: z.string().trim().optional(),
	religion: z
		.enum([
			"Hindu",
			"Muslim",
			"Christian",
			"Sikh",
			"Buddhist",
			"Jain",
			"Other",
		],{
			required_error: "Religion is required"
		})
		.optional(),
	category: z
		.enum([
			"GEN",
			"GEN-EWS",
			"OBC",
			"OBC-CL",
			"OBC-NCL",
			"SC",
			"ST",
			"Foreigner",
			"Others",
		])
		.optional(),
	fatherName: z.string().trim().optional(),
	motherName: z.string().trim().optional(),
	maritalStatus: z.enum(["married", "unmarried"]).optional(),
	spouseName: z.string().trim().optional(),
	countryCode: z.string().trim().optional(),
	emergencyMobileNumber: z.string().trim().optional(),
});

export default additionalEmployeeDetailsSchema;
export type AdditionalEmployeeDetailsSchemaType = z.infer<typeof additionalEmployeeDetailsSchema>;
