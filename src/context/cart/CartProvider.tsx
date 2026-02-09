import React, { useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "./CartContext";
import type { ProductDataProp } from "../../pages/product/product";
import { useAuth } from "../auth/useAuth";

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  console.log("CartProvider auth user:", user);

  const [cartByUser, setCartByUser] = useState<{
    [key: number]: CartItem[];
  }>({});

  console.log("Cart state by user:", cartByUser);

  const cartItems = user ? cartByUser[user.id] || [] : [];

  console.log("Current cart items:", cartItems);

  const addToCart = (product: ProductDataProp) => {
    if (!user) {
      console.log("Add to cart blocked: no user");
      return;
    }

    console.log("Add to cart called with product:", product);

    const userCart = cartByUser[user.id] || [];
    const existingItem = userCart.find(item => item.id === product.id);

    let updatedCart: CartItem[];

    if (existingItem) {
      console.log("Product already in cart, increasing quantity");

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
      console.log("NO, Product in cart, adding new item");

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

    console.log("Updated cart for user:", updatedCart);

    setCartByUser({
      ...cartByUser,
      [user.id]: updatedCart,
    });
  };

  const increaseQty = (id: number) => {
    if (!user) {
      console.log("Increase qty blocked: no user");
      return;
    }

    console.log("Increase quantity for product id:", id);

    const updatedCart = cartItems.map(item =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
            total: (item.quantity + 1) * item.price,
          }
        : item
    );

    console.log("Cart after increase:", updatedCart);

    setCartByUser({ ...cartByUser, [user.id]: updatedCart });
  };

  const decreaseQty = (id: number) => {
    if (!user) {
      console.log("Decrease qty blocked: no user");
      return;
    }

    console.log("Decrease quantity for product id:", id);

    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
            total: (item.quantity - 1) * item.price,
          }
        : item
    );

    console.log("Cart after decrease:", updatedCart);

    setCartByUser({ ...cartByUser, [user.id]: updatedCart });
  };

  const removeItem = (id: number) => {
    if (!user) {
      console.log("Remove item blocked: no user");
      return;
    }

    console.log("Deleting item:", id);

    const updatedCart = cartItems.filter(item => item.id !== id);

    console.log("Cart after remove:", updatedCart);

    setCartByUser({
      ...cartByUser,
      [user.id]: updatedCart,
    });
  };

  const clearCart = () => {
    if (!user) {
      console.log("Clear cart blocked: no user");
      return;
    }

    console.log("Clearing cart for user:", user.id);

    setCartByUser({
      ...cartByUser,
      [user.id]: [],
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseQty, decreaseQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;