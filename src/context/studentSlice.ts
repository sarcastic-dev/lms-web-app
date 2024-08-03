import { Student, StudentState } from "@/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

const initialStudentData: Student = {
  basicInfo: {
    user: {
      instituteId: "",
      bloodGroup: "",
      dob: "",
      email: "",
      firstName: "",
      gender: "",
      lastName: "",
      middleName: "",
      phone: "",
      role: "student",
    },
    student: {
      enrollmentId: "",
      admissionDate: "",
      boardUniversity: "",
      rollNumber: "",
      class: "",
      section: "",
    },
  },
  addressInfo: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  },
  parentInfo: {
    relation: "",
    name: "",
    phone: "",
    email: "",
    qualification: "",
    occupation: "",
    workOrganizationName: "",
    designation: "",
    annualIncome: "",
  },
  medicalInfo: {
    weightKg: "",
    heightCm: "",
    bmi: "",
    pulseRate: "",
    haemoglobin: "",
    allergies: "",
    reportIssueDate: "",
  },
};

const initialState: StudentState = {
  studentData: initialStudentData,
  status: "idle",
  error: null,
  viewState: "add",
};

export const fetchStudentById = createAsyncThunk<Student, string>(
  "student/fetchStudentById",
  async (id) => {
    const { data } = await axiosInstance.get(`/students/${id}`);
    const modifiedRegistrationData = {
      ...data,
      basicInfo: {
        ...data?.basicInfo,
        student: {
          ...data?.basicInfo?.student,
          rollNumber: String(data?.basicInfo?.student?.rollNumber),
        },
      },
      medicalInfo: {
        ...data?.medicalInfo,
        weightKg: String(data?.medicalInfo?.weightKg),
        heightCm: String(data?.medicalInfo?.heightCm),
        bmi: String(data?.medicalInfo?.bmi),
        pulseRate: String(data?.medicalInfo?.pulseRate),
        haemoglobin: String(data?.medicalInfo?.haemoglobin),
      },
    };
    return modifiedRegistrationData;
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setViewState: (state, action: PayloadAction<"view" | "edit" | "add">) => {
      state.viewState = action.payload;
      console.log(state.viewState);
    },
    resetStudentData: (state) => {
      state.studentData = initialStudentData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentById.pending, (state) => {
        state.status = "loading";
        // console.log(state.status);
      })
      .addCase(
        fetchStudentById.fulfilled,
        (state, action: PayloadAction<Student>) => {
          state.status = "succeeded";
          state.studentData = action.payload;
          // console.log(state.studentData);
        }
      )
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        // console.log(state.error);
      });
  },
});

export const { setViewState, resetStudentData } = studentSlice.actions;

export default studentSlice.reducer;
