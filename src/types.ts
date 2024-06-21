import { LucideIcon } from "lucide-react";

export interface SidebarItems {
	links: Array<{
		label: string;
		href: string;
		icon: LucideIcon;
		className: string;
	}>;
}

export interface StepProps {
	step: number;
	currentStep: number;
	description: string;
	icon: LucideIcon;
}

export interface StepperProps {
	step: number;
}

export interface IconProps {
	className: string;
}

export interface BasicInfoUser {
	bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-" | undefined;
	dob: string;
	email: string;
	firstName: string;
	gender?: "Male" | "Female" | "Other"|undefined;
	lastName: string;
	middleName: string;
	phone: string;
}

export interface BasicInfoStudent {
	enrolmentID: string;
	admissionDate: string;
	boardUniversity: string;
	class: string;
	rollNumber: string;
	section: string;
}

export interface BasicInfo {
	user: BasicInfoUser;
	student: BasicInfoStudent;
}

export interface AddressInfo {
	addressLine1: string;
	addressLine2: string;
	city: string;
	country: string;
	pincode: string;
	state: string;
}

export interface ParentInfo {
	parentName: string;
	relation:  "Father" | "Mother" | "Guardian";
	parentEmail: string;
	parentPhone: string;
	parentQualification: string;
	parentOccupation: string;
	workOrganization: string;
	designation: string;
	annualIncome: string;
}

// export interface GuardianInfo {
// 	annualIncome: string;
// 	designation: string;
// 	educationalQualification: string;
// 	emailID: string;
// 	mobileNumber: string;
// 	name: string;
// 	occupation: string;
// 	relationship: string;
// 	workOrganizationName: string;
// }

export interface MedicalInfo {
	allergies: string;
	bmi: string;
	haemoglobin: string;
	heightCm: string;
	issueDateOfReport: string;
	pulseRate: string;
	weightKg: string;
}

// Staff information types
export interface BasicStaffInfo {
	bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
	dateOfBirth: string;
	emailID: string;
	employeeID: string;
	firstName: string;
	gender: "Male" | "Female" | "Other";
	lastName: string;
	middleName: string;
	mobileNumber: string;
	userRole: "Owner" | "Teacher" | "Non-Teaching";
}

export interface AddressStaffInfo {
	addressLine1: string;
	addressLine2: string;
	cityTown: string;
	country: string;
	pincode: string;
	state: string;
}

export interface EmploymentDetails {
	appointmentDate: string;
	department: string;
	designation: string;
	employmentType: string;
	esiCodeNumber: string;
	experience: string;
	highestQualification: string;
	jobTitle: string;
	pfAccountNumber: string;
	reportingManager: string;
	uan: string;
}

export interface AdditionalDetails {
	aadharNumber: string;
	category: string;
	emergencyMobileNumber: string;
	fatherName: string;
	maritalStatus: string;
	motherName: string;
	panNumber: string;
	religion: string;
	spouseName: string;
}

export interface PreviousExperience {
	instituteName: string;
	jobTitle: string;
	joiningDate: string;
	location: string;
	referenceName: string;
	referenceNumber: string;
	relievingDate: string;
}

export interface BankDetails {
	accountNo: string;
	bankName: string;
	holderName: string;
	ifscCode: string;
}
