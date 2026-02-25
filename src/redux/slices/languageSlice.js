import { createSlice } from '@reduxjs/toolkit';

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language');
    if (stored === 'en' || stored === 'ar') return stored;
  }
  return 'ar'; // Default to Arabic
};

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: getInitialLanguage(),
  },
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === 'ar' ? 'en' : 'ar';
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', state.language);
        document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = state.language;
      }
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', state.language);
        document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = state.language;
      }
    },
    initializeLanguage: (state) => {
      if (typeof window !== 'undefined') {
        document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = state.language;
      }
    },
  },
});

export const { toggleLanguage, setLanguage, initializeLanguage } = languageSlice.actions;
export const language = languageSlice.reducer;
