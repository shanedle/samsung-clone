import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CartState, initialState } from "./cart.state";

import { RootState } from "..";

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (
      state: CartState,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.items.findIndex(
        (item: Product) => item._id === action.payload.id
      );

      let newCart = [...state.items];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.log(
          `Can't remove product (id: ${action.payload.id}) as its not in cart!`
        );
      }

      state.items = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemsWithId = (state: RootState, id: string) => {
  state.cart.items.filter((item: Product) => item._id === id);
};

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total: number, item: Product) => (total += item.price),
    0
  );

export default cartSlice.reducer;
