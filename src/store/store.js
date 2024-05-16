// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { loadCart } from './cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createStore = async () => {
  const initialState = await loadCartFromStorage();
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: initialState,
    },
  });
};

const loadCartFromStorage = async () => {
  try {
    const cartData = await AsyncStorage.getItem('cart');
    return cartData != null ? JSON.parse(cartData) : { items: [], totalItems: 0 };
  } catch (error) {
    console.error('Error loading cart data:', error);
    return { items: [], totalItems: 0 };
  }
};

export const initializeStore = async () => {
  const store = await createStore();
  return store;
};
