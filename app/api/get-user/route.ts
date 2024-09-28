import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username } = await request.json(); // Destructure the username directly
    if (!username) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // Query the database for the user by username
    const dbResult = await sql`SELECT * FROM users WHERE username = ${username};`;
    const user = dbResult.rows[0]; // Get the first result (if any)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user data if found
    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    // Log the error and return a generic message for security purposes
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
