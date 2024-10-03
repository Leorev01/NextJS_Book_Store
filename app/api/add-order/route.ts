import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  try {
    const { userId, address, city, postCode, totalAmount } = await request.json();
    console.log('Request Body:', { userId, address, city, postCode, totalAmount });

    if (!userId || !address || !city || !postCode || !totalAmount) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    await sql`INSERT INTO orders (userId, address, city, postCode, totalAmount) VALUES (${userId}, ${address}, ${city}, ${postCode}, ${totalAmount});`;

    const message = 'Order created succesfully';
    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error}, { status: 500 });
  }
}

