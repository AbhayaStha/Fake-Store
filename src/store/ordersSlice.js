import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  newOrdersCount: 0, // Add newOrdersCount to the state
  loading: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = Array.isArray(action.payload) ? action.payload : [];
      state.newOrdersCount = state.orders.filter(order => order.is_paid === 0 && order.is_delivered === 0).length; // Update newOrdersCount
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
      state.newOrdersCount = 0;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setOrders, setLoading, setError, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
