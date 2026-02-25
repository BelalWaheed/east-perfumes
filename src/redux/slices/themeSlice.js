import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: typeof window !== 'undefined' ? localStorage.getItem('theme') !== 'dark' : true,
  },
  reducers: {
    darkMode: (state) => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      state.theme = false;
    },
    lightMode: (state) => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      state.theme = true;
    },
    initializeTheme: (state) => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        state.theme = false;
      } else {
        document.documentElement.classList.remove('dark');
        state.theme = true;
      }
    },
  },
});

export const { darkMode, lightMode, initializeTheme } = themeSlice.actions;
export const theme = themeSlice.reducer;
