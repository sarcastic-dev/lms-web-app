import {
	AcademicInfo,
	AddressInfo,
	BasicInfo,
	FatherInfo,
	GuardianInfo,
	MedicalInfo,
	MotherInfo,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
	basicInfo: BasicInfo;
	addressInfo: AddressInfo;
	fatherInfo: FatherInfo;
	motherInfo: MotherInfo;
	guardianInfo: GuardianInfo;
	academicInfo: AcademicInfo;
	medicalInfo: MedicalInfo;
}

const initialState: RegistrationState = {
	basicInfo: {
		bloodGroup: "",
		classRollNumber: "",
		dateOfAdmission: "",
		dateOfBirth: "",
		email: "",
		enrolmentID: "",
		firstName: "",
		gender: "",
		lastName: "",
		middleName: "",
		mobileNumber: "",
	},
	addressInfo: {
		addressLine1: "",
		addressLine2: "",
		cityTown: "",
		country: "",
		pincode: "",
		state: "",
	},
	fatherInfo: {
		annualIncome: "",
		designation: "",
		educationalQualification: "",
		emailID: "",
		mobileNumber: "",
		name: "",
		occupation: "",
		workOrganizationName: "",
	},
	motherInfo: {
		annualIncome: "",
		designation: "",
		educationalQualification: "",
		emailID: "",
		mobileNumber: "",
		name: "",
		occupation: "",
		workOrganizationName: "",
	},
	guardianInfo: {
		annualIncome: "",
		designation: "",
		educationalQualification: "",
		emailID: "",
		mobileNumber: "",
		name: "",
		occupation: "",
		relationship: "",
		workOrganizationName: "",
	},
	academicInfo: {
		admissionYear: "",
		boardUniversity: "",
		programClass: "",
		section: "",
	},
	medicalInfo: {
		allergies: "",
		bmi: "",
		haemoglobin: "",
		height: "",
		issuedDate: "",
		pulseRate: "",
		weight: "",
	},
};

const studentRegistrationSlice = createSlice({
	name: "registration",
	initialState,
	reducers: {
		setBasicInfoData: (state, action: PayloadAction<BasicInfo>) => {
			state.basicInfo = action.payload;
		},
		setAddressInfoData: (state, action: PayloadAction<AddressInfo>) => {
			state.addressInfo = action.payload;
		},
		setFatherInfoData: (state, action: PayloadAction<FatherInfo>) => {
			state.fatherInfo = action.payload;
		},
		setMotherInfoDate: (state, action: PayloadAction<MotherInfo>) => {
			state.motherInfo = action.payload;
		},
		setGuardianInfoData: (state, action: PayloadAction<GuardianInfo>) => {
			state.guardianInfo = action.payload;
		},
		setAcademicInfoData: (state, action: PayloadAction<AcademicInfo>) => {
			state.academicInfo = action.payload;
		},
		setMedicalInfoData: (state, action: PayloadAction<MedicalInfo>) => {
			state.medicalInfo = action.payload;
		},
	},
});

export const {
	setBasicInfoData,
	setAddressInfoData,
	setFatherInfoData,
	setMotherInfoDate,
	setGuardianInfoData,
	setAcademicInfoData,
	setMedicalInfoData,
} = studentRegistrationSlice.actions;
export default studentRegistrationSlice.reducer;
