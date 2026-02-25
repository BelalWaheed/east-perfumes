import { configureStore } from '@reduxjs/toolkit';
import { products } from './slices/productSlice';
import { profile }  from './slices/profileSlice';
import { user }     from './slices/userSlice';
import { flags }    from './slices/flagsSlice';
import { theme }    from './slices/themeSlice';
import { audio }    from './slices/audioSlice';

export const store = configureStore({
  reducer: {
    products,
    profile,
    user,
    flags,
    theme,
    audio,
  },
});

export default store;
