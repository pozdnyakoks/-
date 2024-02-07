import { createSlice } from '@reduxjs/toolkit';

export interface currentPageState {
  currentPage: number;
}

const defValue = 1;

const initialState: currentPageState = {
  currentPage: defValue,
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }: { payload: number }) => {
      state.currentPage = payload;
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
