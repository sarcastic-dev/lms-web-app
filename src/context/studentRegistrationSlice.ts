import { AddressInfo, BasicInfo, ParentInfo, MedicalInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
	basicInfo: Partial<BasicInfo>;
	addressInfo: Partial<AddressInfo>;
	parentInfo: Partial<ParentInfo>;
	medicalInfo: Partial<MedicalInfo>;
}

const initialState: RegistrationState = {
	basicInfo: {
		user: {
			bloodGroup: "",
			dob: "",
			email: "",
			firstName: "",
			gender: "",
			lastName: "",
			middleName: "",
			phone: "",
			role:"student"
		},
		student: {
			enrollmentId: "",
			admissionDate: "",
			boardUniversity: "",
			class: "",
			rollNumber: "",
			section: "",
		},
	},
	addressInfo: {},
	parentInfo: {},
	medicalInfo: {},
};

const studentRegistrationSlice = createSlice({
	name: "registration",
	initialState,
	reducers: {
		setBasicInfoData: (state, action: PayloadAction<BasicInfo>) => {
			state.basicInfo = action.payload;
		},
		setBasicInfoUserData: (
			state,
			action: PayloadAction<BasicInfo["user"]>
		) => {
			state.basicInfo.user = action.payload;
		},
		setBasicInfoStudentData: (
			state,
			action: PayloadAction<BasicInfo["student"]>
		) => {
			state.basicInfo.student = action.payload;
		},
		setAddressInfoData: (state, action: PayloadAction<AddressInfo>) => {
			state.addressInfo = action.payload;
		},
		setParentInfoData: (state, action: PayloadAction<ParentInfo>) => {
			state.parentInfo = action.payload;
		},
		setMedicalInfoData: (state, action: PayloadAction<MedicalInfo>) => {
			state.medicalInfo = action.payload;
		},
		resetRegistrationData: () => initialState,
	},
});

export const {
	setBasicInfoData,
	setBasicInfoUserData,
	setBasicInfoStudentData,
	setAddressInfoData,
	setParentInfoData,
	setMedicalInfoData,
	resetRegistrationData,
} = studentRegistrationSlice.actions;

export default studentRegistrationSlice.reducer;
