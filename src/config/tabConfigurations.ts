import { CircleDashed, CircleDotDashed, LucideIcon } from "lucide-react"; // Ensure correct imports
import dynamic from "next/dynamic";

export type TabConfig = {
	value: string;
	label: string;
	icon: LucideIcon; // Use the correct type from lucide-react
	component: React.ComponentType<any>;
	strokeWidth?: number;
	step: number;
};

export const studentTabs: TabConfig[] = [
	{
		value: "basic-info",
		label: "1. Basic Information",
		icon: CircleDotDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/BasicInfo")
		),
		strokeWidth: 1,
		step: 1,
	},
	{
		value: "academic-info",
		label: "2. Academic Information",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/AcademicInfo")
		),
		strokeWidth: 1,
		step: 2,
	},
	{
		value: "parent-info",
		label: "3. Parent Information",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/ParentInfo")
		),
		strokeWidth: 1,
		step: 3,
	},
	{
		value: "address-info",
		label: "4. Address Information",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/AddressInfo")
		),
		strokeWidth: 1,
		step: 4,
	},
	{
		value: "medical-info",
		label: "5. Medical Information",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/MedicalInfo")
		),
		strokeWidth: 1,
		step: 5,
	},
	{
		value: "review",
		label: "6. Review & Submit",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/Review") // Create this component
		),
		strokeWidth: 1,
		step: 6,
	},
];

export const staffTabs: TabConfig[] = [
	{
		value: "basic-info",
		label: "1. Basic Information",
		icon: CircleDotDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/BasicInfo")
		),
		strokeWidth: 1,
		step: 1,
	},
	{
		value: "employment-info",
		label: "2. Employment Information",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/EmploymentDetails")
		),
		strokeWidth: 1,
		step: 2,
	},
	{
		value: "address-info",
		label: "3. Address Information",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/AddressInfo")
		),
		strokeWidth: 1,
		step: 3,
	},
	{
		value: "additional-info",
		label: "4. Additional Information",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/AdditionalDetails")
		),
		strokeWidth: 1,
		step: 4,
	},
	{
		value: "previous-info",
		label: "5. Previous Information",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/PreviousExperience")
		),
		strokeWidth: 1,
		step: 5,
	},
	{
		value: "bank-info",
		label: "5. Bank Information",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/BankDetails")
		),
		strokeWidth: 1,
		step: 6,
	},
];
