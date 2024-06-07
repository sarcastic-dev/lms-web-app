import { LucideIcon } from "lucide-react";

export interface SidebarItems {
	links: Array<{
		label: string;
		href: string;
		icon: LucideIcon;
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

export interface BasicInfo {
	bloodGroup: string;
	classRollNumber: string;
	dateOfAdmission: string;
	dateOfBirth: string;
	email: string;
	enrolmentID: string;
	firstName: string;
	gender: string;
	lastName: string;
	middleName: string;
	mobileNumber: string;
}
export interface AddressInfo {
	addressLine1: string;
	addressLine2: string;
	cityTown: string;
	country: string;
	pincode: string;
	state: string;
}
export interface FatherInfo {
	annualIncome: string;
	designation: string;
	educationalQualification: string;
	emailID: string;
	mobileNumber: string;
	name: string;
	occupation: string;
	workOrganizationName: string;
}
export interface MotherInfo {
	annualIncome: string;
	designation: string;
	educationalQualification: string;
	emailID: string;
	mobileNumber: string;
	name: string;
	occupation: string;
	workOrganizationName: string;
}
export interface GuardianInfo {
	annualIncome: string;
	designation: string;
	educationalQualification: string;
	emailID: string;
	mobileNumber: string;
	name: string;
	occupation: string;
	relationship: string;
	workOrganizationName: string;
}
export interface AcademicInfo {
	admissionYear: string;
	boardUniversity: string;
	programClass: string;
	section: string;
}
export interface MedicalInfo {
	allergies: string;
	bmi: string;
	haemoglobin: string;
	height: string;
	issuedDate: string;
	pulseRate: string;
	weight: string;
}
