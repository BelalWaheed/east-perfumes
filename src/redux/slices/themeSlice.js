import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'ep-theme';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: false,
  },
  reducers: {
    initializeTheme: (state) => {
      const saved = localStorage.getItem(STORAGE_KEY);
      state.isDark = saved ? JSON.parse(saved) : false;
    },
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.isDark));
    },
  },
});

export const { initializeTheme, toggleTheme } = themeSlice.actions;
export const theme = themeSlice.reducer;
