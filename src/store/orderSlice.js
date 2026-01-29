import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    delivery: {
      receiver: '',
      address: '',
      city: '',
      zipCode: '',
      number: '',
      complement: '',
    },
    payment: {
      name: '',
      number: '',
      code: '',
      expiresMonth: '',
      expiresYear: '',
    },
    orderId: '',
    lastRestaurantId: null,
  },
  reducers: {
    setDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setLastRestaurantId: (state, action) => {
      state.lastRestaurantId = action.payload;
    },
    clearOrder: (state) => {
      state.orderId = '';
    },
  },
});

export const { setDelivery, setPayment, setOrderId, clearOrder } =
  orderSlice.actions;
export const { setLastRestaurantId } = orderSlice.actions;
export default orderSlice.reducer;
