import { createSlice } from "@reduxjs/toolkit";

const sidepanelSlice = createSlice({
  name: "sidepanel",
  initialState: {
    panel: null,
    open: false,
  },
  reducers: {
    openSidepanel: (state, action) => {
      state.open = true;
      if (action.payload) {
        state.panel = action.payload;
      }
    },
    closeSidepanel: (state, action) => {
      state.open = false;
      if (action.payload?.clear) {
        state.panel = null;
      }
    },
  },
});

export const sidepanelReducer = sidepanelSlice.reducer;
export const { openSidepanel, closeSidepanel } = sidepanelSlice.actions;
export default sidepanelSlice;
