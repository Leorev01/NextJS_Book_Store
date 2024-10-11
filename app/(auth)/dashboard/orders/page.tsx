'use client';

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  type OrderProp = {
    orderId: string;
    userId: string; 
    orderdate: string; 
    address: string; 
    city: string; 
    postcode: string;
    status: string;
    totalamount: number;
};

const OrderPage = () => {

    const [orders, setOrders] = useState<OrderProp[]>([]);

    useEffect(() => {
        const getOrders = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/get-all-orders');
                const orderList = await response.json();
                console.log(orderList)
                setOrders(orderList.orders);
            }catch(error){
                console.log(error)
            }
        }

        getOrders()
    }, [])

    if(orders.length=== 0){
        return(
            <h1>No orders yet</h1>
        )
    }

  return (
    <div>
        <h1 className='text-2xl font-bold'>Orders</h1>
        <Table>
            <TableCaption>A list of processed orders.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Order Id</TableHead>
                <TableHead className="w-[100px]">User Id</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Postcode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
  {orders.map((order) => {
    const orderDate = new Date(order.orderdate).toLocaleDateString(); // Format the date

    return (
      <TableRow key={order.orderId}>
        <TableCell className="font-medium">{order.orderId}</TableCell>
        <TableCell>{order.userId}</TableCell>
        <TableCell>{orderDate}</TableCell> {/* Display the formatted date */}
        <TableCell>{order.address}</TableCell>
        <TableCell>{order.city}</TableCell>
        <TableCell>{order.postcode}</TableCell>
        <TableCell>{order.status}</TableCell>
        <TableCell>{order.totalamount}</TableCell>
      </TableRow>
    );
  })}
</TableBody>

            </Table>

    </div>
  )
}

export default OrderPage