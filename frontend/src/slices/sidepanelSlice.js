import { createSlice } from "@reduxjs/toolkit";

const sidepanelSlice = createSlice({
  name: "sidepanel",
  initialState: {
    panel: null,
    open: false,
    selectedProduct: null,
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
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      if (action.payload?.clear) {
        state.selectedProduct = null;
      }
    },
  },
});

export const sidepanelReducer = sidepanelSlice.reducer;
export const { openSidepanel, closeSidepanel, setSelectedProduct  } = sidepanelSlice.actions;
export default sidepanelSlice;
