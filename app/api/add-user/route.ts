import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    console.log('Request Body:', { username, email, password });

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`INSERT INTO users (username, email, password, accountType) VALUES (${username}, ${email}, ${hashedPassword}, ${'default'});`;

    const message = `User: ${username} created successfully`;
    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error}, { status: 500 });
  }
}

