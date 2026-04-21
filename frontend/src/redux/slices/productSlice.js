import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '@/lib/api';

// ─── Thunks ────────────────────────────────────────────────
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await productApi.getAll();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (data, { rejectWithValue }) => {
    try {
      return await productApi.create(data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await productApi.update(id, data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await productApi.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetchProducts
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // createProduct — optimistic-ish: add to list on success
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });

    // updateProduct
    builder
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.products.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.products[idx] = action.payload;
      });

    // deleteProduct
    builder
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export const products = productSlice.reducer;
