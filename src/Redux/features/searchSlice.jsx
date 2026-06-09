import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    activeTab: "photos",
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
      state.error = null; // Clear any previous errors
      state.loading = false; // Ensure loading is set to false when results are set
    },
    setLoading(state) {
      state.loading = true;
      state.error = null; // Clear any previous errors when starting a new search
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false; // Ensure loading is set to false when an error occurs
    },
    clearResults(state) {
      state.results = [];
      state.error = null; // Clear any previous errors when clearing results
    },
  },
});

export const {
  setQuery,
  setActiveTab,
  setResults,
  setLoading,
  setError,
  clearResults,
} = searchSlice.actions;

export default searchSlice.reducer;
