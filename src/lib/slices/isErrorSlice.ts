import { createSlice } from '@reduxjs/toolkit';

export interface isErrorState {
  isError: boolean;
}

const defValue = false;

const initialState: isErrorState = {
  isError: defValue,
};

export const isErrorSlice = createSlice({
  name: 'isError',
  initialState,
  reducers: {
    setIsError: (state, { payload }: { payload: boolean }) => {
      state.isError = payload;
    },
  },
});

export const { setIsError } = isErrorSlice.actions;

export default isErrorSlice.reducer;
