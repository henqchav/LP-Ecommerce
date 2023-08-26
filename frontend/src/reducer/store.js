import { configureStore } from "@reduxjs/toolkit";

import { snackbarReducer } from "../slices/snackbarSlice";
import { sidepanelReducer } from "../slices/sidepanelSlice";

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    sidepanel: sidepanelReducer,
  },
});

export default store;
