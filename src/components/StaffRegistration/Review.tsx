"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

// interface RegistrationData {
// 	basicInfo: {
// 		user: BasicInfoUser;
// 		student: BasicInfoStudent;
// 	};
// 	addressInfo: AddressInfo;
// 	parentInfo: ParentInfo;
// 	medicalInfo: MedicalInfo;
// }

// interface StructuredResponse {
// 	basicInfo: Omit<BasicInfoUser, "role" | "instituteId">;
// 	academicInfo: BasicInfoStudent;
// 	addressInfo: AddressInfo;
// 	parentInfo: ParentInfo;
// 	medicalInfo: MedicalInfo;
// }

// interface ReviewProps {
// 	onNext: () => void;
// }

const Review = ({ onNext }: any) => {
	const registrationData = useSelector(
		(state: RootState) => state.staffRegistration
	);

	const structuredResponse = {
		basicInfo: {
			phone: registrationData?.basicInfo?.user?.phone,
			email: registrationData.basicInfo?.user?.email,
			firstName: registrationData.basicInfo?.user?.firstName,
			middleName: registrationData.basicInfo?.user?.middleName,
			lastName: registrationData.basicInfo?.user?.lastName,
			dob: registrationData.basicInfo?.user?.dob,
			gender: registrationData.basicInfo?.user?.gender,
			bloodGroup: registrationData.basicInfo?.user?.bloodGroup,
		},
		employeeInfo: {
			employeeId: registrationData.basicInfo.staff?.employeeId,
			appointmentDate: registrationData.basicInfo.staff?.appointmentDate,
			department: registrationData.basicInfo.staff?.department,
			designation: registrationData.basicInfo.staff?.designation,
			employmentType: registrationData.basicInfo.staff?.employmentType,
			experienceYears: registrationData.basicInfo.staff?.experienceYears,
			highestQualification:
				registrationData.basicInfo.staff?.highestQualification,
			jobTitle: registrationData.basicInfo.staff?.jobTitle,
		},

		addressInfo: {
			addressLine1: registrationData.addressInfo.addressLine1,
			addressLine2: registrationData.addressInfo.addressLine2,
			city: registrationData.addressInfo.city,
			state: registrationData.addressInfo.state,
			pinCode: registrationData.addressInfo.pinCode,
			country: registrationData.addressInfo.country,
		},
		additionalInfo: {
			aadharNumber: registrationData.additionalInfo.aadharNumber,
			category: registrationData.additionalInfo.category,
			emergencyContactNumber:
				registrationData.additionalInfo.emergencyContactNumber,
			fatherName: registrationData.additionalInfo.fatherName,
			maritalStatus: registrationData.additionalInfo.maritalStatus,
			motherName: registrationData.additionalInfo.motherName,
			panNumber: registrationData.additionalInfo.panNumber,
			religion: registrationData.additionalInfo.religion,
			spouseName: registrationData.additionalInfo.spouseName,
		},
		previousExperienceInfo: {
			instituteName:
				registrationData.previousExperienceInfo.instituteName,
			jobTitle: registrationData.previousExperienceInfo.jobTitle,
			joiningDate: registrationData.previousExperienceInfo.joiningDate,
			location: registrationData.previousExperienceInfo.location,
			referenceName:
				registrationData.previousExperienceInfo.referenceName,
			referenceMobileNumber:
				registrationData.previousExperienceInfo.referenceMobileNumber,
			relievingDate:
				registrationData.previousExperienceInfo.relievingDate,
		},
		bankDetailInfo: {
			bankAccountNumber:
				registrationData.bankDetailInfo.bankAccountNumber,
			bankName: registrationData.bankDetailInfo.bankName,
			accountHolderName:
				registrationData.bankDetailInfo.accountHolderName,
			ifscCode: registrationData.bankDetailInfo.ifscCode,
		},
	};

	const renderInfoSection = (
		title: string,
		info: Record<string, string | undefined>
	) => (
		<div className='my-4'>
			<h5 className='font-bold text-xl text-lmsPrimary'>{title}</h5>
			<div className='flex flex-col items-start my-2 border border-lms-50 bg-white shadow rounded-[8px]'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5'>
					{Object.entries(info).map(([key, value]) => (
						<div
							key={key}
							className='flex flex-col'
						>
							<p className='text-lmsSecondary font-medium text-sm w-96'>
								{key
									.replace(/([A-Z])/g, " $1")
									.replace(/^./, (str) => str.toUpperCase())}
							</p>
							<p className='text-lmsPrimary font-semibold text-base'>
								{value ? value : "-"}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);

	return (
		<div className='py-4'>
			{renderInfoSection("Basic Info", structuredResponse.basicInfo)}
			{renderInfoSection(
				"Employment Info",
				structuredResponse.employeeInfo
			)}
			{renderInfoSection("Address Info", structuredResponse.addressInfo)}
			{renderInfoSection(
				"Additional Info",
				structuredResponse.additionalInfo
			)}
			{renderInfoSection(
				"Previous Info",
				structuredResponse.previousExperienceInfo
			)}
			{renderInfoSection("Bank Info", structuredResponse.bankDetailInfo)}
		</div>
	);
};

export default Review;
