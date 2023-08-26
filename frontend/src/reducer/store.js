import { configureStore } from "@reduxjs/toolkit";

import { snackbarReducer } from "../slices/snackbarSlice";

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});

export default store;
