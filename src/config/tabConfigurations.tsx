import { CircleDashed, CircleDotDashed, LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Loading from "@/components/FormLoading"; // Ensure correct import path

export type TabConfig = {
	value: string;
	label: string;
	icon: LucideIcon;
	component: React.ComponentType<any>;
	strokeWidth?: number;
	step: number;
};

export const studentTabs: TabConfig[] = [
	{
		value: "basic-info",
		label: "1. Basic Info",
		icon: CircleDotDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/BasicInfo"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 1,
	},
	{
		value: "academic-info",
		label: "2. Academic Info",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/AcademicInfo"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 2,
	},
	{
		value: "parent-info",
		label: "3. Parent Info",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/ParentInfo"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 3,
	},
	{
		value: "address-info",
		label: "4. Address Info",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/AddressInfo"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 4,
	},
	{
		value: "medical-info",
		label: "5. Medical Info",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/MedicalInfo"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 5,
	},
	{
		value: "review",
		label: "6. Review & Submit",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StudentRegistration/Review"), // Create this component
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 6,
	},
];

export const staffTabs: TabConfig[] = [
	{
		value: "basic-info",
		label: "1. Basic Info",
		icon: CircleDotDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/BasicInfo"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 1,
	},
	{
		value: "employment-info",
		label: "2. Employment Info",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/EmploymentDetails"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 2,
	},
	{
		value: "address-info",
		label: "3. Address Info",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/AddressInfo"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 3,
	},
	{
		value: "additional-info",
		label: "4. Additional Info",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/AdditionalDetails"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 4,
	},
	{
		value: "previous-info",
		label: "5. Previous Info",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/PreviousExperience"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 5,
	},
	{
		value: "bank-info",
		label: "5. Bank Info",
		icon: CircleDashed,
		component: dynamic(
			() => import("@/components/StaffRegistration/BankDetails"),
			{ loading: () => <Loading /> }
		),
		strokeWidth: 1,
		step: 6,
	},
];
