import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json(); // Destructure the userId directly
    if (!userId) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // Query the database for the order by username
    const result = await sql`SELECT * FROM orders WHERE "userId" = ${userId};`;
    const orders = result.rows;

    // Return the order data if found
    return NextResponse.json(orders, { status: 200 });

  } catch (error) {
    // Log the error and return a generic message for security purposes
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
