'use client';

import { CartContext } from '@/contexts/CartContext';
import { useContext } from 'react';
import CartItem from './CartItem';
import { Button } from './ui/button';
import Link from 'next/link';
import { DialogClose } from './ui/dialog';

const Cart = () => {

    const cartContext = useContext(CartContext);

    const {cart, clearCart} = cartContext!;

    let cartTotal:number = 0;

    cart.map(item => {
        cartTotal += (item.price) * (item.amount);
    })

    // If the cart is empty, display a message
    if (cart.length === 0) {
        return <div>Cart is empty</div>;
    }

    return (
        <div className='flex flex-col gap-5'>
            <h1 className='self-center text-xl font-bold'>Cart</h1>
            <ul className='flex flex-col gap-2'>
                {cart.map((item) => (
                    <CartItem key={item.id} item={item}/>
                ))}
            </ul>
            <div className='flex justify-around'>
                <Button onClick={clearCart}>Clear</Button>
                <Link href='/checkout'><DialogClose><Button>Checkout</Button></DialogClose></Link>
            </div>
            <p>Total: £{cartTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;
