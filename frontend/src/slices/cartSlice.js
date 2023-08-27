import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const newItemId = newItem.id;

      const isAlreadyInCart = state.items.find((item) => item.id === newItemId);

      if (isAlreadyInCart) {
        state.items = state.items.map((item) =>
          item.id === newItemId
            ? {
                ...item,
                ...newItem,
                quantity: item.quantity + newItem.quantity,
              }
            : item
        );
      } else {
        state.items.push(action.payload);
      }
    },
    deleteItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    updateItemFromCart: (state, action) => {
      const itemId = action.payload.id;
      const updateData = action.payload;

      state.items = state.items = state.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              ...updateData,
            }
          : item
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addItemToCart, deleteItemFromCart, updateItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice;
