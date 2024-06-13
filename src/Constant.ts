const BASE_API_URL = "http://192.168.1.7:3300"

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

export const Designation: SelectType[] = [
	{ value: "Teacher", option: "Teacher" },
	{ value: "Vice-Principal", option: "Vice-Principal" },
	{ value: "Head-of-Department", option: "Head of Department" },
	{ value: "Sports-Teacher", option: "Sports Teacher" },
	{ value: "Coordinator", option: "Coordinator" },
	{ value: "Accountant", option: "Accountant" },
	{ value: "Director", option: "Director" },
	{ value: "Transport-Manager", option: "Transport Manager" },
	{ value: "Maintenance-Supervisor", option: "Maintenance Supervisor" },
	{ value: "Finance-Manager", option: "Finance Manager" },
	{ value: "HR-Manager", option: "HR Manager" },
	{ value: "Attendant", option: "Attendant" },
	{ value: "Admissions-Manager", option: "Admissions Manager" },
	{ value: "Student-Counsellor", option: "Student Counsellor" },
	{ value: "Driver", option: "Driver" },
	{ value: "Maintenance-Staff", option: "Maintenance Staff" },
	{ value: "Principal", option: "Principal" },
	{ value: "Librarian", option: "Librarian" },
	{ value: "Exam-Coordinator", option: "Exam Coordinator" },
];

export const Department: SelectType[] = [
	{ value: "Library", option: "Library" },
	{ value: "Maintenance", option: "Maintenance" },
	{ value: "Student-Affairs", option: "Student Affairs" },
	{ value: "Admissions", option: "Admissions" },
	{ value: "IT", option: "IT" },
	{ value: "Administration", option: "Administration" },
	{ value: "Alumni-Affairs", option: "Alumni Affairs" },
	{ value: "Sports", option: "Sports" },
	{ value: "Examination", option: "Examination" },
	{ value: "Academics", option: "Academics" },
	{ value: "Finance", option: "Finance" },
	{ value: "Human-Resources", option: "Human Resources" },
	{ value: "Transport", option: "Transport" },
	{ value: "Health-and-Safety", option: "Health and Safety" },
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
};

export const educationStages: EducationStage[] = [
	{
		stage: "Pre Primary Stage",
		classes: ["Pre-Nursery", "Nursery", "LKG", "UKG"],
	},
	{
		stage: "Primary Stage",
		classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
	},
	{
		stage: "Middle Stage",
		classes: ["Class 5", "Class 6", "Class 7", "Class 8"],
	},
	{
		stage: "Secondary Stage",
		classes: ["Class 8", "Class 9", "Class 10"],
	},
	{
		stage: "Senior Secondary Stage",
		classes: ["Class 11", "Class 12"],
	},
];

interface Teachers {
    id: string;
    name: string;
}

export const Teachers:Teachers[] = [
    { id: 'teacher1', name: 'Mr. Arun Sharma' },
    { id: 'teacher2', name: 'Ms. Priya Singh' },
    { id: 'teacher3', name: 'Dr. Neha Gupta' },
    { id: 'teacher4', name: 'Mr. Rakesh Kumar' },
    { id: 'teacher5', name: 'Ms. Anjali Mehta' },
  ];