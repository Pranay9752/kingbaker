import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const advFilterSlice = createSlice({
  name: "advFilter",
  initialState,
  reducers: {
    setAdvFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAdvFilter } = advFilterSlice.actions;

export default advFilterSlice.reducer;
