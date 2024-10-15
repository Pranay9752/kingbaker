import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlices/apiSlice";
import cartReducer from "../slices/ecom/addToCartSlice";
import profileReducer from "../slices/ecom/profileSlice";
import orderReducer from "../slices/ecom/orderSlice";
import filterReducer from "../slices/ecom/filter";
import advFilterReducer from "../slices/ecom/advFilters";
import selectedFilterReducer from "../slices/ecom/selectedFilters";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer,
    order: orderReducer,
    filter: filterReducer,
    advFilter: advFilterReducer,
    selectedFilter: selectedFilterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
