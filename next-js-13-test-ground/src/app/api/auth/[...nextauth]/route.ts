import { AuthApi } from "@/app/(auth)/services/AuthService";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const MINUTE = 60;
const HOUR = 60 * MINUTE;

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember Me", type: "checkbox" },
      },
      authorize: async (credentials, req) => {
        const data: any = await AuthApi.login(credentials);

        if (data && data.token) {
          // return { id: "1", name: "J Smith", token: data.token } as any;
          return { token: data.token } as any;
        } else {
          console.log("Login failed");
        }

        return null;
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 8 * HOUR, // 8 hours
  },
  callbacks: {
    async jwt ({ token, user }) {
      return { ...token, ...user };
    },
    async session ({ session, token }) {
      session.user.token = token.token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
