import { createSlice } from '@reduxjs/toolkit';
import { TJob } from '../types';
import { jobsArray } from './jobsSlice';

export interface filteredJobsState {
  filteredJobs: TJob[];
}

const defValue: TJob[] = [];

const initialState: filteredJobsState = {
  filteredJobs: defValue,
};

export const filteredJobsSlice = createSlice({
  name: 'filteredJobs',
  initialState,
  reducers: {
    setfilteredJobs: (state, { payload }: { payload: TJob[] }) => {
      state.filteredJobs = payload;
    },
  },
});

export const { setfilteredJobs } = filteredJobsSlice.actions;

export default filteredJobsSlice.reducer;
