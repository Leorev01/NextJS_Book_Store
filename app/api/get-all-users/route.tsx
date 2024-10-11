import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {

    // Query the database for the users
    const dbResult = await sql`SELECT "userId", username, email FROM users;`;
    const users = dbResult.rows;

    if (!users) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user data if found
    return NextResponse.json({ users }, { status: 200 });

  } catch (error) {
    // Log the error and return a generic message for security purposes
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
