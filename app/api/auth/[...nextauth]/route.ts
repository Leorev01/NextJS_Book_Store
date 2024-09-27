import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
            scope: 'read:user',
            user: 'email',
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
      })
  ],

});

export { handler as GET, handler as POST };
