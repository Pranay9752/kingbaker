import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlices/apiSlice";
import cartReducer from "../slices/ecom/addToCartSlice"
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
