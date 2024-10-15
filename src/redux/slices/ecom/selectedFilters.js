import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const selectedFilterSlice = createSlice({
  name: "selectedFilter",
  initialState,
  reducers: {
    setSelectedFilter: (state, action) => {
      const { type, value } = action.payload;
      
      // Ensure state is an object
      const newState = typeof state === 'object' ? { ...state } : {};
    
      if (!type || value === undefined) {
        // Return current state if payload is invalid
        return state;
      }
    
      if (Array.isArray(newState[type])) {
        if (newState[type].includes(value)) {
          newState[type] = newState[type].filter((item) => item !== value);
        } else {
          newState[type] = [...newState[type], value];
        }
      } else {
        newState[type] = [value];
      }
    
      return newState;
    },

    
  },
});

export const { setSelectedFilter } =
  selectedFilterSlice.actions;

export default selectedFilterSlice.reducer;
