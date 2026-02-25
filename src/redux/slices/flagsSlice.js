import { createSlice } from '@reduxjs/toolkit';

const flagsSlice = createSlice({
  name: 'flags',
  initialState: {
    productChanged: false,
    userChanged: false,
  },
  reducers: {
    toggleProductChanged: (state) => { state.productChanged = !state.productChanged; },
    toggleUserChanged: (state)   => { state.userChanged = !state.userChanged; },
  },
});

export const { toggleProductChanged, toggleUserChanged } = flagsSlice.actions;
export const flags = flagsSlice.reducer;
