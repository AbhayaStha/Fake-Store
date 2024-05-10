// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0, // Add totalItems in the initial state
  },
  reducers: {
    addItem: (state, action) => {
      const { id, title, price, image, description } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, title, price, image, description, quantity: 1 });
      }
      state.totalItems++; // Increase totalItems when adding an item
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.totalItems--; // Decrease totalItems when removing an item
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        const diff = quantity - itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;
        state.totalItems += diff; // Adjust totalItems based on quantity change
      }
    },
  },
});

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
