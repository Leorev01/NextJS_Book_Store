import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const orderId = url.searchParams.get('orderId'); // Use searchParams to get the orderId from the query

    if (!orderId) {
      return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }

    // Query the database to delete the order
    const result = await sql`DELETE FROM orders WHERE "orderId" = ${orderId};`;

    // Check if any row was deleted
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Failed deleting order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
