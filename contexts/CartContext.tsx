'use client';

import { useState, createContext, ReactNode } from 'react';

// Define the bookItem type
type cartItem = {
  id: number;
  title: string;
  price: number;
  amount: number;
};

type itemType = {
    id: number;
    title: string;
    image?: string;
    description?: string;
    price: number;
    author?: string;
    genre?: string;
    sold?: number;
    releaseDate?: string;
}

// Context for sharing the cart and addItem function
interface CartContextProps {
  cart: cartItem[];
  addItem: (item: itemType) => void;
  removeItem: (id:number) => void;
  clearCart: () => void;
}

// Create a Cart Context
export const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<cartItem[]>([]);

  // Function to add or update items in the cart
  const addItem = (item:itemType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, amount: cartItem.amount + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, {
            id:item.id,
            title:item.title,
            price:item.price,
            amount: 1
        }];
      }
    });
  };

  const removeItem = (itemId: number) => {
    setCart((prevCart) => {
      // Map through the previous cart to create a new array
      return prevCart.map((cartItem) => {
        if (cartItem.id === itemId) {
          // If the item to remove is found and its amount is greater than 1, decrease the amount
          if (cartItem.amount > 1) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          // If the item amount is 1, we can remove it by returning null or not returning it
          return null; // Or handle it differently as needed
        }
        // Return the cart item unchanged
        return cartItem;
      }).filter((item) => item !== null) as cartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  }
  

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
