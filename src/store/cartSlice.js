// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  items: [],
  totalItems: 0,
};

const loadCartFromStorage = async () => {
  try {
    const cartData = await AsyncStorage.getItem('cart');
    return cartData != null ? JSON.parse(cartData) : initialState;
  } catch (error) {
    console.error('Error loading cart data:', error);
    return initialState;
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, title, price, image, description } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, title, price, image, description, quantity: 1 });
      }
      state.totalItems++;
      AsyncStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.totalItems--;
      AsyncStorage.setItem('cart', JSON.stringify(state));
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        const diff = quantity - itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;
        state.totalItems += diff;
        AsyncStorage.setItem('cart', JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      AsyncStorage.removeItem('cart');
    },
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;

export const loadCart = () => async dispatch => {
  const cartData = await loadCartFromStorage();
  dispatch(cartSlice.actions.updateCart(cartData));
};

export default cartSlice.reducer;
