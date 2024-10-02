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
	bloodGroup: string;
	dob: string;
	email: string;
	firstName: string;
	gender?: string;
	lastName: string;
	middleName: string;
	phone: string;
	role: string;
	instituteId: string;
}

export interface BasicInfoStudent {
	enrollmentId: string;
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
	pinCode: string;
	state: string;
}

export interface ParentInfo {
	name: string;
	relation: string;
	email: string;
	phone: string;
	qualification: string;
	occupation: string;
	workOrganizationName: string;
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
	reportIssueDate: string;
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
	role: "owner" | "teacher" | "non-teaching";
	instituteId: string;
}

export interface BasicInfoStaff {
	employeeId: string;
	appointmentDate: string;
	department: string;
	designation: string;
	employmentType: string;
	experienceYears: string;
	highestQualification: string;
	jobTitle: string;
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
	pinCode: string;
	state: string;
}

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STAFF SLICE
export interface Staff {
	basicInfo: {
		user: BasicInfoStaffUser;
		staff: BasicInfoStaff;
	};
	addressInfo: AddressStaffInfo;
	additionalInfo: AdditionalDetails;
	previousExperienceInfo: PreviousExperience;
	bankDetailInfo: BankDetails;
}

export interface StaffState {
	staffData: Staff;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	viewState: "view" | "edit" | null;
}

// STUDENT SLICE

export interface Student {
	basicInfo: {
		user: BasicInfoUser;
		student: BasicInfoStudent;
	};
	addressInfo: AddressInfo;
	parentInfo: ParentInfo;
	medicalInfo: MedicalInfo;
}

export interface StudentState {
	studentData: Student;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	viewState: "view" | "edit" | "add";
}

interface Section {
	id: string;
	name: string;
}

interface Class {
	id: string;
	name: string;
	level: string;
	status: string;
	sections: Section[];
}

export interface Stage {
	stage: string;
	classes: Class[];
}

export interface StructuredStaffResponse {
	basicInfo: Omit<BasicInfoStaffUser, "role" | "instituteId">;
	staffInfo: Omit<BasicInfoStaff, "staffId">;
	addressInfo: AddressInfo;
	additionalInfo: AdditionalDetails;
	previousExperienceInfo: PreviousExperience;
	bankDetailInfo: BankDetails;
}

export interface StructuredResponse {
	basicInfo: Omit<BasicInfoUser, "role" | "instituteId">;
	academicInfo: BasicInfoStudent;
	addressInfo: AddressInfo;
	parentInfo: ParentInfo;
	medicalInfo: MedicalInfo;
}
