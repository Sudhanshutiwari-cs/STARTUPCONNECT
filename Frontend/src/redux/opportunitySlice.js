import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOpportunities: [],
  allFounderOpportunities: [],
  singleOpportunity: null,
  searchOpportunityByText: "",
  allAppliedOpportunities: [],
  searchedQuery: "",
};

const opportunitySlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {
    setAllOpportunities(state, action) {
      state.allOpportunities = action.payload;
    },
    setSingleOpportunity(state, action) {
      state.singleOpportunity = action.payload;
    },
    setAllFounderOpportunities(state, action) {
      state.allFounderOpportunities = action.payload;
    },
    setSearchOpportunityByText(state, action) {
      state.searchOpportunityByText = action.payload;
    },
    setAllAppliedOpportunities(state, action) {
      state.allAppliedOpportunities = action.payload;
    },
    setSearchedQuery(state, action) {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllOpportunities,
  setSingleOpportunity,
  setAllFounderOpportunities,
  setSearchOpportunityByText,
  setAllAppliedOpportunities,
  setSearchedQuery,
} = opportunitySlice.actions;

export default opportunitySlice.reducer;