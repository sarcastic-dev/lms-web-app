interface SelectType {
    value: string,
    option: string
}

export const Gender: SelectType[] = [
    { value: "Male", option: "Male" },
    { value: "Female", option: "Female" },
    { value: "Other", option: "Other" }
];

export const BloodGroups: SelectType[] = [
    { value: 'A+', option: 'A+' },
    { value: 'A-', option: 'A-' },
    { value: 'B+', option: 'B+' },
    { value: 'B-', option: 'B-' },
    { value: 'AB+', option: 'AB+' },
    { value: 'AB-', option: 'AB-' },
    { value: 'O+', option: 'O+' },
    { value: 'O-', option: 'O-' }
];

export const Designation: SelectType[] = [
    { value: 'teacher', option: 'Teacher' },
    { value: 'vice-principal', option: 'Vice-Principal' },
    { value: 'head-of-department', option: 'Head of Department' },
    { value: 'sports-teacher', option: 'Sports Teacher' },
    { value: 'coordinator', option: 'Coordinator' },
    { value: 'accountant', option: 'Accountant' },
    { value: 'director', option: 'Director' },
    { value: 'transport-manager', option: 'Transport Manager' },
    { value: 'maintenance-supervisor', option: 'Maintenance Supervisor' },
    { value: 'finance-manager', option: 'Finance Manager' },
    { value: 'hr-manager', option: 'HR Manager' },
    { value: 'attendant', option: 'Attendant' },
    { value: 'admissions-manager', option: 'Admissions Manager' },
    { value: 'student-counsellor', option: 'Student Counsellor' },
    { value: 'driver', option: 'Driver' },
    { value: 'maintenance-staff', option: 'Maintenance Staff' },
    { value: 'principal', option: 'Principal' },
    { value: 'librarian', option: 'Librarian' },
    { value: 'exam-coordinator', option: 'Exam Coordinator' },
];
export const Department: SelectType[] = [
    { value: 'library', option: 'Library' },
    { value: 'maintenance', option: 'Maintenance' },
    { value: 'student-affairs', option: 'Student Affairs' },
    { value: 'admissions', option: 'Admissions' },
    { value: 'it', option: 'IT' },
    { value: 'administration', option: 'Administration' },
    { value: 'alumni-affairs', option: 'Alumni Affairs' },
    { value: 'sports', option: 'Sports' },
    { value: 'examination', option: 'Examination' },
    { value: 'academics', option: 'Academics' },
    { value: 'finance', option: 'Finance' },
    { value: 'human-resources', option: 'Human Resources' },
    { value: 'transport', option: 'Transport' },
    { value: 'health-and-safety', option: 'Health and Safety' },
    { value: 'communications', option: 'Communications' },
]
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