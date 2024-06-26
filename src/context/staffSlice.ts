import { Staff, StaffState } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

const initialStaffData: Staff = {
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
  addressInfo: {
    addressLine1: "",
		addressLine2: "",
		city: "",
		country: "",
		pinCode: "",
		state: "",
  },
  additionalInfo: {
    aadharNumber: "",
    category: "",
    emergencyContactNumber: "",
    fatherName: "",
    maritalStatus: "",
    motherName: "",
    panNumber: "",
    religion: "",
    spouseName: "",
  },
  previousExperienceInfo: {
    instituteName: "",
    jobTitle: "",
    joiningDate: "",
    location: "",
    referenceName: "",
    referenceMobileNumber: "",
    relievingDate: "",
  },
  bankDetailInfo: {
    bankAccountNumber: "",
    bankName: "",
    accountHolderName: "",
    ifscCode: "",
  },
};

const initialState: StaffState = {
  staffData: initialStaffData,
  status: 'idle',
  error: null,
  viewState: null,
};

export const fetchStaffById = createAsyncThunk<Staff, string>('staff/fetchStaffById', async (id) => {
  const { data } = await axiosInstance.get(`/staffs/${id}`);
  const modifiedData = {
    ...data,
    basicInfo: {
      ...data.basicInfo,
      staff: {
        ...data.basicInfo.staff,
        experienceYears: String(data.basicInfo.staff?.experienceYears),
      },
    },
  };
  console.log(modifiedData);
  return modifiedData;
});

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setViewState: (state, action: PayloadAction<'view' | 'edit' | null>) => {
      state.viewState = action.payload;
      console.log(state.viewState);
    },
    resetStaffData: (state) => {
      state.staffData = initialStaffData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffById.pending, (state) => {
        state.status = 'loading';
        // console.log(state.status);
      })
      .addCase(fetchStaffById.fulfilled, (state, action: PayloadAction<Staff>) => {
        state.status = 'succeeded';
        state.staffData = action.payload;
        // console.log(state.staffData);
      })
      .addCase(fetchStaffById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
        // console.log(state.error);
      });
  },
});

export const { setViewState, resetStaffData } = staffSlice.actions;

export default staffSlice.reducer;
