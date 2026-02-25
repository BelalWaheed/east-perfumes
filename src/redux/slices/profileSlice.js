import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '@/lib/api';

// ─── Thunks ────────────────────────────────────────────────
/** Restore session from localStorage on app mount */
export const restoreSession = createAsyncThunk(
  'profile/restoreSession',
  async (_, { rejectWithValue }) => {
    const userId = localStorage.getItem('ep-userId');
    if (!userId) return null;
    try {
      return await userApi.getById(userId);
    } catch {
      localStorage.removeItem('ep-userId');
      return rejectWithValue('Session expired');
    }
  }
);

/** Purchase a product: update purchasedProducts + points in DB */
export const purchaseProduct = createAsyncThunk(
  'profile/purchase',
  async ({ user, product, finalPrice, pointsUsed = 0 }, { rejectWithValue }) => {
    try {
      const pointsEarned = Math.floor(finalPrice - pointsUsed * 0.5);
      const updated = {
        purchasedProducts: [...(user.purchasedProducts || []), product.id],
        totalPoints: (user.totalPoints || 0) + pointsEarned,
        usedPoints: (user.usedPoints || 0) + pointsUsed,
        availablePoints: (user.availablePoints || 0) + pointsEarned - pointsUsed,
      };
      return await userApi.update(user.id, updated);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/** Update profile fields */
export const updateProfile = createAsyncThunk(
  'profile/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await userApi.update(id, data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────
const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loggedUser: null,
    logged: false,
    loading: false,
    error: null,
  },
  reducers: {
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
      state.logged = !!action.payload;
    },
    setLogged: (state, action) => { state.logged = action.payload; },
    logout: (state) => {
      state.loggedUser = null;
      state.logged = false;
      localStorage.removeItem('ep-userId');
    },
  },
  extraReducers: (builder) => {
    // restoreSession
    builder
      .addCase(restoreSession.pending, (state) => { state.loading = true; })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.loggedUser = action.payload;
          state.logged = true;
        }
      })
      .addCase(restoreSession.rejected, (state) => {
        state.loading = false;
        state.logged = false;
        state.loggedUser = null;
      });

    // purchaseProduct
    builder
      .addCase(purchaseProduct.fulfilled, (state, action) => {
        state.loggedUser = action.payload;
      });

    // updateProfile
    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loggedUser = action.payload;
      });
  },
});

export const { setLoggedUser, setLogged, logout } = profileSlice.actions;
export const profile = profileSlice.reducer;
