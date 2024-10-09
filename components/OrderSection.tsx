'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type OrderType = {
    orderId: number,
    userId: number,
    orderDate: Date,
    address: string,
    city: string,
    postcode: string,
    status: string,
    totalAmount: number
}

const OrderSection = () => {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const { data: session } = useSession();
    const user = session?.user;

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/get-user", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: user?.email
                    }),
                });

                const userResult = await response.json();

                try {
                    const result = await fetch("http://localhost:3000/api/get-orders", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId: userResult.user.userId
                        }),
                    });

                    const orders = await result.json();

                    // Check if orders is an array before setting state
                    if (Array.isArray(orders)) {
                        setOrders(orders);
                    } else {
                        console.error('Invalid data format');
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }

        getOrders();
    }, [user]);

    return (
        <div>
            {orders.length === 0
                ? <p>No orders found</p>
                : orders.slice(0,5).map((order: OrderType) => (
                    <p key={order.orderId}>Order: {order.orderId} - {order.status}</p>
                    ))}
        </div>
    )
}

export default OrderSection;
