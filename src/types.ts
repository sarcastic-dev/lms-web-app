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
export interface BasicInfoStaffUser {
	bloodGroup: string;
	dob: string;
	email: string;
	firstName: string;
	gender?: string;
	lastName: string;
	middleName: string;
	phone: string;
	role: "owner" | "teacher" | "non-teaching" ;
  }
  
  export interface BasicInfoStaff {
	appointmentDate: string;
	department: string;
	designation: string;
	employeeID: string;
	employmentType: string;
	esiCodeNumber: string;
	experienceYears: string;
	highestQualification: string;
	jobTitle: string;
	pfAccountNumber: string;
	reportingManager: string;
	uan: string;
  }
  
  export interface BasicInfoEmployee {
	user: BasicInfoStaffUser;
	staff: BasicInfoStaff;
  }
  

export interface AddressStaffInfo {
	addressLine1: string;
	addressLine2: string;
	city: string;
	country: string;
	pincode: string;
	state: string;
}

// export interface EmploymentDetails {
// 	appointmentDate: string;
// 	department: string;
// 	designation: string;
// 	employeeID: string;
// 	employmentType: string;
// 	esiCodeNumber: string;
// 	experienceYears: string;
// 	highestQualification: string;
// 	jobTitle: string;
// 	pfAccountNumber: string;
// 	reportingManager: string;
// 	uan: string;
// }

export interface AdditionalDetails {
	aadharNumber: string;
	category: string;
	emergencyContactNumber: string;
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
	referenceMobileNumber: string;
	relievingDate: string;
}

export interface BankDetails {
	bankAccountNumber: string;
	bankName: string;
	accountHolderName: string;
	ifscCode: string;
}
