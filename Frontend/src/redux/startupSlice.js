import { createSlice } from "@reduxjs/toolkit";

const startupSlice = createSlice({
  name: "startup",
  initialState: {
    singleStartup: {},
    startups: [],
    publicStartups: [],
    searchStartupByText: "",
  },
  reducers: {
    setSingleStartup: (state, action) => {
      state.singleStartup = action.payload;
    },
    setStartups: (state, action) => {
      state.startups = action.payload;
    },
    setPublicStartups: (state, action) => {
      state.publicStartups = action.payload;
    },
    setSearchStartupByText: (state, action) => {
      state.searchStartupByText = action.payload;
    },
  },
});

export const { 
  setSingleStartup, 
  setStartups, 
  setPublicStartups,
  setSearchStartupByText 
} = startupSlice.actions;

export default startupSlice.reducer;