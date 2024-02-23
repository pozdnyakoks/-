import { createSlice } from '@reduxjs/toolkit';

export interface isFetchedState {
  isFetched: boolean;
}

const defValue = true;

const initialState: isFetchedState = {
  isFetched: defValue,
};

export const isFetchedSlice = createSlice({
  name: 'isFetched',
  initialState,
  reducers: {
    setIsFetched: (state, { payload }: { payload: boolean }) => {
      state.isFetched = payload;
    },
  },
});

export const { setIsFetched } = isFetchedSlice.actions;

export default isFetchedSlice.reducer;
