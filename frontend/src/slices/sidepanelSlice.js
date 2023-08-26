import { createSlice } from "@reduxjs/toolkit";

const sidepanelSlice = createSlice({
  name: "sidepanel",
  initialState: {
    content: null,
    open: false,
  },
  reducers: {
    openSidepanel: (state, action) => {
      state.open = true;
      if (action.payload) {
        state.content = action.payload;
      }
    },
    closeSidepanel: (state, action) => {
      state.open = false;
      if (action.payload?.clear) {
        state.content = null;
      }
    },
  },
});

export const sidepanelReducer = sidepanelSlice.reducer;
export const { openSidepanel, closeSidepanel } = sidepanelSlice.actions;
export default sidepanelSlice;
