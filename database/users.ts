import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function addUser(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const email = searchParams.get('email');
  const password = searchParams.get('password');
 
  try {
    if (!username || !email || !password) throw new Error('Missing credentials');
    await sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const users = await sql`SELECT * FROM users;`;
  return NextResponse.json({ users }, { status: 200 });
}