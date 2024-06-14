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
	basicInfo: Partial<BasicInfo>;
	addressInfo: Partial<AddressInfo>;
	fatherInfo: Partial<FatherInfo>;
	motherInfo: Partial<MotherInfo>;
	guardianInfo: Partial<GuardianInfo>;
	academicInfo: Partial<AcademicInfo>;
	medicalInfo: Partial<MedicalInfo>;
}

const initialState: RegistrationState = {
	basicInfo: {},
	addressInfo: {},
	fatherInfo: {},
	motherInfo: {},
	guardianInfo: {},
	academicInfo: {},
	medicalInfo: {},
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


// resetRegistrationData(state) {
// 	return initialState;
//   },