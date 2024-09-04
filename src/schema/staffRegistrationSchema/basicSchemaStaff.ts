import { z } from "zod";

const basicSchemaStaff = z.object({
	phone: z
		.string()
		.regex(
			/^\+?([0-9]{0,2})?(91)?(0)?([3-9])[0-9]{9}$/,
			"Invalid mobile number format (10 digits only)"
		), // Phone number pattern
	email: z
		.string()
		.email()
		.refine((value) => value.trim() !== "", {
			message: "Email is required",
		}),
	firstName: z.string().refine((value) => value.trim() !== "", {
		message: "First Name is required",
	}),
	middleName: z.string().optional(),
	lastName: z.string().optional(),
	dob: z.string().optional(), // Assuming date validation is not required here
	gender: z.string().optional(),
	bloodGroup: z.string().optional(),
	role: z
		.enum(["owner", "teacher", "non-teaching"], {
			message:
				'Invalid user role. Choose "owner", "teacher", or "non-teaching"',
		})
		.refine((value) => value?.trim() !== "", {
			message: "User Role is required",
		}), // Ensures non-empty role
	instituteId: z.string().optional(),
});

export default basicSchemaStaff;
export type BasicInfoSchemaStaffType = z.infer<typeof basicSchemaStaff>;

//

// import { z } from "zod";

// const basicSchemaStaff = z.object({
// 	mobileNumber: z
// 		.string()
// 		.regex(
// 			/^\+?([0-9]{0,2})?(91)?(0)?([3-9])[0-9]{9}$/,
// 			"Invalid mobile number format (10 digits only)"
// 		), // Phone number pattern
// 	emailID: z
// 		.string()
// 		.email()
// 		.refine((value) => value.trim() !== "", {
// 			message: "Email is required",
// 		}),
// 	employeeID: z
// 		.string()
// 		.refine((value) => value.trim() !== "", {
// 			message: "Employee ID is required",
// 		}),
// 	firstName: z
// 		.string()
// 		.refine((value) => value.trim() !== "", {
// 			message: "First Name is required",
// 		}),
// 	middleName: z.string().optional(),
// 	lastName: z.string().optional(),
// 	dateOfBirth: z.string().optional(), // Assuming date validation is not required here
//     gender: z.enum(["Male", "Female", "Other"], {
//         required_error: "Gender is required"
//     }),
//     bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
//         required_error: "Blood Group is required"
//     }),
// 	userRole: z
// 		.enum(["Owner", "Teacher", "Non-Teaching"], {
// 			message:
// 				'Invalid user role. Choose "owner", "teacher", or "non-teaching"',
// 		})
// 		.refine((value) => value?.trim() !== "", {
// 			message: "User Role is required",
// 		}), // Ensures non-empty role
// });

// export default basicSchemaStaff;
// export type BasicInfoSchemaStaffType = z.infer<typeof basicSchemaStaff>;
