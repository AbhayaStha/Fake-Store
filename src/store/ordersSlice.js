// ordersSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setOrders, setLoading, setError, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
