import {
	AdditionalDetails,
	AddressInfo,
	AddressStaffInfo,
	BankDetails,
	BasicInfo,
	BasicStaffInfo,
	EmploymentDetails,
	PreviousExperience,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
	basicInfo: Partial<BasicStaffInfo>;
	addressInfo: Partial<AddressStaffInfo>;
	employmentDetails: Partial<EmploymentDetails>;
	additionalDetails: Partial<AdditionalDetails>;
	previousExperience: Partial<PreviousExperience>;
	bankDetails: Partial<BankDetails>;
}

const initialState: RegistrationState = {
	basicInfo: {},
	addressInfo: {},
	employmentDetails: {},
	additionalDetails: {},
	previousExperience: {},
	bankDetails: {},
};

const staffRegistrationSlice = createSlice({
	name: "staffRegistration",
	initialState,
	reducers: {
		setBasicInfoData: (state, action: PayloadAction<BasicStaffInfo>) => {
			state.basicInfo = action.payload;
		},
		setAddressInfoData: (
			state,
			action: PayloadAction<AddressStaffInfo>
		) => {
			state.addressInfo = action.payload;
		},
		setEmploymentDetailsData: (
			state,
			action: PayloadAction<EmploymentDetails>
		) => {
			state.employmentDetails = action.payload;
		},
		setAdditionalDetailsData: (
			state,
			action: PayloadAction<AdditionalDetails>
		) => {
			state.additionalDetails = action.payload;
		},
		setPreviousExperienceData: (
			state,
			action: PayloadAction<PreviousExperience>
		) => {
			state.previousExperience = action.payload;
		},
		setBankDetailsData: (state, action: PayloadAction<BankDetails>) => {
			state.bankDetails = action.payload;
		},
	},
});

export const {
	setBasicInfoData,
	setAddressInfoData,
	setEmploymentDetailsData,
	setAdditionalDetailsData,
	setPreviousExperienceData,
	setBankDetailsData,
} = staffRegistrationSlice.actions;
export default staffRegistrationSlice.reducer;
