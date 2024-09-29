'use client';

import { useState, createContext, ReactNode } from 'react';

// Define the bookItem type
type bookItem = {
  id: number;
  title: string;
  price: number;
  amount: number;
};

type itemType = {
    id: number;
    name: string;
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
  cart: bookItem[];
  addItem: (item: itemType) => void;
}

// Create a Cart Context
export const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<bookItem[]>([]);

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
            title:item.name,
            price:item.price,
            amount: 1
        }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
