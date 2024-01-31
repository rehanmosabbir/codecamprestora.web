import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import { LoginCredential } from "@/types/auth";
import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isTokenExpired, login, refreshToken } from "@/services/authService";
import { NextApiRequest, NextApiResponse } from "next";

const authOptions: NextAuthOptions = {
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
        token = { ...token, ...user };
        return Promise.resolve(token);
      }

      const isExpired = isTokenExpired(token);
      if (isExpired) {
        const refreshedTokenResult = await refreshToken(token);

        if (refreshedTokenResult.isSuccess) {
          const refreshToken: JWT = {
            ...token,
            accessToken: refreshedTokenResult.accessToken,
            refreshToken: refreshedTokenResult.refreshToken,
            expiresIn: refreshedTokenResult.expiresIn,
            restaurantId: refreshedTokenResult.restaurantId,
            roles: refreshedTokenResult.roles,
            userId: refreshedTokenResult.userId
          };

          return Promise.resolve(refreshToken);
        }
      }

      return Promise.resolve(token);
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token) {
        session.user = token;
      }
      return Promise.resolve(session);
    },
    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl, process.env.NEXT_PUBLIC_NEXTAUTH_URL, 'asdasdsad')
      let returnUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL || baseUrl;
      return returnUrl;
      // // Allows relative callback URLs
      // if (url.startsWith("/")) return `${baseUrl}${url}`;
      // // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url;
      // return baseUrl;

      // const callbackUrlKey = "callbackUrl";
      // const searchParams = new URL(url).searchParams;

      // if (searchParams.has(callbackUrlKey)) {
      //   const callbackURL = searchParams.get(callbackUrlKey);
      //   if (callbackURL?.length != 0) return `${baseUrl}${callbackURL}`;
      // }

      // return baseUrl;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

