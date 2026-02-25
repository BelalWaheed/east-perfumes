import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'ep-cart';

// Load cart from localStorage
function loadCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save cart to localStorage
function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* quota exceeded — ignore */ }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(), // each item: { ...product, quantity }
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((i) => String(i.id) === String(product.id));
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => String(i.id) !== String(action.payload));
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => String(i.id) === String(id));
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => String(i.id) !== String(id));
        } else {
          item.quantity = quantity;
        }
      }
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

// Selectors
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => {
    const discount = i.discount > 0 ? i.price * i.discount / 100 : 0;
    return sum + (i.price - discount) * i.quantity;
  }, 0);

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cart = cartSlice.reducer;
