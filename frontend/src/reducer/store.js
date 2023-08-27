import { configureStore } from "@reduxjs/toolkit";

import { snackbarReducer } from "../slices/snackbarSlice";
import { sidepanelReducer } from "../slices/sidepanelSlice";
import { cartReducer } from "../slices/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    snackbar: snackbarReducer,
    sidepanel: sidepanelReducer,
  },
});

export default store;
