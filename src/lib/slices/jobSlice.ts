import { createSlice } from '@reduxjs/toolkit';

export interface jobState {
  job: string;
}

const defValue = '';

const initialState: jobState = {
  job: defValue,
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJob: (state, { payload }: { payload: string }) => {
      state.job = payload;
    },
  },
});

export const { setJob } = jobSlice.actions;

export default jobSlice.reducer;
