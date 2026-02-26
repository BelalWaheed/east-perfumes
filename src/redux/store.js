import { configureStore } from '@reduxjs/toolkit';
import { products } from './slices/productSlice';
import { profile }  from './slices/profileSlice';
import { theme }    from './slices/themeSlice';
import { user }     from './slices/userSlice';
import { language } from './slices/languageSlice';

import { audio }    from './slices/audioSlice';
import { cart }     from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    products,
    profile,
    theme,
    user,
    language,

    audio,
    cart,
  },
});

export default store;

