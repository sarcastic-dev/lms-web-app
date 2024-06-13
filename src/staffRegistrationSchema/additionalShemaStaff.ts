import { z } from "zod";

const additionalEmployeeDetailsSchema = z.object({
	aadharNumber: z.string().trim().optional(), // Assuming Aadhar Number is optional
	panNumber: z.string().trim().optional(), // Assuming PAN Number is optional
	religion: z
		.enum([
			"Hindu",
			"Muslim",
			"Christian",
			"Sikh",
			"Buddhist",
			"Jain",
			"Other",
		])
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
	countryCode: z.string().trim().optional(), // Assuming Country Code is optional
	emergencyMobileNumber: z.string().trim().optional(), // Assuming Emergency Contact Number is optional
});

export default additionalEmployeeDetailsSchema;
export type AdditionalEmployeeDetailsSchemaType = z.infer<typeof additionalEmployeeDetailsSchema>;