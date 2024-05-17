import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push({ id: state.orders.length + 1, ...action.payload, status: 'new' });
    },
    payOrder: (state, action) => {
      const order = state.orders.find(order => order.id === action.payload);
      if (order) {
        order.status = 'paid';
      }
    },
    receiveOrder: (state, action) => {
      const order = state.orders.find(order => order.id === action.payload);
      if (order) {
        order.status = 'delivered';
      }
    },
  },
});

export const { addOrder, payOrder, receiveOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
