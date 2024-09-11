import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { data } = action.payload;
      state.push(data);
    },
  },
});

export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;
