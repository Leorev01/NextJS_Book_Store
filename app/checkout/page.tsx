'use client';

import { useContext, useEffect } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type ItemProp = {
    id: number;
    title: string;
    price: number;
    amount: number;
};

const CheckoutPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false); // Handle submission state

    const user = session?.user;

    const cartContext = useContext(CartContext);
    const { cart } = cartContext!;
    let cartTotal: number = 0;

    cart.forEach(item => {
        cartTotal += item.price * item.amount;
    });

    const address = useRef<HTMLInputElement>(null);
    const city = useRef<HTMLInputElement>(null);
    const postCode = useRef<HTMLInputElement>(null);

    // Handle redirection if the user is not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/account');
        }
    }, [status, router]);

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true); // Set submitting state
        try {
            const response = await fetch("/api/get-user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.email, // Assuming you're using email to fetch the user
                }),
            });

            const result = await response.json();

            try {
                const request = await fetch("/api/add-order", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: result.user.userId,
                        address: address.current?.value.trim(),
                        city: city.current?.value.trim(),
                        postCode: postCode.current?.value.trim(),
                        totalAmount: cartTotal,
                    }),
                });

                if (request.ok) {
                    cartContext?.clearCart();
                    alert('Order created successfully');
                    router.push('/');
                } else {
                    alert("Something went wrong");
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    // Handle loading and unauthenticated states
    if (status === "loading") {
        return (
            <section className="pt-[11rem] text-center">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </section>
        );
    }

    if (cart.length === 0) {
        return (
            <section className='pt-[11rem] text-center'>
                <h1 className='text-2xl font-bold'>Cart is empty, add items to cart before checking out</h1>
            </section>
        );
    }

    return (
        <section className='pt-[11rem] items-center flex flex-col gap-10'>
            <h1 className='text-3xl font-bold'>Checkout</h1>
            <ul>
                {cart.map((item: ItemProp) => (
                    <li key={item.id} className="text-xl">
                        {item.title}: <strong>£{item.price}</strong> x <strong>{item.amount}</strong>
                    </li>
                ))}
            </ul>
            <p className="text-2xl">Total: <strong>£{cartTotal}</strong></p>
            <form onSubmit={submitHandler} className="flex flex-col gap-4 w-[30rem]">
                <Label htmlFor="address">Address</Label>
                <Input type="text" id="address" placeholder="Enter your address" ref={address} required />
                <Label htmlFor="city">City</Label>
                <Input type="text" id="city" placeholder="Enter your city" ref={city} required />
                <Label htmlFor="post code">Post code</Label>
                <Input type="text" id="post code" placeholder="Enter your post code" ref={postCode} required />
                <Button disabled={isSubmitting}>{isSubmitting ? "Placing Order..." : "Order"}</Button>
            </form>
        </section>
    );
};

export default CheckoutPage;
