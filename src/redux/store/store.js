import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlices/apiSlice";
import cartReducer from "../slices/ecom/addToCartSlice";
import profileReducer from "../slices/ecom/profileSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
