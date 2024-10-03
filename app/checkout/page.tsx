'use client';

import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ItemProp = {
    id: number;
    title: string;
    price: number;
    amount: number;
  };

const CheckoutPage = () => {

    const { data: session } = useSession();
    const cartContext = useContext(CartContext);
    const {cart} = cartContext!;
    let cartTotal:number = 0;

    cart.map(item => {
        cartTotal += (item.price) * (item.amount);
    })
    const address = useRef<HTMLInputElement>(null);
    const city = useRef<HTMLInputElement>(null);
    const postCode = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const user = session?.user?.name;

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/api/get-user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user
                }),
            })

            const result = await response.json();
            console.log(result.user.userId);
            try{
                const request = await fetch("http://localhost:3000/api/add-order", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: result.user.userId,
                        address: address.current?.value.trim(),
                        city: city.current?.value.trim(),
                        postCode: postCode.current?.value.trim(),
                        totalAmount: cartTotal
                    }),
                })

                if(request.ok){
                    cartContext?.clearCart();
                    console.log("Order created succesfully");
                    alert('Order created succesfully');
                    router.push('/')
                }
                else{
                    console.log("Something went wrong");
                    alert("Something went wrong");
                }
            }
            catch(error){
                console.log(error)
            }
            
        }catch(error){
            console.log(error);
        }
    }
    if(!user){
        router.push('/account')
    }
    if(user){
        if (cart.length === 0) {
            return(
            <section className='pt-[11rem] text-center'>
                <h1 className='text-2xl font-bold'>Cart is empty, add items to cart before checking out</h1> 
            </section>)
        }

    return (
        <section className='pt-[11rem] items-center flex flex-col gap-10'>
            <h1 className='text-3xl font-bold'>Checkout</h1>
            <ul>
                {cart.map((item:ItemProp) => (
                    <li key={item.id} className="text-xl">
                        {item.title}: <strong>£{item.price}</strong> x <strong>{item.amount}</strong>
                    </li>
                ))}
            </ul>
            <p className="text-2xl">Total: <strong>£{cartTotal}</strong></p>
            <form onSubmit={submitHandler} className="flex flex-col gap-4 w-[30rem]">
                <Label htmlFor="address">Address</Label>
                <Input type="text" id="address" placeholder="Enter your address" ref={address} required/>
                <Label htmlFor="city">City</Label>
                <Input type="text" id="city" placeholder="Enter your city" ref={city} required/>
                <Label htmlFor="post code">Post code</Label>
                <Input type="text" id="post code" placeholder="Enter your post code" ref={postCode} required/>
                <Button>Order</Button>
            </form>
        </section>
    )
    }
    
}

export default CheckoutPage