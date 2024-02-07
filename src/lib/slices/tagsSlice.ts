import { createSlice } from '@reduxjs/toolkit';

export interface tagsState {
  tags: string[];
}

const defValue: string[] = [];

const initialState: tagsState = {
  tags: defValue,
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, { payload }: { payload: string[] }) => {
      state.tags = payload;
    },
  },
});

export const { setTags } = tagsSlice.actions;

export default tagsSlice.reducer;
