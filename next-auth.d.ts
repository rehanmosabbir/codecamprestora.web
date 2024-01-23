import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  export interface User {
    restaurantId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
    userId: string;
    roles: string[];
  }

  export interface Session {
    user: {
      restaurantId: string;
      accessToken: string;
      refreshToken: string;
      expiresIn: string;
      userId: string;
      roles: string[];
    };
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    restaurantId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
    userId: string;
    roles: string[];
  }
}
