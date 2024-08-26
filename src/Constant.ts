import { Ban, BellRing, Laugh, LucideIcon } from "lucide-react";

const BASE_API_URL = "http://192.168.1.7:3300";

interface SelectType {
	value: string;
	option: string;
}

export const Gender: SelectType[] = [
	{ value: "Male", option: "Male" },
	{ value: "Female", option: "Female" },
	{ value: "Other", option: "Other" },
];

export const BloodGroups: SelectType[] = [
	{ value: "A+", option: "A+" },
	{ value: "A-", option: "A-" },
	{ value: "B+", option: "B+" },
	{ value: "B-", option: "B-" },
	{ value: "AB+", option: "AB+" },
	{ value: "AB-", option: "AB-" },
	{ value: "O+", option: "O+" },
	{ value: "O-", option: "O-" },
];

export const Class: SelectType[] = [
	{ value: "12th", option: "12th" },
	{ value: "11th", option: "11th" },
	{ value: "10th", option: "10th" },
	{ value: "9th", option: "9th" },
	{ value: "8th", option: "8th" },
	{ value: "7th", option: "7th" },
	{ value: "6th", option: "6th" },
	{ value: "5th", option: "5th" },
];

export const Section: SelectType[] = [
	{ value: "A", option: "A" },
	{ value: "B", option: "B" },
	{ value: "C", option: "C" },
	{ value: "D", option: "D" },
	
];

export const Designation: SelectType[] = [
	{ value: "Teacher", option: "Teacher" },
	{ value: "Vice Principal", option: "Vice-Principal" },
	{ value: "Head Of Department", option: "Head Of Department" },
	{ value: "Sports Teacher", option: "Sports Teacher" },
	{ value: "Coordinator", option: "Coordinator" },
	{ value: "Accountant", option: "Accountant" },
	{ value: "Director", option: "Director" },
	{ value: "Transport Manager", option: "Transport Manager" },
	{ value: "Maintenance Supervisor", option: "Maintenance Supervisor" },
	{ value: "Finance Manager", option: "Finance Manager" },
	{ value: "HR-Manager", option: "HR Manager" },
	{ value: "Attendant", option: "Attendant" },
	{ value: "Admissions Manager", option: "Admissions Manager" },
	{ value: "Student Counsellor", option: "Student Counsellor" },
	{ value: "Driver", option: "Driver" },
	{ value: "Maintenance Staff", option: "Maintenance Staff" },
	{ value: "Principal", option: "Principal" },
	{ value: "Librarian", option: "Librarian" },
	{ value: "Exam-Coordinator", option: "Exam Coordinator" },
];

export const Department: SelectType[] = [
	{ value: "Library", option: "Library" },
	{ value: "Maintenance", option: "Maintenance" },
	{ value: "Student Affairs", option: "Student Affairs" },
	{ value: "Admissions", option: "Admissions" },
	{ value: "IT", option: "IT" },
	{ value: "Administration", option: "Administration" },
	{ value: "Alumni Affairs", option: "Alumni Affairs" },
	{ value: "Sports", option: "Sports" },
	{ value: "Examination", option: "Examination" },
	{ value: "Academics", option: "Academics" },
	{ value: "Finance", option: "Finance" },
	{ value: "Human Resources", option: "Human Resources" },
	{ value: "Transport", option: "Transport" },
	{ value: "Health And Safety", option: "Health and Safety" },
	{ value: "Communications", option: "Communications" },
];

export const Religion = [
	{ value: "Hindu", option: "Hindu" },
	{ value: "Muslim", option: "Muslim" },
	{ value: "Christian", option: "Christian" },
	{ value: "Sikh", option: "Sikh" },
	{ value: "Buddhist", option: "Buddhist" },
	{ value: "Jain", option: "Jain" },
	{ value: "Other", option: "Other" },
];

export const Category = [
	{ value: "GEN", option: "GEN" },
	{ value: "GEN-EWS", option: "GEN-EWS" },
	{ value: "OBC", option: "OBC" },
	{ value: "OBC-CL", option: "OBC-CL" },
	{ value: "OBC-NCL", option: "OBC-NCL" },
	{ value: "SC", option: "SC" },
	{ value: "ST", option: "ST" },
	{ value: "Foreigner", option: "Foreigner" },
	{ value: "Others", option: "Others" },
];

interface EducationStage {
	stage: string;
	classes: string[];
}

