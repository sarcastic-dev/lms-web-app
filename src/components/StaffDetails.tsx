"use client";
import React from "react";
import { Staff, StructuredStaffResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

interface StaffDetailsProps {
	staffData: Staff;
}

const StaffDetails: React.FC<StaffDetailsProps> = ({ staffData }) => {
	const structuredResponse: StructuredStaffResponse = {
		basicInfo: {
			phone: staffData?.basicInfo?.user?.phone,
			email: staffData.basicInfo.user.email,
			firstName: staffData.basicInfo.user.firstName,
			middleName: staffData.basicInfo.user.middleName,
			lastName: staffData.basicInfo.user.lastName,
			dob: staffData.basicInfo.user.dob,
			gender: staffData.basicInfo.user.gender,
			bloodGroup: staffData.basicInfo.user.bloodGroup,
		},
		staffInfo: {
			employeeId: staffData.basicInfo.staff.employeeId,
			designation: staffData.basicInfo.staff.designation,
			department: staffData.basicInfo.staff.department,
			experienceYears: staffData.basicInfo.staff.experienceYears,
			appointmentDate: staffData.basicInfo.staff.appointmentDate,
			jobTitle: staffData.basicInfo.staff.jobTitle,
			employmentType: staffData.basicInfo.staff.employmentType,
			highestQualification:
				staffData.basicInfo.staff.highestQualification,
		},
		addressInfo: {
			addressLine1: staffData.addressInfo.addressLine1,
			addressLine2: staffData.addressInfo.addressLine2,
			city: staffData.addressInfo.city,
			state: staffData.addressInfo.state,
			pinCode: staffData.addressInfo.pinCode,
			country: staffData.addressInfo.country,
		},
		additionalInfo: {
			aadharNumber: staffData.additionalInfo.aadharNumber,
			panNumber: staffData.additionalInfo.panNumber,
			religion: staffData.additionalInfo.religion,
			category: staffData.additionalInfo.category,
			fatherName: staffData.additionalInfo.fatherName,
			motherName: staffData.additionalInfo.motherName,
			maritalStatus: staffData.additionalInfo.maritalStatus,
			spouseName: staffData.additionalInfo.spouseName,
			emergencyContactNumber:
				staffData.additionalInfo.emergencyContactNumber,
		},
		previousExperienceInfo: {
			instituteName: staffData.previousExperienceInfo.instituteName,
			jobTitle: staffData.previousExperienceInfo.jobTitle,
			joiningDate: staffData.previousExperienceInfo.joiningDate,
			relievingDate: staffData.previousExperienceInfo.relievingDate,
			location: staffData.previousExperienceInfo.location,
			referenceName: staffData.previousExperienceInfo.referenceName,
			referenceMobileNumber:
				staffData.previousExperienceInfo.referenceMobileNumber,
		},
		bankDetailInfo: {
			bankName: staffData.bankDetailInfo.bankName,
			bankAccountNumber: staffData.bankDetailInfo.bankAccountNumber,
			ifscCode: staffData.bankDetailInfo.ifscCode,
			accountHolderName: staffData.bankDetailInfo.accountHolderName,
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
					"Staff Information",
					structuredResponse.staffInfo as any
				)}
				{renderInfoSection(
					"Address Information",
					structuredResponse.addressInfo as any
				)}
				{renderInfoSection(
					"Additional Information",
					structuredResponse.additionalInfo as any
				)}
				{renderInfoSection(
					"Previous Experience Information",
					structuredResponse.previousExperienceInfo as any
				)}
				{renderInfoSection(
					"Bank Detail Information",
					structuredResponse.bankDetailInfo as any
				)}
			</div>
		</div>
	);
};

export default StaffDetails;
