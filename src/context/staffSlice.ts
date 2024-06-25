import { Staff, StaffState } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: StaffState = {
  staffData: null,
  status: 'idle',
  error: null,
  viewState: null,
};

export const fetchStaffById = createAsyncThunk<Staff, string>('staff/fetchStaffById', async (id) => {
  const {data} = await axios.get(`/staffs/${id}`);
  const modifiedData = {
    ...data,
    basicInfo: {
      ...data.basicInfo,
      staff: {
        ...data.basicInfo.staff,
        experienceYears: String(
          data.basicInfo.staff
            ?.experienceYears
        ),
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

export const { setViewState } = staffSlice.actions;

export default staffSlice.reducer;
