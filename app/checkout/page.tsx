'use client';

import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

type ItemProp = {
    id: number;
    title: string;
    price: number;
    amount: number;
  };

const CheckoutPage = () => {

    const cartContext = useContext(CartContext);
    const {cart} = cartContext!;
    let cartTotal:number = 0;

    cart.map(item => {
        cartTotal += (item.price) * (item.amount);
    })

    if (cart.length === 0) {
        return(
        <section className='pt-[11rem] text-center'>
            <h1 className='text-2xl font-bold'>Cart is empty, add items to cart before checking out</h1> 
        </section>)
    }

  return (
    <section className='pt-[11rem] text-center flex flex-col gap-10'>
        <h1 className='text-3xl font-bold'>Checkout</h1>
        <ul>
            {cart.map((item:ItemProp) => (
                <li key={item.id} className="text-xl">
                    {item.title}: <strong>£{item.price}</strong> x <strong>{item.amount}</strong>
                </li>
            ))}
        </ul>
        <p className="text-2xl">Total: <strong>£{cartTotal}</strong></p>
        
    </section>
  )
}

export default CheckoutPage