import { createSlice } from '@reduxjs/toolkit';

export interface isLoadingState {
  isLoading: boolean;
}

const defValue = true;

const initialState: isLoadingState = {
  isLoading: defValue,
};

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: { payload: boolean }) => {
      state.isLoading = payload;
    },
  },
});

export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
