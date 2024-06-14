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

export interface BasicInfo {
    bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
    classRollNumber: string;
    dateOfAdmission: string;
    dateOfBirth: string;
    email: string;
    enrolmentID: string;
    firstName: string;
    gender?: "Male" | "Female" | "Other";
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

// //////////////////////////////////////////////////////////////////////////////////////////////////
// staff information types
export interface BasicStaffInfo {
    bloodGroup:  "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
    dateOfBirth: string;
    emailID: string;
    employeeID: string;
    firstName: string;
    gender: "Male" | "Female" | "Other";
    lastName: string;
    middleName: string;
    mobileNumber: string;
    userRole: "Owner"|"Teacher"|"Non-Teaching";
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