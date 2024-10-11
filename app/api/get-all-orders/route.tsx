import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {

    // Query the database for the orders
    const response = await sql`SELECT * FROM orders;`;
    const orders = response.rows;

    if (!orders) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Return the order data if found
    return NextResponse.json({ orders }, { status: 200 });

  } catch (error) {
    // Log the error and return a generic message for security purposes
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
