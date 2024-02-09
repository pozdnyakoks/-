import { createSlice } from '@reduxjs/toolkit';
import { TJob } from '../types';
import { RootState } from '../store';

export interface jobsState {
  jobs: TJob[];
}

const defValue: TJob[] = [];

const initialState: jobsState = {
  jobs: defValue,
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, { payload }: { payload: TJob[] }) => {
      state.jobs = payload;
    },
  },
});

export const { setJobs } = jobsSlice.actions;

// export const jobsArray = (state: RootState) => state.jobs.jobs;
export default jobsSlice.reducer;
