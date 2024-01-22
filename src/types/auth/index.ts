import { NextResponse } from "next/server";

export interface LoginCredential {
    username: string;
    password: string;
}

export interface AuthResult {
    restaurantId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
    userId: string;
    roles: string[];
    statusCode: number;
    error: string[];
    isSuccess: true;
}

export interface AuthGuradResult {
  isRedirected: boolean;
  response?: NextResponse;
}