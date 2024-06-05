interface SelectType {
    value: string,
    option: string
}

export const Gender: SelectType[] = [
    { value: "male", option: "Male" },
    { value: "female", option: "Female" },
    { value: "other", option: "Other" }
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
export const Religion: SelectType[] = [
    {value:'hindu', option:'Hindu'},
    {value:'muslim', option:'Muslim'},
    {value:'christian', option:'Christian'},
    {value:'sikh', option:'Sikh'},
    {value:'buddhist', option:'Buddhist'},
    {value:'jain', option:'Jain'},
    {value:'other', option:'Other'},
]
export const Category: SelectType[] = [
    {value:'gen',option:'GEN'},
    {value:'gen-ews',option:'GEN-EWS'},
    {value:'obc',option:'OBC'},
    {value:'obc-cl',option:'OBC-CL'},
    {value:'obc-ncl',option:'OBC-NCL'},
    {value:'sc',option:'SC'},
    {value:'st',option:'ST'},
    {value:'foreigner',option:'Foreigner'},
    {value:'other',option:'Other'},
]
