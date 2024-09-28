import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
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
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('Profile:', profile); // Log the profile object
    
      if (account!.provider === 'github') {
        user.name = profile!.name; // Use GitHub login as username
        user.email = profile!.email; // Use GitHub email
      } else if (account!.provider === 'google') {
        user.name = profile!.name; // Use Google name as username
        user.email = profile!.email; // Use Google email
      }
    
      // Insert user into the database
      try {
        await sql`INSERT INTO users (username, email, accountType) VALUES (${user.name}, ${user.email}, ${'OAuth'}) ON CONFLICT (email) DO NOTHING;`;
      } catch (error) {
        console.error('Error inserting user into database:', error);
        return false; // Return false to prevent sign-in if there's an error
      }
    
      return true; // Allow sign-in
    },
    

    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        token.provider = account.provider;
        token.username = user.name; // Get username from user
        token.email = user.email; // Get email from user
      }
      return token;
    },

    async session({ session, token }) {
      if (session && session.user) {
        session.user.name = token.username as string; // Add username to session
        session.user.email = token.email as string; // Add email to session
      } else {
        session.user = {
          name: token.username as string || null,
          email: token.email as string || null,
        };
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
