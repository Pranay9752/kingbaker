import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlices/apiSlice";
import cartReducer from "../slices/ecom/addToCartSlice";
import profileReducer from "../slices/ecom/profileSlice";
import orderReducer from "../slices/ecom/orderSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer,
    order: orderReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
