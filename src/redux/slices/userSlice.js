import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '@/lib/api';

// ─── Thunks ────────────────────────────────────────────────
export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await userApi.getAll();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addNewUser = createAsyncThunk(
  'user/add',
  async (data, { rejectWithValue }) => {
    try {
      return await userApi.create(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await userApi.update(id, data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (id, { rejectWithValue }) => {
    try {
      await userApi.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────
const userSlice = createSlice({
  name: 'user',
  initialState: {
    allUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAllUsers: (state, action) => { state.allUsers = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.allUsers.push(action.payload);
      });

    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.allUsers.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.allUsers[idx] = action.payload;
      });

    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allUsers = state.allUsers.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setAllUsers } = userSlice.actions;
export const user = userSlice.reducer;
