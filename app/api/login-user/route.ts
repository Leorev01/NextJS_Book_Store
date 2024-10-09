import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    if (!email || !password) {
      throw new Error('Missing credentials');
    }

    // Query the database for user details based on the email
    const result = await sql`SELECT username, email, password FROM users WHERE email = ${email};`;
    
    // Check if the user exists
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = result.rows[0];

    // Compare the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }


    // Respond with the user data (excluding password)
    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
