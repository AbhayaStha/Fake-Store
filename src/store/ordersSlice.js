import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  newOrdersCount: 0,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push({ id: state.orders.length + 1, ...action.payload, status: 'new' });
      state.newOrdersCount++;
    },
    payOrder: (state, action) => {
      const order = state.orders.find(order => order.id === action.payload);
      if (order) {
        order.status = 'paid';
        state.newOrdersCount--;
      }
    },
    receiveOrder: (state, action) => {
      const order = state.orders.find(order => order.id === action.payload);
      if (order) {
        order.status = 'delivered';
        state.newOrdersCount--; 
      }
    },
  },
});

export const { addOrder, payOrder, receiveOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
