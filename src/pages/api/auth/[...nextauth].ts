import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import { LoginCredential } from "@/types/auth";
import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isTokenExpired, login, refreshToken } from "@/services/authService";

const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const loginCredential = credentials as LoginCredential;

        const result = await login(loginCredential);
        if (result.isSuccess) {
          const user = {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            expiresIn: result.expiresIn,
            restaurantId: result.restaurantId,
            roles: result.roles,
            userId: result.userId
          };

          return user as User;
        }

        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {

      if (user) {
        return {...user};
      }

      const isExpired = isTokenExpired(token);
      if(isExpired)
      {
        const refreshedTokenResult = await refreshToken(token);
        // console.log(refreshedTokenResult);
        if(refreshedTokenResult.isSuccess) {
          const refreshToken: JWT = {
            accessToken: refreshedTokenResult.accessToken,
            refreshToken: refreshedTokenResult.refreshToken,
            expiresIn: refreshedTokenResult.expiresIn,
            restaurantId: refreshedTokenResult.restaurantId,
            roles: refreshedTokenResult.roles,
            userId: refreshedTokenResult.userId
          };

        //   console.log(refreshToken);
          return refreshToken;
        }
      }

      return token;
    },
    async session({session, token}: {session: Session, token: JWT})
    {
        strategy: "jwt";
        return { user: token } as Session;
    },
    async redirect({ url, baseUrl }) {
      const callbackUrlKey = 'callbackUrl';
      const searchParams = new URL(url).searchParams;

      if(searchParams.has(callbackUrlKey))
      {
        const callbackURL = searchParams.get(callbackUrlKey);
        if(callbackURL?.length != 0) return `${baseUrl}${callbackURL}`;
      }

      return baseUrl;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOption);