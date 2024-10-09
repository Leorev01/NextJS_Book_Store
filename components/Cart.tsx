'use client';

import { CartContext } from '@/contexts/CartContext';
import { useContext } from 'react';
import CartItem from './CartItem';
import { Button } from './ui/button';
import Link from 'next/link';
import { DialogClose} from './ui/dialog';

const Cart = ({profile}:{profile: boolean}) => {

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
            <ul className='flex flex-col gap-2'>
                {cart.map((item) => (
                    <CartItem key={item.id} item={item} profile={profile}/>
                ))}
            </ul>
            <p className='self-center font-semibold'>Total: £{cartTotal.toFixed(2)}</p>
            <div className='flex justify-around'>
                <Button onClick={clearCart}>Clear</Button>
                {!profile && <Link href='/checkout'><DialogClose asChild><Button>Checkout</Button></DialogClose></Link>}
                {profile && <Link href='/checkout'><Button>Checkout</Button></Link>}
            </div>
        </div>
    );
};

export default Cart;
