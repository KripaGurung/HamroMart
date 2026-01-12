import React, { useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "./CartContext";
import type { ProductDataProp } from "../../pages/product/product";
import { useAuth } from "../auth/useAuth";

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [cartByUser, setCartByUser] = useState<{
    [key: number]: CartItem[];
  }>({});

  const cartItems = user ? cartByUser[user.id] || [] : [];

  const addToCart = (product: ProductDataProp) => {
    if (!user) return;

    const userCart = cartByUser[user.id] || [];
    const existingItem = userCart.find(item => item.id === product.id);

    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = userCart.map(item =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: (item.quantity + 1) * item.price,
            }
          : item
      );
    } else {
      updatedCart = [
        ...userCart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
          total: product.price,
        },
      ];
    }

    setCartByUser({
      ...cartByUser,
      [user.id]: updatedCart,
    });
  };

  const increaseQty = (id: number) => {
    if (!user) return;

    const updatedCart = cartItems.map(item =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
            total: (item.quantity + 1) * item.price,
          }
        : item
    );

    setCartByUser({ ...cartByUser, [user.id]: updatedCart });
  };

  const decreaseQty = (id: number) => {
    if (!user) return;

    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
            total: (item.quantity - 1) * item.price,
          }
        : item
    );

    setCartByUser({ ...cartByUser, [user.id]: updatedCart });
  };

  const removeItem = (id: number) => {
    if (!user) return;

    setCartByUser({
      ...cartByUser,
      [user.id]: cartItems.filter(item => item.id !== id),
    });
  };

  const clearCart = () => {
    if (!user) return;

    setCartByUser({
      ...cartByUser,
      [user.id]: [],
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;