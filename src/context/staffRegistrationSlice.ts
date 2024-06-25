import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	AdditionalDetails,
	AddressStaffInfo,
	BankDetails,
	BasicInfoEmployee,
	PreviousExperience,
} from "@/types";

interface RegistrationState {
	basicInfo: Partial<BasicInfoEmployee>;
	addressInfo: Partial<AddressStaffInfo>;
	additionalInfo: Partial<AdditionalDetails>;
	previousExperienceInfo: Partial<PreviousExperience>;
	bankDetailInfo: Partial<BankDetails>;
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
			role: "teacher",
		},
		staff: {
			employeeId: "",
			appointmentDate: "",
			department: "",
			designation: "",
			employmentType: "",
			esiCodeNumber: "",
			experienceYears: "",
			highestQualification: "",
			jobTitle: "",
			pfAccountNumber: "",
			reportingManager: "",
			uan: "",
		},
	},
	addressInfo: {},
	additionalInfo: {},
	previousExperienceInfo: {},
	bankDetailInfo: {},
};

const staffRegistrationSlice = createSlice({
	name: "staffRegistration",
	initialState,
	reducers: {
		setBasicInfoData: (state, action: PayloadAction<BasicInfoEmployee>) => {
			state.basicInfo = action.payload;
		},
		setBasicInfoUserDetailData: (
			state,
			action: PayloadAction<BasicInfoEmployee["user"]>
		) => {
			state.basicInfo.user = action.payload;
		},
		setBasicInfoStaffData: (
			state,
			action: PayloadAction<BasicInfoEmployee["staff"]>
		) => {
			state.basicInfo.staff = action.payload;
		},
		setAddressInfoData: (
			state,
			action: PayloadAction<AddressStaffInfo>
		) => {
			state.addressInfo = action.payload;
		},
		setAdditionalDetailsData: (
			state,
			action: PayloadAction<AdditionalDetails>
		) => {
			state.additionalInfo = action.payload;
		},
		setPreviousExperienceData: (
			state,
			action: PayloadAction<PreviousExperience>
		) => {
			state.previousExperienceInfo = action.payload;
		},
		setBankDetailsData: (state, action: PayloadAction<BankDetails>) => {
			state.bankDetailInfo = action.payload;
		},
		resetRegistrationData: () => initialState,
	},
});

export const {
	setBasicInfoData,
	setBasicInfoUserDetailData,
	setBasicInfoStaffData,
	setAddressInfoData,
	setAdditionalDetailsData,
	setPreviousExperienceData,
	setBankDetailsData,
	resetRegistrationData,
} = staffRegistrationSlice.actions;

export default staffRegistrationSlice.reducer;
