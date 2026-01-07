import { createContext } from "react";
import type { ProductDataProp } from "../../pages/product/product";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  total: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductDataProp) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);