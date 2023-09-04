import { configureStore } from "@reduxjs/toolkit";

import { snackbarReducer } from "../slices/snackbarSlice";
import { sidepanelReducer } from "../slices/sidepanelSlice";
import { cartReducer } from "../slices/cartSlice";
import { revisionReducer } from "../slices/revisionSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    snackbar: snackbarReducer,
    sidepanel: sidepanelReducer,
    revision: revisionReducer,
  },
});

export default store;
