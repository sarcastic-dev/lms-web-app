import { z } from "zod";

const employmentSchema = z.object({
	employeeId: z
	.string()
	.refine((value) => value.trim() !== "", {
		message: "Employee ID is required",
	}),
	jobTitle: z.string().trim().optional(),
	designation: z.string().optional(),
	department: z.string().optional(),
	employmentType: z.string().trim().optional(),
	appointmentDate: z.string().trim().optional(), // Assuming date validation is not required here
	experienceYears: z.string().optional(), // Non-negative years of experience
	highestQualification: z.string().trim().optional(),
	uan: z.string().trim().optional(),
	pfAccountNumber: z.string().trim().optional(),
	esiCodeNumber: z.string().trim().optional(),
	reportingManager: z.string().optional(),
});

export default employmentSchema;
export type EmploymentStaffSchemaType = z.infer<typeof employmentSchema>;




/*
	designation: z.enum([
		"Teacher",
		"Vice-Principal",
		"Head of Department",
		"Sports Teacher",
		"Coordinator",
		"Accountant",
		"Director",
		"Transport Manager",
		"Maintenance Supervisor",
		"Finance Manager",
		"HR Manager",
		"Attendant",
		"Admissions Manager",
		"Student Counsellor",
		"Driver",
		"Maintenance Staff",
		"Principal",
		"Librarian",
		"Exam Coordinator",
	]).optional(),
	department: z.enum([
		"Library",
		"Maintenance",
		"Student Affairs",
		"Admissions",
		"IT",
		"Administration",
		"Alumni Affairs",
		"Sports",
		"Examination",
		"Academics",
		"Finance",
		"Human Resources",
		"Transport",
		"Health and Safety",
		"Communications",
	]).optional(),
*/