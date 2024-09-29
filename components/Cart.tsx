'use client';

import { CartContext } from '@/contexts/CartContext';
import { useContext } from 'react';

const Cart = () => {

    const cartContext = useContext(CartContext);
    // If the cart is empty, display a message
    const cart = cartContext!.cart;
    if (cart.length === 0) {
        return <div>Cart is empty</div>;
    }

    return (
        <div>
        <h1>Cart</h1>
        <ul>
            {cart.map((item) => (
            <li key={item.id}>
                {item.title} - ${item.price} x {item.amount}
            </li>
            ))}
        </ul>
        </div>
    );
};

export default Cart;
