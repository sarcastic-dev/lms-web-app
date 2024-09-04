"use client";
import React from "react";
import { StructuredResponse, Student } from "@/types";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

interface StudentDetailsProps {
	studentData: Student;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ studentData }) => {
	const structuredResponse: StructuredResponse = {
		basicInfo: {
			phone: studentData.basicInfo.user.phone,
			email: studentData.basicInfo.user.email,
			firstName: studentData.basicInfo.user.firstName,
			middleName: studentData.basicInfo.user.middleName,
			lastName: studentData.basicInfo.user.lastName,
			dob: studentData.basicInfo.user.dob,
			gender: studentData.basicInfo.user.gender,
			bloodGroup: studentData.basicInfo.user.bloodGroup,
		},
		academicInfo: {
			enrollmentId: studentData.basicInfo.student.enrollmentId,
			class: studentData.basicInfo.student.class,
			section: studentData.basicInfo.student.section,
			rollNumber: studentData.basicInfo.student.rollNumber,
			admissionDate: studentData.basicInfo.student.admissionDate,
			boardUniversity: studentData.basicInfo.student.boardUniversity,
		},
		addressInfo: {
			addressLine1: studentData.addressInfo.addressLine1,
			addressLine2: studentData.addressInfo.addressLine2,
			city: studentData.addressInfo.city,
			state: studentData.addressInfo.state,
			pinCode: studentData.addressInfo.pinCode,
			country: studentData.addressInfo.country,
		},
		parentInfo: {
			name: studentData.parentInfo.name,
			relation: studentData.parentInfo.relation,
			email: studentData.parentInfo.email,
			phone: studentData.parentInfo.phone,
			qualification: studentData.parentInfo.qualification,
			occupation: studentData.parentInfo.occupation,
			workOrganizationName: studentData.parentInfo.workOrganizationName,
			designation: studentData.parentInfo.designation,
			annualIncome: studentData.parentInfo.annualIncome,
		},
		medicalInfo: {
			weightKg: studentData.medicalInfo.weightKg,
			heightCm: studentData.medicalInfo.heightCm,
			bmi: studentData.medicalInfo.bmi,
			pulseRate: studentData.medicalInfo.pulseRate,
			haemoglobin: studentData.medicalInfo.haemoglobin,
			allergies: studentData.medicalInfo.allergies,
			reportIssueDate: studentData.medicalInfo.reportIssueDate,
		},
	};

	const firstName = structuredResponse.basicInfo.firstName;
	const middleName = structuredResponse.basicInfo.middleName;
	const lastName = structuredResponse.basicInfo.lastName;

	const renderInfoSection = (
		title: string,
		info: Record<string, string | undefined>
	) => (
		<div className='mx-16'>
			<h5 className='font-bold text-xl text-lmsPrimary'>{title}</h5>
			<div className='flex flex-col items-start my-2 border border-lms-50 bg-white shadow rounded-[8px] mb-6'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6'>
					{Object.entries(info).map(([key, value]) => (
						<div
							key={key}
							className='flex flex-col'
						>
							<p className='text-lmsSecondary font-normal text-xs w-96'>
								{key
									.replace(/([A-Z])/g, " $1")
									.replace(/^./, (str) => str.toUpperCase())}
							</p>
							<p className='text-lmsPrimary font-medium text-base'>
								{value ? value : "-"}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);

	return (
		<div className='flex flex-col'>
			<div className='h-20 flex items-center justify-between border-b border-lms-100 px-16 '>
				<h4 className='font-bold text-lmsPrimary text-2xl'>
					{`${firstName} ${middleName} ${lastName}`}
				</h4>
				<Button
					variant={"lmsOutline"}
					className='py-0 h-10'
				>
					<Pen
						size={16}
						className='mr-2'
					/>
					Update Data
				</Button>
			</div>
			<div className='py-6'>
				{renderInfoSection(
					"Basic Information",
					structuredResponse.basicInfo
				)}
				{renderInfoSection(
					"Academic Information",
					structuredResponse.academicInfo as any
				)}
				{renderInfoSection(
					"Address Information",
					structuredResponse.addressInfo as any
				)}
				{renderInfoSection(
					"Parent Information",
					structuredResponse.parentInfo as any
				)}
				{renderInfoSection(
					"Medical Information",
					structuredResponse.medicalInfo as any
				)}
			</div>
		</div>
	);
};

export default StudentDetails;
