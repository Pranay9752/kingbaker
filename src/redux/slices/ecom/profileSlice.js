import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, action) => {
      console.log('action: ', action);
      return action.payload;
    },
  },
});

export const { addProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
