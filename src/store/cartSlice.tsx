import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../hooks/useProducts";

type CartItem = {
  product: Product;
  quantity: number;
};

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.find(
        (item) => item.product.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ product: action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.product.id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.find((item) => item.product.id === action.payload.id);

      if (item) {
        const newQuantity = item.quantity + action.payload.quantity;

        if (newQuantity <= 0) {
          return state.filter((i) => i.product.id !== item.product.id);
        }

        item.quantity = newQuantity;
      }
    },

    clearCart: () => {
      return [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
