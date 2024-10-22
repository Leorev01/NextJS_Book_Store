import NextAuth, { User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from '@vercel/postgres'; // Import your database client

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'read:user, user:email',
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await sql`SELECT * FROM users WHERE email = ${credentials.email};`;
        if (user.rows.length === 0) {
          throw new Error("Invalid credentials");
        }
        const isPasswordCorrect = await compare(
          credentials.password,
          user.rows[0].password
        );
        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }
        return user.rows[0] as User;
      },
    })
  ],

  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      console.log('SignIn callback triggered:', { user, account, profile, credentials });
  
      // If signing in with GitHub or Google
      if (account?.provider === 'github' || account?.provider === 'google') {
        user.name = profile?.name || '';
        user.email = profile?.email || '';
  
        try {
          await sql`INSERT INTO users (username, email, accountType) VALUES (${user.name}, ${user.email}, ${'OAuth'}) ON CONFLICT (email) DO NOTHING;`;
        } catch (error) {
          console.error('Error inserting user into the database:', error);
          return false;
        }
  
        return true;
      }
  
      // For Credentials login (no OAuth provider)
      if (account?.provider === 'credentials') {
        // Fetch the user from the database
        const dbUser = await sql`SELECT * FROM users WHERE email = ${credentials?.email as string};`;
        if (!dbUser.rows.length) {
          console.error('User not found in the database');
          return false;
        }
  
        user.name = dbUser.rows[0].username; // Use the name from the database
        user.email = dbUser.rows[0].email;   // Use the email from the database
  
        return true; // Allow sign-in for credentials login
      }
  
      return false;
    },
    

   async jwt({ token, user, profile }) {
    // If the user object is present (i.e., the user is signing in), store the user info in the token
    if (user) {
      token.username = user.name || profile?.name || ''; // Store the user's name in the token
      token.email = user.email || profile?.email || '';   // Store the user's email in the token
    }
    
    return token; // Return the updated token
  },

  // session callback is called when a session is created or accessed
  async session({ session, token }) {
    // Add username and email from the token to the session object
    if (session?.user) {
      session.user.name = token.username as string; // Set the user's name in the session
      session.user.email = token.email as string;   // Set the user's email in the session
    }
    
    return session; // Return the updated session
  },
  },

  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
