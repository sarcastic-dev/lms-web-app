"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";
import {
  AddressInfo,
  BasicInfoStudent,
  BasicInfoUser,
  MedicalInfo,
  ParentInfo,
} from "@/types";

interface RegistrationData {
  basicInfo: {
    user: BasicInfoUser;
    student: BasicInfoStudent;
  };
  addressInfo: AddressInfo;
  parentInfo: ParentInfo;
  medicalInfo: MedicalInfo;
}

interface StructuredResponse {
  basicInfo: Omit<BasicInfoUser, "role" | "instituteId">;
  academicInfo: BasicInfoStudent;
  addressInfo: AddressInfo;
  parentInfo: ParentInfo;
  medicalInfo: MedicalInfo;
}

interface ReviewProps {
  onNext: () => void;
}

const Review: React.FC<ReviewProps> = ({ onNext }) => {
  const registrationData = useSelector(
    (state: RootState) => state.studentRegistration
  ) as RegistrationData;

  const structuredResponse: StructuredResponse = {
    basicInfo: {
      phone: registrationData.basicInfo.user.phone,
      email: registrationData.basicInfo.user.email,
      firstName: registrationData.basicInfo.user.firstName,
      middleName: registrationData.basicInfo.user.middleName,
      lastName: registrationData.basicInfo.user.lastName,
      dob: registrationData.basicInfo.user.dob,
      gender: registrationData.basicInfo.user.gender,
      bloodGroup: registrationData.basicInfo.user.bloodGroup,
    },
    academicInfo: {
      enrollmentId: registrationData.basicInfo.student.enrollmentId,
      class: registrationData.basicInfo.student.class,
      section: registrationData.basicInfo.student.section,
      rollNumber: registrationData.basicInfo.student.rollNumber,
      admissionDate: registrationData.basicInfo.student.admissionDate,
      boardUniversity: registrationData.basicInfo.student.boardUniversity,
    },
    addressInfo: {
      addressLine1: registrationData.addressInfo.addressLine1,
      addressLine2: registrationData.addressInfo.addressLine2,
      city: registrationData.addressInfo.city,
      state: registrationData.addressInfo.state,
      pinCode: registrationData.addressInfo.pinCode,
      country: registrationData.addressInfo.country,
    },
    parentInfo: {
      name: registrationData.parentInfo.name,
      relation: registrationData.parentInfo.relation,
      email: registrationData.parentInfo.email,
      phone: registrationData.parentInfo.phone,
      qualification: registrationData.parentInfo.qualification,
      occupation: registrationData.parentInfo.occupation,
      workOrganizationName: registrationData.parentInfo.workOrganizationName,
      designation: registrationData.parentInfo.designation,
      annualIncome: registrationData.parentInfo.annualIncome,
    },
    medicalInfo: {
      weightKg: registrationData.medicalInfo.weightKg,
      heightCm: registrationData.medicalInfo.heightCm,
      bmi: registrationData.medicalInfo.bmi,
      pulseRate: registrationData.medicalInfo.pulseRate,
      haemoglobin: registrationData.medicalInfo.haemoglobin,
      allergies: registrationData.medicalInfo.allergies,
      reportIssueDate: registrationData.medicalInfo.reportIssueDate,
    },
  };

  const renderInfoSection = (
    title: string,
    info: Record<string, string | undefined>
  ) => (
    <div className="my-4">
      <h5 className="font-bold text-xl text-lmsPrimary">{title}</h5>
      <div className="flex flex-col items-start my-2 border border-lms-50 bg-white shadow rounded-[8px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
          {Object.entries(info).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <p className="text-lmsSecondary font-medium text-sm w-96">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </p>
              <p className="text-lmsPrimary font-semibold text-base">
                {value ? value : "-"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-4">
      {renderInfoSection("Basic Info", structuredResponse.basicInfo)}
      {renderInfoSection(
        "Academic Info",
        structuredResponse.academicInfo as any
      )}
      {renderInfoSection("Address Info", structuredResponse.addressInfo as any)}
      {renderInfoSection("Parent Info", structuredResponse.parentInfo as any)}
      {renderInfoSection("Medical Info", structuredResponse.medicalInfo as any)}
    </div>
  );
};

export default Review;
