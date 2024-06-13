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
	basicInfo: BasicStaffInfo;
	addressInfo: AddressStaffInfo;
	employmentDetails: EmploymentDetails;
	additionalDetails: AdditionalDetails;
	previousExperience: PreviousExperience;
	bankDetails: BankDetails;
}

const initialState: RegistrationState = {
	basicInfo: {
		bloodGroup: "",
		dateOfBirth: "",
		emailID: "",
		employeeID: "",
		firstName: "",
		gender: "",
		lastName: "",
		middleName: "",
		mobileNumber: "",
		userRole: "",
	},
	addressInfo: {
		addressLine1: "",
		addressLine2: "",
		cityTown: "",
		country: "",
		pincode: "",
		state: "",
	},
	employmentDetails: {
		appointmentDate: "",
		department: "",
		designation: "",
		employmentType: "",
		esiCodeNumber: "",
		experience: "",
		highestQualification: "",
		jobTitle: "",
		pfAccountNumber: "",
		reportingManager: "",
		uan: "",
	},
	additionalDetails: {
		aadharNumber: "",
		category: "Hindu",
		emergencyMobileNumber: "",
		fatherName: "",
		maritalStatus: "unmarried",
		motherName: "",
		panNumber: "",
		religion: "GEN",
		spouseName: "",
	},
	previousExperience: {
		instituteName: "",
		jobTitle: "",
		joiningDate: "",
		location: "",
		referenceName: "",
		referenceNumber: "",
		relievingDate: "",
	},
	bankDetails: {
		accountNo: "",
		bankName: "",
		holderName: "",
		ifscCode: "",
	},
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