export const educationStages = [
	{
		stage: "Pre Primary Stage",
		classes: [
			{ name: "Pre-Nursery", level: "P" },
			{ name: "Nursery", level: "N" },
			{ name: "LKG", level: "L" },
			{ name: "UKG", level: "U" },
		],
	},
	{
		stage: "Primary Stage",
		classes: [
			{ name: "Class 1", level: "1" },
			{ name: "Class 2", level: "2" },
			{ name: "Class 3", level: "3" },
		],
	},
	{
		stage: "Middle Stage",
		classes: [
			{ name: "Class 4", level: "4" },
			{ name: "Class 5", level: "5" },
			{ name: "Class 6", level: "6" },
		],
	},
	{
		stage: "Secondary Stage",
		classes: [
			{ name: "Class 7", level: "7" },
			{ name: "Class 8", level: "8" },
			{ name: "Class 9", level: "9" },
			{ name: "Class 10", level: "10" },
		],
	},
	{
		stage: "Senior Secondary Stage",
		classes: [
			{ name: "Class 11", level: "11" },
			{ name: "Class 12", level: "12" },
		],
	},
];

interface Teachers {
	id: string;
	name: string;
}

export const Teachers: Teachers[] = [
	{ id: "teacher1", name: "Mr. Arun Sharma" },
	{ id: "teacher2", name: "Ms. Priya Singh" },
	{ id: "teacher3", name: "Dr. Neha Gupta" },
	{ id: "teacher4", name: "Mr. Rakesh Kumar" },
	{ id: "teacher5", name: "Ms. Anjali Mehta" },
];
export const classStages: EducationStage[] = [
	{
		stage: "Senior Secondary Stage",
		classes: ["Class 12", "Class 11"],
	},
	{
		stage: "Secondary Stage",
		classes: ["Class 10", "Class 9"],
	},
	{
		stage: "Middle Stage",
		classes: ["Class 8", "Class 7", "Class 6", "Class 5"],
	},
	{
		stage: "Primary Stage",
		classes: ["Class 5", "Class 4", "Class 3", "Class 2", "Class 1"],
	},
	{
		stage: "Pre Primary Stage",
		classes: ["UKG", "LKG", "Nursery", "Pre-Nursery"],
	},
];

export const attendanceOverview = [
	{
		title: "Total Students",
		data: "10,000",
		color: "text-white",
		backgroundColor: "bg-[#6BA2DC]",
		headingColor: "text-white"
	},
	{
		title: "Total Present",
		data: "9,500",
		color: "text-[#24A148]",
		backgroundColor: "bg-[#D3ECDA]",
		headingColor: "text-[#24A148]"
	},
	{
		title: "Total Absent",
		data: "400",
		color: "text-[#C92710]",
		backgroundColor: "bg-[#F4D4CF]",
		headingColor: "text-[#C92710]"
	},
	{
		title: "Not Marked",
		data: "100",
		color: "text-white",
		backgroundColor: "bg-black",
		headingColor: "text-white"
	},
];

export interface insights {
	content: string;
	bgColor: string;
	emoji: LucideIcon;
}

export const insights = [
	{
		content: "All classes have done taken attendance",
		bgColor: "bg-green-50",
		emoji: Laugh,
		color: "text-green-400",
	},
	{
		content: "Attendance is not taken",
		bgColor: "bg-red-50",
		emoji: Ban,
		color: "text-red-400",
	},
	{
		content: "Take attendance before 1st period",
		bgColor: "bg-yellow-50",
		emoji: BellRing,
		color: "text-yellow-400",
	},
];

export const detailedReport = [
	{
		title: "Class & Section",
		data: "12 - A",
	},
	{
		title: "Class Teacher",
		data: "Shubham Jain",
	},
	{
		title: "Total Student",
		data: "90",
	},
	{
		title: "Present",
		data: "72",
	},
	{
		title: "Absent",
		data: "18",
	},
];

export const colorPalette = [
	{
		bgColor: "bg-red-100",
		shadowColor: "shadow-red-200",
		outlineColor: "outline-red-200",
	},
	{
		bgColor: "bg-blue-100",
		shadowColor: "shadow-blue-200",
		outlineColor: "outline-blue-200",
	},
	{
		bgColor: "bg-emerald-100",
		shadowColor: "shadow-emerald-200",
		outlineColor: "outline-emerald-200",
	},
	{
		bgColor: "bg-purple-100",
		shadowColor: "shadow-purple-200",
		outlineColor: "outline-purple-200",
	},

	{
		bgColor: "bg-amber-100",
		shadowColor: "shadow-amber-200",
		outlineColor: "outline-amber-200",
	},
];
